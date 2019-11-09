/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { StoreProvider } from '/web_modules/@preact-hooks/unistore.js';

/**
 * Internal dependencies
 */
import TokenErrors from './token-errors.js';
import GettingStarted from './getting-started.js';
import StreamList from './stream-list.js';

/**
 * @typedef {import('/background/store').SLStore} SLStore
 */

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
			<${ TokenErrors } />
			<${ GettingStarted } />
			<${ StreamList } />
		<//>
	`;
}

export default Root;
