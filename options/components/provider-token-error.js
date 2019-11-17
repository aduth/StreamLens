/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/**
 * Project dependencies
 */
import useDispatch from '/common/hooks/use-dispatch.js';
import Notice from '/common/components/notice.js';
import { getProviderLabel } from '/common/components/provider-label.js';

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
	const dispatch = useDispatch();

	const label = getProviderLabel( providerName );
	if ( ! label ) {
		return null;
	}

	const text = browser.i18n.getMessage( 'providerTokenError', [ label ] );
	const buttonText = browser.i18n.getMessage( 'providerTokenErrorFix' );

	return html`
		<${ Notice }
			icon="alert"
			text=${ text }
			buttonText=${ buttonText }
			buttonOnClick=${ () => dispatch( 'authenticate', providerName ) }
		/>
	`;
}

export default ProviderTokenError;
