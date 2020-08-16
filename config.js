/**
 * URL to which OAuth authorization should redirect upon completion.
 *
 * @type {string}
 */
export const authRedirectURL = 'https://streamlens.app/auth/';

/**
 * Extension-specific provider application details.
 *
 * @typedef {Object} SLProviderApplication
 *
 * @property {string} clientId Application client ID.
 */

/**
 * Extension provider applications, keyed by provider name.
 *
 * @type {Object<string,SLProviderApplication>}
 */
export const applications = {
	twitch: {
		clientId: 'tjitmvnig93faxcivnlhuxvtl8s8vh7',
	},
};
