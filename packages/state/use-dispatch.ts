import { useStore } from 'prsh';
import { Dispatch } from 'unistore-browser-sync';

/**
 * Hook which returns a dispatch function, from the store context if available.
 */
function useDispatch(): Dispatch {
	const store = useStore();

	return store.dispatch;
}

export default useDispatch;
