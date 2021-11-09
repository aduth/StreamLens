import twitch from './providers/twitch';
import { registerProviderName, updateStreams, setTokenError } from './store/actions';
import { SLProviderUser, SLStream, SLStore, SLAuth, SLState } from './store';

type SLProviderGetUser = (token: string) => SLProviderUser | Promise<SLProviderUser>;

type SLProviderGetStreams = (auth: SLAuth) => Promise<SLStream[]>;

/**
 * Provider implementation.
 */
export interface SLProvider {
	/**
	 * Unique provider slug.
	 */
	name: string;

	/**
	 * OAuth endpoint from which to retrieve bearer token.
	 */
	authEndpoint: string;

	/**
	 * Whether the provider supports OpenID Connect.
	 */
	supportsOIDC: boolean;

	/**
	 * Given an OAuth bearer token, returns user details.
	 */
	getUser: SLProviderGetUser;

	/**
	 * Fetches and return latest stream data.
	 */
	getStreams: SLProviderGetStreams;
}

/**
 * Interval at which stream data should refresh when using default subscribe
 * implementation, in milliseconds.
 */
const REFRESH_INTERVAL = 30000;

/**
 * Provider implementations.
 */
export const providers: Record<string, SLProvider> = {};

/**
 * Given previous (if exists) and next states, returns an array of provider
 * names for which authorization has changed to exist, not exist, or transition
 * to or from a state of error.
 */
function getChangedAuth(prevState: SLState | undefined, state: SLState): string[] {
	return Array.from(
		new Set([
			// New authorizations should incur subscription, or when token
			// transitions to or from an error state.
			...Object.keys(state.auth).filter(
				(key) =>
					!prevState ||
					!prevState.auth[key] ||
					!!prevState.auth[key].token !== !!state.auth[key].token
			),

			// Deauthorizations should destroy subscription.
			...(prevState ? Object.keys(prevState.auth).filter((key) => !state.auth[key]) : []),
		])
	);
}

/**
 * Registers providers to store.
 */
function registerProviders(store: SLStore) {
	Object.assign(providers, { twitch });

	Object.keys(providers).forEach(store.action(registerProviderName));
}

/**
 * Initializations provider subscription maintenance for a given store.
 */
function startSubscriptions(store: SLStore) {
	const subscriptions = {};

	let lastState;
	function onStateChange(state) {
		getChangedAuth(lastState, state).forEach((providerName) => {
			// Before setting new subscription, unsubscribe from current if
			// exists.
			const intervalId = subscriptions[providerName];
			if (intervalId) {
				clearInterval(intervalId);
				delete subscriptions[intervalId];
			}

			// Attach subscription only if valid usable token exists.
			const getAuth = () => store.getState().auth[providerName];
			const getToken = () => getAuth().token;
			if (!getAuth() || !getToken()) {
				return;
			}

			// If, by some chance, an authorization exists for an unknown
			// provider name, abort. This could occur given state persistence
			// and future updates adding / removing providers.
			const provider = providers[providerName];
			if (!provider) {
				return;
			}

			async function refresh() {
				try {
					const streams = await provider.getStreams(getAuth());
					store.action(updateStreams)(providerName, streams);
				} catch (error) {
					if (error instanceof InvalidTokenError) {
						store.action(setTokenError)(providerName);
					} else {
						throw error;
					}
				}
			}

			subscriptions[providerName] = setInterval(refresh, REFRESH_INTERVAL);

			refresh();
		});

		lastState = state;
	}

	// Check for provider change on state change.
	store.subscribe(onStateChange);

	// Handle initial subscriptions.
	onStateChange(store.getState());
}

/**
 * Error thrown when provider authentication becomes invalid.
 */
export class InvalidTokenError extends Error {}

/**
 * Initializations provider store handlers.
 */
export function initialize(store: SLStore) {
	registerProviders(store);
	startSubscriptions(store);
}
