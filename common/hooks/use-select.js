/**
 * External dependencies
 */
import { useLayoutEffect, useState } from '/web_modules/preact/hooks.js';

/**
 * Internal dependencies
 */
import useStore from './use-store.js';

/** @typedef {import('/background/store.js').SLState} SLState */

/**
 * Hook which returns a value derived using a given selector function, updated
 * when state changes.
 *
 * @template SLSelected
 *
 * @param {(state: SLState)=>SLSelected} selector
 *
 * @return {SLSelected} Selector-derived value.
 */
function useSelect( selector ) {
	const store = useStore();
	const [ result, setResult ] = useState( () => selector( store.getState() ) );

	useLayoutEffect( () => {
		function onStateChange() {
			setResult( selector( store.getState() ) );
		}

		onStateChange();

		return store.subscribe( onStateChange );
	}, [ store ] );

	return result;
}

export default useSelect;
