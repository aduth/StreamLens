import { h } from 'preact';
import { findKey } from 'lodash-es';
import { Notice, getProviderLabel } from '@streamlens/components';
import { useSelect, useDispatch } from '@streamlens/state';

/**
 * Returns a Token Errors element.
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

	return (
		<Notice
			icon="alert"
			buttonOnClick={() => {
				dispatch('authenticate', invalidProviderName);
			}}
			className="token-errors"
			text={text}
			buttonText={buttonText}
		/>
	);
}

export default TokenErrors;
