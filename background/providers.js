/**
 * Internal dependencies
 */
import mixer from './providers/mixer.js';
import twitch from './providers/twitch.js';
import {
	registerProviderName,
	updateStreams,
	setTokenError,
} from './store/actions.js';

/** @typedef {import('./store').SLProviderUser} SLProviderUser */

/** @typedef {import('./store').SLStream} SLStream */

/** @typedef {import('./store').SLStore} SLStore */

/** @typedef {import('./store').SLAuth} SLAuth */

/** @typedef {import('./store').SLState} SLState */

/** @typedef {(token: string) => SLProviderUser|Promise<SLProviderUser>} SLProviderGetUser */

/** @typedef {(auth: SLAuth) => Promise<SLStream[]>} SLProviderGetStreams */

/**
 * Provider implementation.
 *
 * @typedef {Object} SLProvider
 *
 * @property {string}               name         Unique provider slug.
 * @property {string}               authEndpoint OAuth endpoint from which to
 *                                               retrieve bearer token.
 * @property {boolean}              supportsOIDC Whether the provider supports
 *                                               OpenID Connect.
 * @property {SLProviderGetUser}    getUser      Given an OAuth bearer token,
 *                                               returns user details.
 * @property {SLProviderGetStreams} getStreams   Fetches and return latest
 *                                               stream data.
 */

/**
 * Interval at which stream data should refresh when using default subscribe
 * implementation, in milliseconds.
 *
 * @type {number}
 */
const REFRESH_INTERVAL = 30000;

/**
 * Provider implementations.
 *
 * @type {Object<string,SLProvider>}
 */
export const providers = {};

/**
 * Given previous (if exists) and next states, returns an array of provider
 * names for which authorization has changed to exist, not exist, or transition
 * to or from a state of error.
 *
 * @param {SLState} [prevState] Previous state, if exists.
 * @param {SLState} state       Next state.
 *
 * @return {string[]} Provider names for changed authorizations.
 */
function getChangedAuth( prevState, state ) {
	return Array.from( new Set( [
		// New authorizations should incur subscription, or when token
		// transitions to or from an error state.
		...Object.keys( state.auth ).filter( ( key ) => (
			! prevState ||
			! prevState.auth[ key ] ||
			!! prevState.auth[ key ].token !== !! state.auth[ key ].token
		) ),

		// Deauthorizations should destroy subscription.
		...prevState
			? Object.keys( prevState.auth ).filter( ( key ) => (
				! state.auth[ key ]
			) )
			: [],
	] ) );
}

/**
 * Registers providers to store.
 *
 * @param {SLStore} store
 */
function registerProviders( store ) {
	Object.assign( providers, { twitch, mixer } );

	Object
		.keys( providers )
		.forEach( store.action( registerProviderName ) );
}

/**
 * Initializations provider subscription maintenance for a given store.
 *
 * @param {SLStore} store
 */
function startSubscriptions( store ) {
	const subscriptions = {};

	let lastState;
	function onStateChange( state ) {
		getChangedAuth( lastState, state ).forEach( ( providerName ) => {
			// Before setting new subscription, unsubscribe from current if
			// exists.
			const intervalId = subscriptions[ providerName ];
			if ( intervalId ) {
				clearInterval( intervalId );
				delete subscriptions[ intervalId ];
			}

			// Attach subscription only if valid usable token exists.
			const getAuth = () => store.getState().auth[ providerName ];
			const getToken = () => getAuth().token;
			if ( ! getAuth() || ! getToken() ) {
				return;
			}

			// If, by some chance, an authorization exists for an unknown
			// provider name, abort. This could occur given state persistence
			// and future updates adding / removing providers.
			const provider = providers[ providerName ];
			if ( ! provider ) {
				return;
			}

			async function refresh() {
				try {
					const streams = await provider.getStreams( getAuth() );
					store.action( updateStreams )( providerName, streams );
				} catch ( error ) {
					if ( error instanceof InvalidTokenError ) {
						store.action( setTokenError )( providerName );
					} else {
						throw error;
					}
				}
			}

			subscriptions[ providerName ] = setInterval(
				refresh,
				REFRESH_INTERVAL,
			);

			refresh();
		} );

		lastState = state;
	}

	// Check for provider change on state change.
	store.subscribe( onStateChange );

	// Handle initial subscriptions.
	onStateChange( store.getState() );
}

/**
 * Error thrown when provider authentication becomes invalid.
 */
export class InvalidTokenError extends Error {}

/**
 * Initializations provider store handlers.
 *
 * @param {SLStore} store
 */
export function initialize( store ) {
	registerProviders( store );
	startSubscriptions( store );
}
