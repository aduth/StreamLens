/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { createContext } from '/web_modules/preact.js';
import { useState } from '/web_modules/preact/hooks.js';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/** @type {import('preact').Context<[string,import('preact/hooks').StateUpdater<string>]>} */
export const SearchContext = createContext( [ '', () => {} ] );

/**
 * Returns an element which provides the search state context to its children.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}            props          Component props.
 * @param {ComponentChildren} props.children Context children.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
export function SearchProvider( { children } ) {
	const value = useState( '' );

	return html`
		<${ SearchContext.Provider } value=${ value }>
			${ children }
		<//>
	`;
}
