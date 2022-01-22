import { h } from 'preact';
import { StoreContext } from '@streamlens/state';
import { SyncStore } from 'unistore-browser-sync';
import ProviderSettings from './provider-settings';
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
			<ProviderSettings />
			<ColorSchemeSetting />
		</StoreContext.Provider>
	);
}

export default Root;
