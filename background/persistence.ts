import { SLStore, SLState } from './store';

/**
 * StreamLens storage value.
 */
export interface SLStorageValue {
	/**
	 * Initial state.
	 */
	initialState?: Partial<SLState>;
}

/**
 * Returns initial state from storage, or an empty object if none exists.
 */
export async function get(): Promise<Partial<SLState>> {
	try {
		const { initialState = {} }: SLStorageValue = await browser.storage.sync.get('initialState');
		return initialState;
	} catch (error) {
		// An error can be thrown if the get operation fails. This can happen,
		// for example, when loading as a temporary extension in Firefox.
		//
		// See: https://bugzil.la/1323228
		return {};
	}
}

/**
 * Initializations state persistence for a given store.
 */
export function initialize(store: SLStore) {
	let { auth: lastAuth, preferences: lastPreferences } = store.getState();

	/**
	 * Handle state change to update storage with latest state.
	 */
	function persistChange(state: SLState) {
		const { auth, preferences } = state;
		if (auth !== lastAuth || preferences !== lastPreferences) {
			lastAuth = auth;
			lastPreferences = preferences;

			// Fire and forget to ensure consecutive `set` is called in order of
			// state change irrespective completion of previous persist.
			browser.storage.sync.set({
				initialState: {
					auth,
					preferences,
				},
			});
		}
	}

	store.subscribe(persistChange);
}
