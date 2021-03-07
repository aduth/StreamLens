/**
 * External dependencies
 */
import { h } from 'preact';

/**
 * Project dependencies
 */
import { Card } from '@streamlens/components';

/**
 * Returns a No Streams Live element.
 */
function NoSearchResults() {
	const title = browser.i18n.getMessage('popupNoSearchResultsTitle');
	const description = browser.i18n.getMessage('popupNoSearchResultsDescription');

	return (
		<Card icon="video-slash" title={title}>
			{description}
		</Card>
	);
}

export default NoSearchResults;
