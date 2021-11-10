import { useSelect } from '@streamlens/state';
import { useDidUpdateEffect } from '@streamlens/hooks';
import { SLState } from '../store';

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
export async function getPersistedState(): Promise<Partial<SLState>> {
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

function Persistence() {
	const auth = useSelect((state) => state.auth);
	const preferences = useSelect((state) => state.preferences);

	useDidUpdateEffect(() => {
		// Fire and forget to ensure consecutive `set` is called in order of
		// state change irrespective completion of previous persist.
		browser.storage.sync.set({
			initialState: {
				auth,
				preferences,
			},
		});
	}, [auth, preferences]);

	return null;
}

export default Persistence;
