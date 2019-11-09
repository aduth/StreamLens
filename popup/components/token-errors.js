/**
 * External dependencies
 */
import { useStore, useSelector } from '/web_modules/@preact-hooks/unistore.js';
import { html } from '/web_modules/htm/preact.js';
import { useCallback } from '/web_modules/preact/hooks.js';
import { findKey } from '/web_modules/lodash-es.js';

/**
 * Project dependencies
 */
import { authenticate } from '/background/store/actions.js';
import Notice from '/common/components/notice.js';

/**
 * Returns a Token Errors element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {?import('preact').ComponentChild} Rendered element.
 */
function TokenErrors() {
	/**
	 * @type {import('/background/store').SLStore}
	 */
	const store = useStore();

	/**
	 * @type {import('/background/store').SLAuthState}
	 */
	const auth = useSelector( ( state ) => state.auth );

	/**
	 * @type {import('/background/store').SLProvidersState}
	 */
	const providers = useSelector( ( state ) => state.providers );
	const invalidProviderName = findKey( auth, { token: null } );
	const fixConnection = useCallback( () => {
		store.action( authenticate )( invalidProviderName );
	}, [ invalidProviderName ] );

	if ( ! invalidProviderName ) {
		return null;
	}

	const { label } = providers[ invalidProviderName ];
	const text = browser.i18n.getMessage( 'providerTokenError', [ label ] );
	const buttonText = browser.i18n.getMessage( 'providerTokenErrorFix' );

	return html`
		<${ Notice }
			icon="alert"
			text=${ text }
			buttonText=${ buttonText }
			buttonOnClick=${ fixConnection }
			className="token-errors"
		/>
	`;
}

export default TokenErrors;
