/**
 * External dependencies
 */
import { strictEqual } from 'assert';

/**
 * Internal dependencies
 */
import { getTotalCount, hasExhaustedPages } from '../mixer.js';

/* getTotalCount */

strictEqual(
	getTotalCount( 'nonense' ),
	NaN,
	'Non-numeric string value',
);

strictEqual(
	getTotalCount( null ),
	NaN,
	'Null value',
);

strictEqual(
	getTotalCount( '48' ),
	48,
	'Numeric string value',
);

/* hasExhaustedPages */

strictEqual(
	hasExhaustedPages( 4, 1, 2 ),
	true,
	'Last page in complete pageset',
);

strictEqual(
	hasExhaustedPages( 3, 1, 2 ),
	true,
	'Last page in incomplete pageset',
);

strictEqual(
	hasExhaustedPages( 4, 2, 2 ),
	true,
	'Page exceeds what would be last page',
);

strictEqual(
	hasExhaustedPages( 3, 0, 2 ),
	false,
	'Next page will be last',
);

strictEqual(
	hasExhaustedPages( 6, 1, 2 ),
	false,
	'Many more pages',
);

strictEqual(
	hasExhaustedPages( NaN, 0, 2 ),
	true,
	'Non-numeric total count',
);
