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
import TokenErrors from './token-errors.jsx';
import GettingStarted from './getting-started.jsx';
import StreamList from './stream-list.jsx';
import { SearchProvider } from './search-context.jsx';

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
