import { snakeCase } from 'lodash-es';
import { authRedirectURL } from '../config';

/**
 * Suported authorization request parameters, values serving as defaults.
 *
 * @see https://tools.ietf.org/html/rfc6749#section-4.2.1
 * @see https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
 */
interface SLOAuthParameters {
	/**
	 * Client identifier.
	 */
	clientId?: string;

	/**
	 * Expected response type.
	 */
	responseType?: string;

	/**
	 * URL to which user should be redirected.
	 */
	redirectURI?: string;

	/**
	 * Scope(s) to request with authorization.
	 */
	scope?: string;

	/**
	 * Whether to issue interactive authorization.
	 */
	prompt?: string;

	/**
	 * Hint to server about login identifier.
	 */
	loginHint?: string;
}

const PARAMETERS: SLOAuthParameters = {
	clientId: undefined,
	responseType: 'token',
	redirectURI: authRedirectURL,
	scope: undefined,
	prompt: undefined,
	loginHint: undefined,
};

/**
 * Width of interactive popup.
 */
const POPUP_WIDTH = 520;

/**
 * Height of interactive popup.
 */
const POPUP_HEIGHT = 780;

interface GetAuthURLOptions {
	/**
	 * URL to which user should be redirected.
	 */
	authEndpoint: string;

	/**
	 * Additional parameters to include in authorization request.
	 */
	params: SLOAuthParameters;

	/**
	 * Whether to complete auth interactively vs. silent refresh.
	 */
	interactive: boolean;
}

/**
 * Generates and returns OAuth authorization URL.
 *
 * @return Authorization URL.
 */
function getAuthURL({ authEndpoint, params, interactive }: GetAuthURLOptions): string {
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
 * @param length Length of string.
 *
 * @return Nonce string.
 */
export function getRandomString(length = 32): string {
	return Array.from(crypto.getRandomValues(new Uint32Array(length)))
		.map((i) => i.toString(36).slice(-1))
		.join('');
}

interface LaunchOAuthFlowOptions {
	/**
	 * URL to which user should be redirected.
	 */
	authEndpoint: string;

	/**
	 * Additional parameters to include in authorization request.
	 */
	params?: SLOAuthParameters;

	/**
	 * Whether to complete auth interactively vs. silent refresh.
	 */
	interactive?: boolean;
}

/**
 * Launches OAuth authentication flow.
 *
 * @return Promise resolving to token if successful, `undefined` if declined, or `null` if failed
 * non-interactive refresh.
 */
export function launchOAuthFlow({
	authEndpoint,
	params = {},
	interactive = false,
}: LaunchOAuthFlowOptions): Promise<string | undefined | null> {
	const url = getAuthURL({ authEndpoint, params, interactive });

	/**
	 * Attempts to extract token from message if message is a URL with state,
	 * access token parameters. Validates state to verify nonce match.
	 *
	 * @param message Browser message.
	 *
	 * @return Token, if extracted from message. A null value indicates a completed authorization
	 * for which the token was omitted (denied).
	 */
	function getTokenFromMessage(message: any): string | undefined | null {
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
				 * @param token Token, if received.
				 */
				function onAuthComplete(token: string | undefined | null) {
					browser.runtime.onMessage.removeListener(checkForToken);
					browser.windows.onRemoved.removeListener(onWindowClosed);
					resolve(token);
				}

				/**
				 * Check browser message for received message, and complete
				 * authorization if message originates from auth window.
				 *
				 * @param message Browser message.
				 * @param sender Message sender.
				 */
				function checkForToken(message: any, sender: browser.runtime.MessageSender) {
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
				 * @param windowId ID of window closed.
				 */
				function onWindowClosed(windowId: number) {
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
				 * @param message Browser message.
				 */
				function checkForToken(message: any) {
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
