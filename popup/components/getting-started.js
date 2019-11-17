/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { isEmpty } from '/web_modules/lodash-es.js';

/**
 * Project dependencies
 */
import useSelect from '/common/hooks/use-select.js';
import Card from '/common/components/card.js';

/**
 * Returns a Getting Started element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {?import('preact').ComponentChild} Rendered element.
 */
function GettingStarted() {
	const auth = useSelect( ( state ) => state.auth );

	const isNew = isEmpty( auth );
	if ( ! isNew ) {
		return null;
	}

	const title = browser.i18n.getMessage( 'popupGettingStartedWelcome' );
	const buttonText = browser.i18n.getMessage( 'popupGettingStartedSettings' );
	const description = browser.i18n.getMessage( 'popupGettingStartedDescription' );

	return html`
		<${ Card }
			icon="video"
			title=${ title }
			buttonText=${ buttonText }
			buttonOnClick=${ () => {
				browser.runtime.openOptionsPage();
				window.close();
			} }
			children=${ description }
		/>
	`;
}

export default GettingStarted;
