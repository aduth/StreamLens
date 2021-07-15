import { h } from 'preact';
import { useDispatch } from '@streamlens/hooks';
import { Notice } from '@streamlens/components';
import { getProviderLabel } from '@streamlens/components/provider-label';

/**
 * Returns a Token Errors element.
 *
 * @param {Object} props              Component props.
 * @param {string} props.providerName Name of provider for which token error
 *                                    occurred.
 */
function ProviderTokenError({ providerName }) {
	const dispatch = useDispatch();

	const label = getProviderLabel(providerName);
	if (!label) {
		return null;
	}

	const text = browser.i18n.getMessage('providerTokenError', [label]);
	const buttonText = browser.i18n.getMessage('providerTokenErrorFix');

	return (
		<Notice
			icon="alert"
			buttonOnClick={() => dispatch('authenticate', providerName)}
			text={text}
			buttonText={buttonText}
		/>
	);
}

export default ProviderTokenError;
