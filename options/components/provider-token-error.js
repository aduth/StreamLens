/**
 * External dependencies
 */
import { h } from 'preact';

/**
 * Project dependencies
 */
import { useDispatch } from '@streamlens/hooks';
import { Notice } from '@streamlens/components';
import { getProviderLabel } from '@streamlens/components/provider-label';

/**
 * Returns a Token Errors element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object} props              Component props.
 * @param {string} props.providerName Name of provider for which token error
 *                                    occurred.
 *
 * @return {?import('preact').VNode} Rendered element.
 */
function ProviderTokenError({ providerName }) {
	const dispatch = useDispatch();

	const label = getProviderLabel(providerName);
	if (!label) {
		return null;
	}

	const text = browser.i18n.getMessage('providerTokenError', [label]);
	const buttonText = browser.i18n.getMessage('providerTokenErrorFix');

	return h(Notice, {
		icon: 'alert',
		buttonOnClick: () => dispatch('authenticate', providerName),
		text,
		buttonText,
	});
}

export default ProviderTokenError;
