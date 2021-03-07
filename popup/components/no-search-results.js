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
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {import('preact').VNode} Rendered element.
 */
function NoSearchResults() {
	const title = browser.i18n.getMessage('popupNoSearchResultsTitle');
	const description = browser.i18n.getMessage('popupNoSearchResultsDescription');

	return h(
		Card,
		{
			icon: 'video-slash',
			title,
		},
		description
	);
}

export default NoSearchResults;
