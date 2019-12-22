/**
 * External dependencies
 */
import { strictEqual } from 'assert';

/**
 * Internal dependencies
 */
import { isVersionSatisfied } from '../migrations.js';

/* isVersionSatisfied */

strictEqual(
	isVersionSatisfied( '1.0.0', '1.0.0' ),
	true,
	'Equal versions satisfies',
);

strictEqual(
	isVersionSatisfied( '1.1.0', '1.0.0' ),
	false,
	'Later version does not satisfy',
);

strictEqual(
	isVersionSatisfied( '1.1.0', '1.2.0' ),
	true,
	'Earlier version does satisfy',
);
