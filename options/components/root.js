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
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}    props       Component props.
 * @param {SyncStore} props.store Store instance.
 *
 * @return {import('preact').VNode} Rendered element.
 */
function Root( { store } ) {
	return h( StoreContext.Provider, {
		value: store,
		children: [ h( ProviderAuthorizations, null ), h( ColorSchemeSetting, null ) ],
	} );
}

export default Root;
