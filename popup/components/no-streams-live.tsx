import { Card } from '@streamlens/components';

/**
 * Returns a No Streams Live element.
 */
function NoStreamsLive() {
	const title = browser.i18n.getMessage('popupNoStreamsLiveTitle');
	const description = browser.i18n.getMessage('popupNoStreamsLiveDescription');

	return (
		<Card icon="video-slash" title={title}>
			{description}
		</Card>
	);
}

export default NoStreamsLive;
