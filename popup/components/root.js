/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';

/**
 * Project dependencies
 */
import { StoreProvider } from '/common/components/store-context.js';
import ColorScheme from '/common/components/color-scheme.js';

/**
 * Internal dependencies
 */
import TokenErrors from './token-errors.js';
import GettingStarted from './getting-started.js';
import StreamList from './stream-list.js';
import { SearchProvider } from './search-context.js';

/** @typedef {import('/common/sync.js').SyncStore} SyncStore */

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
	return h(
		StoreProvider,
		{
			value: store,
			children: h(
				SearchProvider,
				null,
				h(
					ColorScheme,
					null,
					h( TokenErrors, null ),
					h( GettingStarted, null ),
					h( StreamList, null ),
				),
			),
		},
	);
}

export default Root;
