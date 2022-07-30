import { Card } from '@streamlens/components';

/**
 * Returns a Getting Started element.
 */
function GettingStarted() {
	const title = browser.i18n.getMessage('popupGettingStartedWelcome');
	const buttonText = browser.i18n.getMessage('popupGettingStartedSettings');
	const description = browser.i18n.getMessage('popupGettingStartedDescription');

	return (
		<Card
			icon="video"
			buttonOnClick={() => {
				browser.runtime.openOptionsPage();
				window.close();
			}}
			title={title}
			buttonText={buttonText}
		>
			{description}
		</Card>
	);
}

export default GettingStarted;
