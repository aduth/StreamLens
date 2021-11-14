import { h } from 'preact';
import { StoreContext } from '@streamlens/state';
import { SyncStore } from 'unistore-browser-sync';
import ProviderAuthorizations from './provider-authorizations';
import ColorSchemeSetting from './color-scheme-setting';

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
			<ProviderAuthorizations />
			<ColorSchemeSetting />
		</StoreContext.Provider>
	);
}

export default Root;
