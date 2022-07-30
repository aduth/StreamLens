import { SyncStore } from 'unistore-browser-sync';
import { StoreContext } from '@streamlens/state';
import { ColorScheme } from '@streamlens/components';
import TokenErrors from './token-errors';
import GettingStarted from './getting-started';
import StreamList from './stream-list';
import { SearchProvider } from './search-context';
import IfAuthenticated from './if-authenticated';
import IfOnline from './if-online';
import OfflineWarning from './offline-warning';

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
					<IfAuthenticated>
						<IfOnline>
							<TokenErrors />
							<StreamList />
						</IfOnline>
						<IfOnline.Else>
							<OfflineWarning />
						</IfOnline.Else>
					</IfAuthenticated>
					<IfAuthenticated.Else>
						<GettingStarted />
					</IfAuthenticated.Else>
				</ColorScheme>
			</SearchProvider>
		</StoreContext.Provider>
	);
}

export default Root;
