import { h, Fragment } from 'preact';

interface ProviderLabelProps {
	/**
	 * Provider name for which to return label.
	 */
	providerName: string;
}

/**
 * Provider label mapping.
 */
const LABELS: Record<string, string> = {
	twitch: 'Twitch',
};

/**
 * Returns a provider label as a string.
 *
 * @param providerName Provider name for which to return label.
 */
export const getProviderLabel = (providerName: string): string | null =>
	LABELS[providerName] || null;

/**
 * Returns a Provider Label element.
 */
function ProviderLabel({ providerName }: ProviderLabelProps) {
	return <>{getProviderLabel(providerName)}</>;
}

export default ProviderLabel;
