/**
 * External dependencies
 */
import { h } from 'preact';

/**
 * Project dependencies
 */
import { useSelect } from '@streamlens/hooks';

/**
 * Internal dependencies
 */
import Section from './section.js';
import ProviderAuthorization from './provider-authorization.js';

/**
 * Returns a Provider Authorizations element.
 */
function ProviderAuthorizations() {
	const providerNames = useSelect((state) => state.providerNames);
	const title = browser.i18n.getMessage('optionsAuthorizationsTitle');
	const description = browser.i18n.getMessage('optionsAuthorizationsDescription');

	return (
		<Section title={title} description={description}>
			<ul className="provider-authorizations">
				{providerNames.map((providerName) => (
					<li key={providerName}>
						<ProviderAuthorization providerName={providerName} />
					</li>
				))}
			</ul>
		</Section>
	);
}

export default ProviderAuthorizations;
