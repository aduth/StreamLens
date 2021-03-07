/**
 * External dependencies
 */
import { h } from 'preact';
import { StoreContext } from 'prsh';

/**
 * Project dependencies
 */
import { ColorScheme } from '@streamlens/components';

/**
 * Internal dependencies
 */
import TokenErrors from './token-errors.js';
import GettingStarted from './getting-started.js';
import StreamList from './stream-list.js';
import { SearchProvider } from './search-context.js';

/** @typedef {import('unistore-browser-sync').SyncStore} SyncStore */

/**
 * Returns a Root element.
 *
 * @param {Object}    props       Component props.
 * @param {SyncStore} props.store Store instance.
 */
function Root({ store }) {
	return (
		<StoreContext.Provider value={store}>
			<SearchProvider>
				<ColorScheme>
					<TokenErrors />
					<GettingStarted />
					<StreamList />
				</ColorScheme>
			</SearchProvider>
		</StoreContext.Provider>
	);
}

export default Root;
