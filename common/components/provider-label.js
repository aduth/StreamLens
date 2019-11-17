/**
 * Provider label mapping.
 *
 * @type {Object<string,string>}
 */
const LABELS = {
	twitch: 'Twitch',
	mixer: 'Mixer',
};

/**
 * Returns a provider label as a string.
 *
 * @param {string} providerName Provider name for which to return label.
 *
 * @return {?string} Provider label.
 */
export const getProviderLabel = ( providerName ) => LABELS[ providerName ] || null;

/**
 * Returns a Provider Label element.
 *
 * @param {Object} props              Component props.
 * @param {string} props.providerName Provider name for which to return label.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
const ProviderLabel = ( { providerName } ) => getProviderLabel( providerName );

export default ProviderLabel;
