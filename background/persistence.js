/** @typedef {import('./store').SLStore} SLStore */

/** @typedef {import('./store').SLPartialState} SLPartialState */

/** @typedef {import('./store').SLState} SLState */

/**
 * StreamLens storage value.
 *
 * @typedef SLStorageValue
 *
 * @property {SLPartialState=} [initialState] Initial state.
 */

/**
 * Returns initial state from storage, or an empty object if none exists.
 *
 * @return {Promise<SLPartialState>} Initial state.
 */
export async function get() {
	try {
		/** @type {SLStorageValue} */
		const { initialState = {} } = await browser.storage.sync.get( 'initialState' );
		return initialState;
	} catch ( error ) {
		// An error can be thrown if the get operation fails. This can happen,
		// for example, when loading as a temporary extension in Firefox.
		//
		// See: https://bugzil.la/1323228
		return {};
	}
}

/**
 * Initializations state persistence for a given store.
 *
 * @param {SLStore} store
 */
export function initialize( store ) {
	let {
		auth: lastAuth,
		preferences: lastPreferences,
	} = store.getState();

	/**
	 * Handle state change to update storage with latest state.
	 *
	 * @param {SLState} state Next state.
	 */
	function persistChange( state ) {
		const { auth, preferences } = state;
		if ( auth !== lastAuth || preferences !== lastPreferences ) {
			lastAuth = auth;
			lastPreferences = preferences;

			// Fire and forget to ensure consecutive `set` is called in order of
			// state change irrespective completion of previous persist.
			browser.storage.sync.set( {
				initialState: {
					auth,
					preferences,
				},
			} );
		}
	}

	store.subscribe( persistChange );
}
