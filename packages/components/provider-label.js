/**
 * External dependencies
 */
import { h, Fragment } from 'preact';

/**
 * Provider label mapping.
 *
 * @type {Object<string,string>}
 */
const LABELS = {
	twitch: 'Twitch',
};

/**
 * Returns a provider label as a string.
 *
 * @param {string} providerName Provider name for which to return label.
 *
 * @return {?string} Provider label.
 */
export const getProviderLabel = (providerName) => LABELS[providerName] || null;

/**
 * Returns a Provider Label element.
 *
 * @param {Object} props              Component props.
 * @param {string} props.providerName Provider name for which to return label.
 */
const ProviderLabel = ({ providerName }) => <>{getProviderLabel(providerName)}</>;

export default ProviderLabel;
