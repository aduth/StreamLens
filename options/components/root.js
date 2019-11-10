/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { StoreProvider } from '/web_modules/@preact-hooks/unistore.js';

/**
 * Internal dependencies
 */
import ProviderAuthorizations from './provider-authorizations.js';

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
			<${ ProviderAuthorizations } />
		<//>
	`;
}

export default Root;
