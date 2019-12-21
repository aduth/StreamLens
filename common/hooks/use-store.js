/**
 * External dependencies
 */
import { useContext } from '/web_modules/preact/hooks.js';

/**
 * Internal dependencies
 */
import { StoreContext } from '../components/store-context.js';

/** @typedef {import('unistore-browser-sync').SyncStore} SyncStore */

/**
 * Hook which returns the current store from context.
 *
 * @return {SyncStore} Store from context provider.
 */
function useStore() {
	const store = useContext( StoreContext );
	if ( ! store ) {
		throw new Error( 'Missing StoreProvider value' );
	}

	return store;
}

export default useStore;
