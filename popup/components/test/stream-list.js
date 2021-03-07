/**
 * External dependencies
 */
import { strictEqual } from 'assert';

/**
 * Internal dependencies
 */
import { isTolerantStringMatch } from '../stream-list.jsx';

/* isTolerantStringMatch */

strictEqual(
	isTolerantStringMatch('age of empires definitive edition', 'Age of Empires: Definitive Edition'),
	true,
	'Normalizes case, ignores whitespace, punctuation'
);
