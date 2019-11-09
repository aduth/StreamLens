/**
 * External dependencies
 */
import { default as createUnistore } from '/web_modules/unistore.js';

/**
 * @typedef {import('./providers').SLProvider} SLProvider
 */

/**
 * @typedef {import('unistore').Store} SLStore
 */

/**
 * Stream details object.
 *
 * @typedef SLStream
 *
 * @property {string}  login        Username of streamer.
 * @property {string}  url          Unique stream URI.
 * @property {string}  providerName Platform provider on which stream is hosted.
 * @property {string}  title        Current stream title.
 * @property {string=} avatar       Avatar image URL.
 * @property {number}  viewers      Active viewers for stream, if live.
 * @property {string=} activity     Current game or activity, if live.
 */

/**
 * Store stream state shape.
 *
 * @typedef SLStreamState
 *
 * @property {SLStream[]}            data         User followed streams.
 * @property {Object<string,number>} lastReceived Time of last received data,
 *                                                per provider name key.
 */

/**
 * Provider user details.
 *
 * @typedef {Object} SLProviderUser
 *
 * @property {string}          login User login.
 * @property {(string|number)} [id]  User ID.
 */

/**
 * Provider authorization details.
 *
 * @typedef {Object} SLAuth
 *
 * @property {?string}        token Current authorization token, or null if the
 *                                  token has become invalid.
 * @property {SLProviderUser} user  Provider user details.
 */

/**
 * Store auth state shape.
 *
 * @typedef {Object<string,SLAuth>} SLAuthState
 */

/**
 * Store providers state shape.
 *
 * @typedef {Object<string,SLProvider>} SLProvidersState
 */

/**
 * Store state shape.
 *
 * @typedef {Object} SLState
 *
 * @property {SLStreamState}    streams   Stream state.
 * @property {SLAuthState}      auth      Provider authorizations, keyed by
 *                                        platform name.
 * @property {SLProvidersState} providers Registered providers, keyed by
 *                                        platform name.
 */

/**
 * Store state shape, with optional missing keys.
 *
 * @typedef {Object} SLPartialState
 *
 * @property {SLStreamState}             [streams]   Stream state.
 * @property {Object<string,SLAuth>}     [auth]      Provider authorizations,
 *                                                   keyed by platform name.
 * @property {Object<string,SLProvider>} [providers] Registered providers, keyed
 *                                                   by platform name.
 */

/**
 * Default store state.
 *
 * @type {SLState}
 */
const DEFAULT_STATE = {
	providers: {},
	streams: {
		data: [],
		lastReceived: {},
	},
	auth: {},
};

/**
 * Returns a new instance of application state store.
 *
 * @param {SLPartialState} [initialState] Optional initial state, optionally
 *                                        partial.
 *
 * @return {SLStore} Store instance.
 */
export function createStore( initialState ) {
	// Merge provided initial state (e.g. from persistence) with default.
	return createUnistore( {
		...DEFAULT_STATE,
		...initialState,
	} );
}
