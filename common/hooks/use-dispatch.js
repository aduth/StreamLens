/**
 * Internal dependencies
 */
import useStore from './use-store.js';

/**
 * Hook which returns a dispatch function, from the store context if available.
 *
 * @return {import('unistore-browser-sync').Dispatch} Dispatch function.
 */
function useDispatch() {
	const store = useStore();

	return store.dispatch;
}

export default useDispatch;
