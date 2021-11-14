import { createContext } from 'preact';
import { Dispatch, SyncStore } from 'unistore-browser-sync';
import { useContext, useState, useLayoutEffect } from 'preact/hooks';
import { SLState } from '../../background/store';

export const StoreContext = createContext(null as SyncStore<SLState> | null);

/**
 * Hook which returns the current store from context.
 *
 * @return Store from context provider.
 */
export function useStore(): SyncStore<SLState> {
	return useContext(StoreContext)!;
}

/**
 * Hook which returns a dispatch function, from the store context if available.
 */
export function useDispatch(): Dispatch {
	const store = useStore();

	return store.dispatch;
}

/**
 * Hook which returns a value derived using a given selector function, updated
 * when state changes.
 *
 * @return Selector-derived value.
 */
export function useSelect<SLSelected>(selector: (state: SLState) => SLSelected): SLSelected {
	const store = useStore();
	const state = useState(getNextResult);

	function getNextResult() {
		return selector(store.getState());
	}

	useLayoutEffect(
		function () {
			function onStateChange() {
				state[1](getNextResult());
			}

			onStateChange();

			return store.subscribe(onStateChange);
		},
		[store, selector]
	);

	return state[0];
}
