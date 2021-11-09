import { h } from 'preact';
import { StoreContext } from 'prsh';
import { SyncStore } from 'unistore-browser-sync';
import { ColorScheme } from '@streamlens/components';
import TokenErrors from './token-errors';
import GettingStarted from './getting-started';
import StreamList from './stream-list';
import { SearchProvider } from './search-context';

interface RootProps {
	/**
	 * Store instance.
	 */
	store: SyncStore;
}

/**
 * Returns a Root element.
 */
function Root({ store }: RootProps) {
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
