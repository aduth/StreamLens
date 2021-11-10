import { some, isEmpty, size } from 'lodash-es';
import { useSelect } from '@streamlens/state';
import { useEffect } from 'preact/hooks';

function Badge() {
	const auth = useSelect((state) => state.auth);
	const streams = useSelect((state) => state.streams);
	const { lastReceived, data } = streams;

	useEffect(() => {
		let text, color;

		const hasTokenError = some(auth, { token: null });
		if (hasTokenError) {
			text = '?';
			color = '#bc152e';
		} else {
			// Only compute live streams if at least one authorization exists, and
			// each provider has received at least once.
			const hasFetched = !isEmpty(auth) && size(auth) === size(lastReceived);
			text = hasFetched ? String(data.length) : '';
			color = '#4285f4';
		}

		browser.browserAction.setBadgeText({ text });
		browser.browserAction.setBadgeBackgroundColor({ color });

		// Assigning badge text color is only available in Firefox, and only in
		// Firefox does the text otherwise appear as non-contrasting black.
		if (typeof browser.browserAction.setBadgeTextColor === 'function') {
			browser.browserAction.setBadgeTextColor({ color: '#fff' });
		}
	}, [lastReceived, data, auth]);

	return null;
}

export default Badge;
