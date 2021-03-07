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
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}    props       Component props.
 * @param {SyncStore} props.store Store instance.
 *
 * @return {import('preact').VNode} Rendered element.
 */
function Root({ store }) {
	return h(StoreContext.Provider, {
		value: store,
		children: h(
			SearchProvider,
			null,
			h(ColorScheme, null, h(TokenErrors, null), h(GettingStarted, null), h(StreamList, null))
		),
	});
}

export default Root;
