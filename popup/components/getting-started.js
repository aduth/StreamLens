/**
 * External dependencies
 */
import { h } from 'preact';
import { isEmpty } from 'lodash-es';

/**
 * Project dependencies
 */
import { useSelect } from '@streamlens/hooks';
import { Card } from '@streamlens/components';

/**
 * Returns a Getting Started element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {?import('preact').VNode} Rendered element.
 */
function GettingStarted() {
	const auth = useSelect((state) => state.auth);

	const isNew = isEmpty(auth);
	if (!isNew) {
		return null;
	}

	const title = browser.i18n.getMessage('popupGettingStartedWelcome');
	const buttonText = browser.i18n.getMessage('popupGettingStartedSettings');
	const description = browser.i18n.getMessage('popupGettingStartedDescription');

	return h(
		Card,
		{
			icon: 'video',
			buttonOnClick() {
				browser.runtime.openOptionsPage();
				window.close();
			},
			title,
			buttonText,
		},
		description
	);
}

export default GettingStarted;
