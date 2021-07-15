/**
 * External dependencies
 */
import { snakeCase } from 'lodash-es';

/**
 * Project dependencies
 */
import { authRedirectURL } from '../config.js';

/**
 * Suported authorization request parameters, values serving as defaults.
 *
 * @typedef SLOAuthParameters
 *
 * @property {string} [clientId]     Client identifier.
 * @property {string} [responseType] Expected response type.
 * @property {string} [redirectURI]  URL to which user should be redirected.
 * @property {string} [scope]        Scope(s) to request with authorization.
 * @property {string} [prompt]       Whether to issue interactive authorization.
 * @property {string} [loginHint]    Hint to server about login identifier.
 *
 * @see https://tools.ietf.org/html/rfc6749#section-4.2.1
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
 */
const PARAMETERS = {
	clientId: undefined,
	responseType: 'token',
	redirectURI: authRedirectURL,
	scope: undefined,
	prompt: undefined,
	loginHint: undefined,
};

/**
 * Width of interactive popup.
 *
 * @type {number}
 */
const POPUP_WIDTH = 520;

/**
 * Height of interactive popup.
 *
 * @type {number}
 */
const POPUP_HEIGHT = 780;

/**
 * Generates and returns OAuth authorization URL.
 *
 * @param {Object}            options              Options object.
 * @param {string}            options.authEndpoint URL to which user should be
 *                                                 redirected.
 * @param {SLOAuthParameters} options.params       Additional parameters to
 *                                                 include in authorization
 *                                                 request.
 * @param {boolean}           options.interactive  Whether to complete auth
 *                                                 interactively vs. silent
 *                                                 refresh.
 *
 * @return {string} Authorization URL.
 */
function getAuthURL({ authEndpoint, params, interactive }) {
	const url = new URL(authEndpoint);

	for (const key in PARAMETERS) {
		// Assign value from constant as default.
		let value = PARAMETERS[key];

		// Defer to passed value.
		if (params.hasOwnProperty(key)) {
			value = params[key];
		}

		// Only set if defined.
		if (value !== undefined) {
			url.searchParams.set(snakeCase(key), value);
		}
	}

	// Generate nonce for CSRF protection, verified upon a received token.
	const nonce = getRandomString();
	url.searchParams.set('state', nonce);

	// Non-interactive is effected via `prompt` parameter.
	//
	// See: https://openid.net/specs/openid-connect-core-1_0.html#Authenticates
	if (!interactive) {
		url.searchParams.set('prompt', 'none');
	}

	return url.toString();
}

/**
 * Returns a character string of cryptographically-strong random values.
 *
 * @param {number} [length=32] Length of string.
 *
 * @return {string} Nonce string.
 */
export function getRandomString(length = 32) {
	return Array.from(crypto.getRandomValues(new Uint32Array(length)))
		.map((i) => i.toString(36).slice(-1))
		.join('');
}

/**
 * Launches OAuth authentication flow.
 *
 * @param {Object}            options                     Options object.
 * @param {string}            options.authEndpoint        URL to which user
 *                                                        should be redirected.
 * @param {SLOAuthParameters} [options.params={}]         Additional parameters
 *                                                        to include in
 *                                                        authorization request.
 * @param {boolean}           [options.interactive=false] Whether to issue auth
 *                                                        interactively, vs.
 *                                                        silent refresh.
 *
 * @return {Promise<?(string|undefined)>} Promise resolving to token if
 *                                        successful, `undefined` if declined,
 *                                        or `null` if failed non-interactive
 *                                        refresh.
 */
export function launchOAuthFlow({ authEndpoint, params = {}, interactive = false }) {
	const url = getAuthURL({ authEndpoint, params, interactive });

	/**
	 * Attempts to extract token from message if message is a URL with state,
	 * access token parameters. Validates state to verify nonce match.
	 *
	 * @param {*} message Browser message.
	 *
	 * @return {?(undefined|string)} Token, if extracted from message. A null
	 *                               value indicates a completed authorization
	 *                               for which the token was omitted (denied).
	 */
	function getTokenFromMessage(message) {
		let hash;
		try {
			({ hash } = new URL(message));
		} catch (error) {
			return;
		}

		const messageParams = new URLSearchParams(hash.slice(1));
		const nonce = new URLSearchParams(url).get('state');

		if (messageParams.get('state') === nonce) {
			// At this point, it can be certain that the message is the response
			// from the endpoint. It's not guaranteed that the access token is
			// present in the parameters (e.g. in case of error or denied
			// request), but since URLSearchParams#get will return `null` in
			// case of a missing value, the token can be differentiated between
			// `undefined` and `null` as indicating whether a response (valid or
			// not) was received.
			return messageParams.get('access_token');
		}
	}

	return interactive
		? new Promise(async (resolve) => {
				const currentWindow = await browser.windows.getCurrent();
				const { left = 0, width = 0, top = 0, height = 0 } = currentWindow;
				const authWindow = await browser.windows.create({
					url,
					type: 'popup',
					width: POPUP_WIDTH,
					height: POPUP_HEIGHT,
					left: Math.floor(left + width / 2 - POPUP_WIDTH / 2),
					top: Math.floor(top + height / 2 - POPUP_HEIGHT / 2),
				});

				/**
				 * Resolve with token, if received, and remove event listeners.
				 *
				 * @param {?(string|undefined)} token Token, if received.
				 */
				function onAuthComplete(token) {
					browser.runtime.onMessage.removeListener(checkForToken);
					browser.windows.onRemoved.removeListener(onWindowClosed);
					resolve(token);
				}

				/**
				 * Check browser message for received message, and complete
				 * authorization if message originates from auth window.
				 *
				 * @param {*}                             message Browser message.
				 * @param {browser.runtime.MessageSender} sender  Message sender.
				 */
				function checkForToken(message, sender) {
					const token = getTokenFromMessage(message);
					if (sender.tab && sender.tab.windowId === authWindow.id) {
						onAuthComplete(token);
						browser.windows.remove(authWindow.id);
					}
				}

				/**
				 * Completes authorization if window is closed prematurely (users
				 * closes prompt).
				 *
				 * @param {number} windowId ID of window closed.
				 */
				function onWindowClosed(windowId) {
					if (windowId === authWindow.id) {
						onAuthComplete(undefined);
					}
				}

				browser.windows.onRemoved.addListener(onWindowClosed);
				browser.runtime.onMessage.addListener(checkForToken);
		  })
		: new Promise((resolve) => {
				const iframe = document.createElement('iframe');
				iframe.src = url;

				/**
				 * Check browser message for received message, and complete
				 * authorization if message originates from auth window.
				 *
				 * @param {*} message Browser message.
				 */
				function checkForToken(message) {
					const token = getTokenFromMessage(message);

					// See above note in `getTokenFromMessage`. A non-undefined
					// token, whether null or valid token, is indicative of the
					// completion of the authorization flow for this request.
					if (token !== undefined) {
						resolve(token);
						browser.runtime.onMessage.removeListener(checkForToken);
						document.body.removeChild(iframe);
					}
				}

				browser.runtime.onMessage.addListener(checkForToken);
				document.body.appendChild(iframe);
		  });
}
