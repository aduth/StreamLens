import { h } from 'preact';
import { render } from '@testing-library/preact';
import { StoreContext } from '@streamlens/state';
import { useStubbedGlobal } from '@streamlens/stub-global';
import { expect } from 'chai';
import createStore from 'unistore';
import { SyncStore } from 'unistore-browser-sync';
import Badge from '../badge';
import { SLState, DEFAULT_STATE } from '../../store';

describe('Badge', () => {
	useStubbedGlobal('browser.browserAction.setBadgeText');
	useStubbedGlobal('browser.browserAction.setBadgeBackgroundColor');

	function renderWithState(state: Partial<SLState>) {
		const store = createStore({ ...DEFAULT_STATE, ...state }) as SyncStore<SLState>;
		return render(
			<StoreContext.Provider value={store}>
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
