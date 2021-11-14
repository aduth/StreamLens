import { before, after } from 'mocha';
import { stub } from 'sinon';

/**
 * Map of global top-level key to number of instances of `useStubbedGlobal`.
 */
const instances: Map<string, number> = new Map();

export function useStubbedGlobal(path: string, value = stub()) {
	const pathParts = path.split('.');
	const topLevelKey = pathParts[0];
	let originalTopLevelValue;

	before(() => {
		// Only track the top-level value for the first instance of the test helper.
		const instance = instances.get(topLevelKey);
		if (!instance) {
			instances.set(topLevelKey, 1);
			originalTopLevelValue = globalThis[topLevelKey];
		}

		let target = globalThis;
		for (let i = 0; i < pathParts.length; i++) {
			const key = pathParts[i];
			if (i === pathParts.length - 1) {
				target[key] = value;
			} else {
				target[key] = { ...target[key] };
				target = target[key];
			}
		}
	});

	after(() => {
		// Restore top-level value only for the first instance of the test helper.
		const instance = instances.get(topLevelKey)!;
		if (instance === 1) {
			if (originalTopLevelValue === undefined) {
				delete globalThis[topLevelKey];
			} else {
				globalThis[topLevelKey] = originalTopLevelValue;
			}

			instances.delete(topLevelKey);
		} else {
			instances.set(topLevelKey, instance - 1);
		}
	});
}
