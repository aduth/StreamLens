/**
 * External dependencies
 */
import { randomFillSync } from 'crypto';

global.window = {
	crypto: {
		getRandomValues: randomFillSync,
	},
};
