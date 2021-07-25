import { h } from 'preact';
import { useSelect } from '@streamlens/state';
import Section from './section.jsx';
import ProviderAuthorization from './provider-authorization.jsx';

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
