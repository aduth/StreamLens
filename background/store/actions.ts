import { omit, reject } from 'lodash-es';
import { applications } from '../../config';
import { launchOAuthFlow } from '../oauth';
import { providers } from '../providers';
import { SLState, SLStream, SLPreferencesState } from '../store';

/**
 * Registers a new provider.
 *
 * @param state Current state.
 * @param name Provider name.
 */
export function registerProviderName(state: SLState, name: string): Partial<SLState> {
	return {
		providerNames: [...new Set([...state.providerNames, name])],
	};
}

/**
 * Resets the current live streams for a provider to the given set.
 *
 * @param state Current state.
 * @param providerName Provider name.
 * @param streams Live stream objects.
 * @param receivedAt Time at which receive should be recorded as having occurred (defaults to now).
 *
 * @return State patch object.
 */
export function updateStreams(
	state: SLState,
	providerName: string,
	streams: SLStream[],
	receivedAt: number = Date.now()
): Partial<SLState> {
	return {
		streams: {
			data: [...reject(state.streams.data, { providerName }), ...streams].sort(
				(a, b) => b.viewers - a.viewers
			),
			lastReceived: {
				...state.streams.lastReceived,
				[providerName]: receivedAt,
			},
		},
	};
}

/**
 * Launches authorization flow for a given provider.
 *
 * @param state Current state.
 * @param providerName Name of provider to authenticate.
 *
 * @return State patch object.
 */
export async function authenticate(
	state: SLState,
	providerName: string
): Promise<Partial<SLState>> {
	if (!providers.hasOwnProperty(providerName)) {
		return {};
	}

	const { clientId } = applications[providerName];
	const { authEndpoint, getUser } = providers[providerName];

	const token = await launchOAuthFlow({
		authEndpoint,
		interactive: true,
		params: { clientId },
	});

	if (!token) {
		return {};
	}

	let user;
	try {
		user = await getUser(token);
	} catch (error) {
		return {};
	}

	return {
		auth: {
			...state.auth,
			[providerName]: { token, user },
		},
	};
}

/**
 * Removes current authentication details for a given provider.
 *
 * @param state Current state.
 * @param providerName Name of provider to deauthenticate.
 *
 * @return State patch object.
 */
export function deauthenticate(state: SLState, providerName: string): Partial<SLState> {
	return {
		streams: {
			data: reject(state.streams.data, { providerName }),
			lastReceived: omit(state.streams.lastReceived, providerName),
		},
		auth: omit(state.auth, providerName),
	};
}

/**
 * Marks token as invalid for provider.
 *
 * @param state Current state.
 * @param providerName Name of provider on which token error occurred.
 *
 * @return State patch object.
 */
export async function setTokenError(
	state: SLState,
	providerName: string
): Promise<Partial<SLState>> {
	const { clientId } = applications[providerName];
	const { authEndpoint, supportsOIDC } = providers[providerName];

	let nextToken;
	if (supportsOIDC) {
		// If the provider supports OpenID Connect, an attempt can be made to
		// silently refresh the authorization token via the `prompt` parameter.
		nextToken = await launchOAuthFlow({
			authEndpoint,
			params: { clientId },
		});
	}

	return {
		streams: deauthenticate(state, providerName).streams,
		auth: {
			...state.auth,
			[providerName]: {
				...state.auth[providerName],
				token: nextToken || null,
			},
		},
	};
}

/**
 * Marks token as invalid for provider.
 *
 * @param state Current state.
 * @param preferences Preferences to update.
 *
 * @return State patch object.
 */
export function setPreferences(
	state: SLState,
	preferences: Partial<SLPreferencesState>
): Partial<SLState> {
	return {
		preferences: {
			...state.preferences,
			...preferences,
		},
	};
}

/**
 * Toggle online status, defaulting to inverse of current state.
 *
 * @param state Current state.
 * @param isOnline Whether online.
 *
 * @return State patch object.
 */
export function toggleIsOnline(state: SLState, isOnline = !state.isOnline): Partial<SLState> {
	return {
		isOnline,
	};
}
