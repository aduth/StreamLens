/**
 * External dependencies
 */
import { h } from 'preact';
import { findKey } from 'lodash-es';

/**
 * Project dependencies
 */
import { Notice } from '@streamlens/components';
import { getProviderLabel } from '@streamlens/components/provider-label';
import { useSelect, useDispatch } from '@streamlens/hooks';

/**
 * Returns a Token Errors element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {?import('preact').VNode} Rendered element.
 */
function TokenErrors() {
	const dispatch = useDispatch();
	const auth = useSelect((state) => state.auth);

	const invalidProviderName = findKey(auth, { token: null });
	if (!invalidProviderName) {
		return null;
	}

	const label = getProviderLabel(invalidProviderName);
	if (!label) {
		return null;
	}

	const text = browser.i18n.getMessage('providerTokenError', [label]);
	const buttonText = browser.i18n.getMessage('providerTokenErrorFix');

	return h(Notice, {
		icon: 'alert',
		buttonOnClick() {
			dispatch('authenticate', invalidProviderName);
		},
		className: 'token-errors',
		text,
		buttonText,
	});
}

export default TokenErrors;
