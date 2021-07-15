import { expect } from 'chai';
import { isTolerantStringMatch } from '../stream-list.jsx';

describe('isTolerantStringMatch', () => {
	it('normalizes case, ignores whitespace, punctuation', () => {
		expect(
			isTolerantStringMatch(
				'age of empires definitive edition',
				'Age of Empires: Definitive Edition'
			)
		).to.be.true;
	});
});
