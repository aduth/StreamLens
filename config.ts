/**
 * URL to which OAuth authorization should redirect upon completion.
 */
export const authRedirectURL = 'https://streamlens.app/auth/';

/**
 * Extension-specific provider application details.
 */
interface SLProviderApplication {
	/**
	 * Application client ID.
	 */
	clientId: string;
}

/**
 * Extension provider applications, keyed by provider name.
 */
export const applications: Record<string, SLProviderApplication> = {
	twitch: {
		clientId: 'tjitmvnig93faxcivnlhuxvtl8s8vh7',
	},
};
