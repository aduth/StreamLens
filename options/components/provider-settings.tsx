import { h } from 'preact';
import { useSelect } from '@streamlens/state';
import { TabPanels, TabPanel, ProviderLabel } from '@streamlens/components';
import Section from './section';
import ProviderAuthorization from './provider-authorization';

/**
 * Returns a Provider Settings element.
 */
function ProviderSettings() {
	const providerNames = useSelect((state) => state.providerNames);
	const title = browser.i18n.getMessage('optionsProviderSettingsTitle');
	const description = browser.i18n.getMessage('optionsProviderSettingsDescription');
	const providerTabsLabel = browser.i18n.getMessage('optionsSettingsProvidersTabsLabel');

	return (
		<Section title={title} description={description}>
			<TabPanels label={providerTabsLabel}>
				{providerNames.map((providerName) => (
					<TabPanel name={<ProviderLabel providerName={providerName} />}>
						<ProviderAuthorization providerName={providerName} />
					</TabPanel>
				))}
			</TabPanels>
		</Section>
	);
}

export default ProviderSettings;
