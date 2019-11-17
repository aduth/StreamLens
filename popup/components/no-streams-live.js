/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/**
 * Project dependencies
 */
import Card from '/common/components/card.js';

/**
 * Returns a No Streams Live element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function NoStreamsLive() {
	const title = browser.i18n.getMessage( 'popupNoStreamsLiveTitle' );
	const description = browser.i18n.getMessage( 'popupNoStreamsLiveDescription' );

	return html`
		<${ Card }
			icon="video-slash"
			title=${ title }
			children=${ description }
			className="no-streams-live"
		/>
	`;
}

export default NoStreamsLive;
