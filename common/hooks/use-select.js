/**
 * External dependencies
 */
import { useSelector } from 'prsh';

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
	return useSelector( selector );
}

export default useSelect;
