import { useMemo } from 'preact/hooks';

let counter = 0;

function useId(prefix: string): string {
	const id = useMemo(() => `${prefix}-${++counter}`, [prefix]);

	return id;
}

export default useId;
