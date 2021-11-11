import { h } from 'preact';
import { Card } from '@streamlens/components';

/**
 * Returns a Offline Warning element.
 */
function OfflineWarning() {
	const title = browser.i18n.getMessage('popupOfflineWarningTitle');
	const description = browser.i18n.getMessage('popupOfflineWarningDescription');

	return (
		<Card icon="wifi" title={title}>
			{description}
		</Card>
	);
}

export default OfflineWarning;
