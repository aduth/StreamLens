/**
 * @typedef {import('./store').SLStore} SLStore
 */

/**
 * @typedef {import('./store').SLPartialState} SLPartialState
 */

/**
 * @typedef {import('./store').SLState} SLState
 */

/**
 * Returns initial state from storage, or an empty object if none exists.
 *
 * @return {SLPartialState} Initial state.
 */
export function get() {
	try {
		return JSON.parse( window.localStorage.initialState );
	} catch ( error ) {
		return {};
	}
}

/**
 * Initializations state persistence for a given store.
 *
 * @param {SLStore} store
 */
export function initialize( store ) {
	let lastValue = store.getState().auth;

	/**
	 * Handle state change to update storage with latest state.
	 *
	 * @param {SLState} state Next state.
	 */
	function persistChange( state ) {
		const value = state.auth;
		if ( value !== lastValue ) {
			window.localStorage.initialState = JSON.stringify( {
				auth: value,
			} );
		}

		lastValue = value;
	}

	store.subscribe( persistChange );
}
