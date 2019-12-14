/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/**
 * Project dependencies
 */
import { StoreProvider } from '/common/components/store-context.js';

/**
 * Internal dependencies
 */
import ProviderAuthorizations from './provider-authorizations.js';
import ColorSchemeSetting from './color-scheme-setting.js';

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
			<${ ColorSchemeSetting } />
		<//>
	`;
}

export default Root;
