/**
 * External dependencies
 */
import { useStore, useSelector } from '/web_modules/@preact-hooks/unistore.js';
import { html } from '/web_modules/htm/preact.js';

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
 * @param {Object} props              Component props.
 * @param {string} props.providerName Name of provider for which token error
 *                                    occurred.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function ProviderTokenError( { providerName } ) {
	/** @type {import('/background/store').SLStore} */
	const store = useStore();

	/** @type {import('/background/store').SLProvidersState} */
	const providers = useSelector( ( state ) => state.providers );

	const { label } = providers[ providerName ];
	const text = browser.i18n.getMessage( 'providerTokenError', [ label ] );
	const buttonText = browser.i18n.getMessage( 'providerTokenErrorFix' );

	return html`
		<${ Notice }
			icon="alert"
			text=${ text }
			buttonText=${ buttonText }
			buttonOnClick=${ () => store.action( authenticate )( providerName ) }
		/>
	`;
}

export default ProviderTokenError;
