/**
 * External dependencies
 */
import { strictEqual } from 'assert';

/**
 * Internal dependencies
 */
import { getRandomString } from '../oauth.js';

/* getRandomString */

strictEqual( typeof getRandomString(), 'string', 'Produces a string' );

strictEqual( getRandomString().length, 32, 'Produces a string of default length 32' );

strictEqual( getRandomString( 40 ).length, 40, 'Produces a string of custom length' );

strictEqual(
	/[^0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ]/i.test( getRandomString() ),
	false,
	'Includes only Base36'
);
