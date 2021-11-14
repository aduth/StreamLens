import { h } from 'preact';
import { StoreContext } from 'prsh';
import { render } from '@testing-library/preact';
import { useStubbedGlobal } from '@streamlens/stub-global';
import { expect } from 'chai';
import createStore from 'unistore';
import Badge from '../badge';
import { SLState, DEFAULT_STATE } from '../../store';

describe('Badge', () => {
	useStubbedGlobal('browser.browserAction.setBadgeText');
	useStubbedGlobal('browser.browserAction.setBadgeBackgroundColor');

	function renderWithState(state: Partial<SLState>) {
		render(
			<StoreContext.Provider value={createStore({ ...DEFAULT_STATE, ...state })}>
				<Badge />
			</StoreContext.Provider>
		);
	}

	context('offline', () => {
		it('sets error state', () => {
			renderWithState({ isOnline: false });

			expect(browser.browserAction.setBadgeText).to.have.been.calledWith({ text: '?' });
		});
	});
});
