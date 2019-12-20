/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';
import { findKey } from '/web_modules/lodash-es.js';

/**
 * Project dependencies
 */
import Notice from '/common/components/notice.js';
import { getProviderLabel } from '/common/components/provider-label.js';
import useSelect from '/common/hooks/use-select.js';
import useDispatch from '/common/hooks/use-dispatch.js';

/**
 * Returns a Token Errors element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {?import('preact').VNode} Rendered element.
 */
function TokenErrors() {
	const dispatch = useDispatch();
	const auth = useSelect( ( state ) => state.auth );

	const invalidProviderName = findKey( auth, { token: null } );
	if ( ! invalidProviderName ) {
		return null;
	}

	const label = getProviderLabel( invalidProviderName );
	if ( ! label ) {
		return null;
	}

	const text = browser.i18n.getMessage( 'providerTokenError', [ label ] );
	const buttonText = browser.i18n.getMessage( 'providerTokenErrorFix' );

	return h(
		Notice,
		{
			icon: 'alert',
			buttonOnClick() {
				dispatch( 'authenticate', invalidProviderName );
			},
			className: 'token-errors',
			text,
			buttonText,
		},
	);
}

export default TokenErrors;
