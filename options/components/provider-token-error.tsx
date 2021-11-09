import { h } from 'preact';
import { useDispatch } from '@streamlens/state';
import { Notice, getProviderLabel } from '@streamlens/components';

interface ProviderTokenErrorProps {
	/**
	 * Name of provider for which token error occurred.
	 */
	providerName: string;
}

/**
 * Returns a Token Errors element.
 */
function ProviderTokenError({ providerName }: ProviderTokenErrorProps) {
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
