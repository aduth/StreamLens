import { some, isEmpty, size } from 'lodash-es';
import { SLStore, SLState } from './store';

/**
 * Updates badge text on a state change.
 *
 * @param state Next state.
 */
function setBadgeText(state: SLState) {
	const { auth, streams } = state;
	const { lastReceived, data } = streams;

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
}

/**
 * Initializations browser badge updates for a given store.
 *
 * @param store Store instance.
 */
export function initialize(store: SLStore) {
	// Subscribe for stream changes.
	store.subscribe(setBadgeText);

	// Set initial text.
	setBadgeText(store.getState());
}
