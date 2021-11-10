import { useEffect, useRef, EffectCallback, Inputs } from 'preact/hooks';

/**
 * Hook which behaves identical to useEffect but skips the initial render callback.
 *
 * @param callback Effect callback.
 * @param inputs Effect inputs.
 */
function useDidUpdateEffect(callback: EffectCallback, inputs?: Inputs) {
	const didMount = useRef(false);
	useEffect(() => {
		if (didMount.current) {
			return callback();
		}

		didMount.current = true;
	}, inputs);
}

export default useDidUpdateEffect;
