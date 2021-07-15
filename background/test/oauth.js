/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getRandomString } from '../oauth.js';

describe('getRandomString', () => {
	it('produces a string', () => {
		expect(getRandomString()).to.be.a('string');
	});

	it('produces a string of default length 32', () => {
		expect(getRandomString()).to.have.lengthOf(32);
	});

	it('produces a string of custom length', () => {
		expect(getRandomString(40)).to.have.lengthOf(40);
	});

	it('includes only base36', () => {
		expect(getRandomString()).to.not.match(/[^0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ]/i);
	});
});
