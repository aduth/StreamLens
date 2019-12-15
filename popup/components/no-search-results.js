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
function NoSearchResults() {
	const title = browser.i18n.getMessage( 'popupNoSearchResultsTitle' );
	const description = browser.i18n.getMessage( 'popupNoSearchResultsDescription' );

	return html`
		<${ Card }
			icon="video-slash"
			title=${ title }
			children=${ description }
		/>
	`;
}

export default NoSearchResults;
