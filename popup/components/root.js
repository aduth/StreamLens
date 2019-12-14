/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

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

/** @typedef {import('/background/store').SLStore} SLStore */

/**
 * Returns a Root element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}  props       Component props.
 * @param {SLStore} props.store Store instance.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function Root( { store } ) {
	return html`
		<${ StoreProvider } value=${ store }>
			<${ ColorScheme }>
				<${ TokenErrors } />
				<${ GettingStarted } />
				<${ StreamList } />
			<//>
		<//>
	`;
}

export default Root;
