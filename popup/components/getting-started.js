/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { useCallback } from '/web_modules/preact/hooks.js';
import { useSelector } from '/web_modules/@preact-hooks/unistore.js';
import { isEmpty } from '/web_modules/lodash-es.js';

/**
 * Project dependencies
 */
import Card from '/common/components/card.js';

/**
 * Returns a Getting Started element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {?import('preact').ComponentChild} Rendered element.
 */
function GettingStarted() {
	/** @type {Object<string,import('/background/store').SLAuth>} */
	const auth = useSelector( ( state ) => state.auth );

	const onClick = useCallback( () => {
		browser.runtime.openOptionsPage();
		window.close();
	}, [] );

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
			buttonOnClick=${ onClick }
			children=${ description }
		/>
	`;
}

export default GettingStarted;
