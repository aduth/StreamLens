/**
 * External dependencies
 */
import { omit, reject } from '/web_modules/lodash-es.js';

/**
 * Project dependencies
 */
import { applications } from '/config.js';

/**
 * Internal dependencies
 */
import { launchOAuthFlow } from '../oauth.js';
import { providers } from '../providers.js';

/** @typedef {import('../store').SLState} SLState */

/** @typedef {import('../store').SLStream} SLStream */

/** @typedef {import('../store').SLPreferencesState} SLPreferencesState */

/** @typedef {import('../providers').SLProvider} SLProvider */

/**
 * Registers a new provider.
 *
 * @param {SLState} state Current state.
 * @param {string}  name  Provider name.
 *
 * @return {Partial<SLState>} State patch object.
 */
export function registerProviderName( state, name ) {
	return {
		providerNames: [ ...new Set( [ ...state.providerNames, name ] ) ],
	};
}

/**
 * Resets the current live streams for a provider to the given set.
 *
 * @param {SLState}    state        Current state.
 * @param {string}     providerName Provider name.
 * @param {SLStream[]} streams      Live stream objects.
 * @param {number}     receivedAt   Time at which receive should be recorded as
 *                                  having occurred (defaults to now).
 *
 * @return {Partial<SLState>} State patch object.
 */
export function updateStreams( state, providerName, streams, receivedAt = Date.now() ) {
	return {
		streams: {
			data: [
				...reject( state.streams.data, { providerName } ),
				...streams,
			].sort( ( a, b ) => b.viewers - a.viewers ),
			lastReceived: {
				...state.streams.lastReceived,
				[ providerName ]: receivedAt,
			},
		},
	};
}

/**
 * Launches authorization flow for a given provider.
 *
 * @param {SLState} state        Current state.
 * @param {string}  providerName Name of provider to authenticate.
 *
 * @return {Promise<Partial<SLState>>} State patch object.
 */
export async function authenticate( state, providerName ) {
	if ( ! providers.hasOwnProperty( providerName ) ) {
		return {};
	}

	const { clientId } = applications[ providerName ];
	const { authEndpoint, getUser } = providers[ providerName ];

	const token = await launchOAuthFlow( {
		authEndpoint,
		interactive: true,
		params: { clientId },
	} );

	if ( ! token ) {
		return {};
	}

	let user;
	try {
		user = await getUser( token );
	} catch ( error ) {
		return {};
	}

	return {
		auth: {
			...state.auth,
			[ providerName ]: { token, user },
		},
	};
}

/**
 * Removes current authentication details for a given provider.
 *
 * @param {SLState} state        Current state.
 * @param {string}  providerName Name of provider to deauthenticate.
 *
 * @return {Partial<SLState>} State patch object.
 */
export function deauthenticate( state, providerName ) {
	return {
		streams: {
			data: reject( state.streams.data, { providerName } ),
			lastReceived: omit( state.streams.lastReceived, providerName ),
		},
		auth: omit( state.auth, providerName ),
	};
}

/**
 * Marks token as invalid for provider.
 *
 * @param {SLState} state        Current state.
 * @param {string}  providerName Name of provider on which token error occurred.
 *
 * @return {Promise<Partial<SLState>>} State patch object.
 */
export async function setTokenError( state, providerName ) {
	const { clientId } = applications[ providerName ];
	const { authEndpoint, supportsOIDC } = providers[ providerName ];

	let nextToken;
	if ( supportsOIDC ) {
		// If the provider supports OpenID Connect, an attempt can be made to
		// silently refresh the authorization token via the `prompt` parameter.
		nextToken = await launchOAuthFlow( {
			authEndpoint,
			params: { clientId },
		} );
	}

	return {
		streams: deauthenticate( state, providerName ).streams,
		auth: {
			...state.auth,
			[ providerName ]: {
				...state.auth[ providerName ],
				token: nextToken || null,
			},
		},
	};
}

/**
 * Marks token as invalid for provider.
 *
 * @param {SLState}                     state       Current state.
 * @param {Partial<SLPreferencesState>} preferences Preferences to update.
 *
 * @return {Partial<SLState>} State patch object.
 */
export function setPreferences( state, preferences ) {
	return {
		preferences: {
			...state.preferences,
			...preferences,
		},
	};
}
