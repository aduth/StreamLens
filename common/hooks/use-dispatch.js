/**
 * Internal dependencies
 */
import useStore from './use-store.js';

/**
 * Hook which returns a dispatch function, from the store context if available.
 *
 * @return {import('../sync.js').Dispatch} Dispatch function.
 */
function useDispatch() {
	const store = useStore();

	return store ? store.dispatch : () => {};
}

export default useDispatch;
