/**
 * External dependencies
 */
import { useContext } from '/web_modules/preact/hooks.js';

/**
 * Internal dependencies
 */
import { StoreContext } from '../components/store-context.js';

/**
 * Hook which returns the current store from context.
 */
const useStore = () => useContext( StoreContext );

export default useStore;
