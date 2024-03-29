import { some, isEmpty, size } from 'lodash-es';
import { useSelect } from '@streamlens/state';
import { useEffect } from 'preact/hooks';

/**
 * Badge colors.
 */
export enum Colors {
	/**
	 * Badge color for error state.
	 */
	ERROR = '#bc152e',

	/**
	 * Badge colors for all other states.
	 */
	DEFAULT = '#4285F4',
}

function Badge() {
	const auth = useSelect((state) => state.auth);
	const streams = useSelect((state) => state.streams);
	const isOnline = useSelect((state) => state.isOnline);
	const { lastReceived, data } = streams;

	useEffect(() => {
		let text, color;

		const isError = some(auth, { token: null }) || !isOnline;
		if (isError) {
			text = '?';
			color = Colors.ERROR;
		} else {
			// Only compute live streams if at least one authorization exists, and
			// each provider has received at least once.
			const hasFetched = !isEmpty(auth) && size(auth) === size(lastReceived);
			text = hasFetched ? String(data.length) : '';
			color = Colors.DEFAULT;
		}

		browser.browserAction.setBadgeText({ text });
		browser.browserAction.setBadgeBackgroundColor({ color });

		// Assigning badge text color is only available in Firefox, and only in
		// Firefox does the text otherwise appear as non-contrasting black.
		if (typeof browser.browserAction.setBadgeTextColor === 'function') {
			browser.browserAction.setBadgeTextColor({ color: '#fff' });
		}
	}, [lastReceived, data, auth, isOnline]);

	return null;
}

export default Badge;
