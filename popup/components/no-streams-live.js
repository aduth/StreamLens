/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';

/**
 * Project dependencies
 */
import Card from '/common/components/card.js';

/**
 * Returns a No Streams Live element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {import('preact').VNode} Rendered element.
 */
function NoStreamsLive() {
	const title = browser.i18n.getMessage( 'popupNoStreamsLiveTitle' );
	const description = browser.i18n.getMessage( 'popupNoStreamsLiveDescription' );

	return h(
		Card,
		{
			icon: 'video-slash',
			title,
		},
		description,
	);
}

export default NoStreamsLive;
