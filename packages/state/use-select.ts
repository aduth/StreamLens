import { useSelector } from 'prsh';
import { SLState } from '../../background/store';

/**
 * Hook which returns a value derived using a given selector function, updated
 * when state changes.
 *
 * @return Selector-derived value.
 */
function useSelect<SLSelected>(selector: (state: SLState) => SLSelected): SLSelected {
	return useSelector(selector);
}

export default useSelect;
