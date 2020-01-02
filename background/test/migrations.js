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
	false,
	'Equal versions does not satisfy',
);

strictEqual(
	isVersionSatisfied( '1.1.0', '1.0.0' ),
	false,
	'Earlier version does not satisfy',
);

strictEqual(
	isVersionSatisfied( '1.1.0', '1.2.0' ),
	true,
	'Later version does satisfy',
);
