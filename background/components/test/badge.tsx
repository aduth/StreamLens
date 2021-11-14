import { h } from 'preact';
import { render } from '@testing-library/preact';
import { StoreContext } from '@streamlens/state';
import { useStubbedGlobal } from '@streamlens/stub-global';
import { expect } from 'chai';
import createStore from 'unistore';
import { SyncStore } from 'unistore-browser-sync';
import Badge, { Colors } from '../badge';
import { SLState, SLStream, DEFAULT_STATE } from '../../store';

describe('Badge', () => {
	useStubbedGlobal('browser.browserAction.setBadgeText');
	useStubbedGlobal('browser.browserAction.setBadgeBackgroundColor');

	function renderWithState(state: Partial<SLState>) {
		const store = createStore({ ...DEFAULT_STATE, ...state }) as SyncStore<SLState>;
		return render(<Badge />, {
			wrapper({ children }) {
				return <StoreContext.Provider value={store} children={children} />;
			},
		});
	}

	context('offline', () => {
		it('sets error state', () => {
			renderWithState({ isOnline: false });

			expect(browser.browserAction.setBadgeText).to.have.been.calledWith({ text: '?' });
			expect(browser.browserAction.setBadgeBackgroundColor).to.have.been.calledWith({
				color: Colors.ERROR,
			});
		});

		it('sets error state after going offline', () => {
			const { rerender } = renderWithState({ isOnline: true });
			rerender({ isOnline: false });

			expect(browser.browserAction.setBadgeText).to.have.been.calledWith({ text: '?' });
			expect(browser.browserAction.setBadgeBackgroundColor).to.have.been.calledWith({
				color: Colors.ERROR,
			});
		});

		it('sets default state after coming offline', () => {
			const { rerender } = renderWithState({ isOnline: false });
			rerender({ isOnline: false });

			expect(browser.browserAction.setBadgeText).to.have.been.calledWith({ text: '' });
			expect(browser.browserAction.setBadgeBackgroundColor).to.have.been.calledWith({
				color: Colors.DEFAULT,
			});
		});
	});

	context('error token', () => {
		it('sets error state', () => {
			renderWithState({ auth: { twitch: { token: null, user: { login: '' } } }, isOnline: true });

			expect(browser.browserAction.setBadgeText).to.have.been.calledWith({ text: '?' });
			expect(browser.browserAction.setBadgeBackgroundColor).to.have.been.calledWith({
				color: Colors.ERROR,
			});
		});
	});

	context('without initial fetch', () => {
		it('sets empty text', () => {
			renderWithState({ auth: { twitch: { token: '', user: { login: '' } } }, isOnline: true });

			expect(browser.browserAction.setBadgeText).to.have.been.calledWith({ text: '' });
			expect(browser.browserAction.setBadgeBackgroundColor).to.have.been.calledWith({
				color: Colors.DEFAULT,
			});
		});
	});

	context('with fetched data', () => {
		it('sets stream count', () => {
			renderWithState({
				auth: { twitch: { token: '', user: { login: '' } } },
				streams: {
					data: [{} as SLStream, {} as SLStream],
					lastReceived: {
						twitch: Date.now(),
					},
				},
				isOnline: true,
			});

			expect(browser.browserAction.setBadgeText).to.have.been.calledWith({ text: '2' });
			expect(browser.browserAction.setBadgeBackgroundColor).to.have.been.calledWith({
				color: Colors.DEFAULT,
			});
		});

		it('sets zero count', () => {
			renderWithState({
				auth: { twitch: { token: '', user: { login: '' } } },
				streams: {
					data: [],
					lastReceived: {
						twitch: Date.now(),
					},
				},
				isOnline: true,
			});

			expect(browser.browserAction.setBadgeText).to.have.been.calledWith({ text: '0' });
			expect(browser.browserAction.setBadgeBackgroundColor).to.have.been.calledWith({
				color: Colors.DEFAULT,
			});
		});
	});
});
