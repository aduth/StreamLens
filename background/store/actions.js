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

/** @typedef {import('../store').SLState} SLState */

/** @typedef {import('../store').SLPartialState} SLPartialState */

/** @typedef {import('../store').SLStream} SLStream */

/** @typedef {import('../providers').SLProvider} SLProvider */

/**
 * Registers a new provider.
 *
 * @param {SLState}    state    Current state.
 * @param {string}     name     Provider name.
 * @param {SLProvider} provider Provider details.
 *
 * @return {SLPartialState} State patch object.
 */
export function registerProvider( state, name, provider ) {
	return {
		providers: {
			...state.providers,
			[ name ]: provider,
		},
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
 * @return {SLPartialState} State patch object.
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
 * @return {Promise<SLPartialState>} State patch object.
 */
export async function authenticate( state, providerName ) {
	if ( ! state.providers.hasOwnProperty( providerName ) ) {
		return {};
	}

	const { clientId } = applications[ providerName ];
	const { authEndpoint, getUser } = state.providers[ providerName ];

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
 * @return {SLPartialState} State patch object.
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
 * @return {Promise<SLPartialState>} State patch object.
 */
export async function setTokenError( state, providerName ) {
	const { clientId } = applications[ providerName ];
	const { authEndpoint, supportsOIDC } = state.providers[ providerName ];

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
