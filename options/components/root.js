/**
 * External dependencies
 */
import { h } from 'preact';
import { StoreContext } from 'prsh';

/**
 * Internal dependencies
 */
import ProviderAuthorizations from './provider-authorizations.js';
import ColorSchemeSetting from './color-scheme-setting.js';

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
			<ProviderAuthorizations />
			<ColorSchemeSetting />
		</StoreContext.Provider>
	);
}

export default Root;
