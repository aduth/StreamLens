import { h, createContext } from 'preact';
import { useState } from 'preact/hooks';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/** @type {import('preact').Context<[string,import('preact/hooks').StateUpdater<string>]>} */
export const SearchContext = createContext(['', () => {}]);

/**
 * Returns an element which provides the search state context to its children.
 *
 * @param {Object}            props          Component props.
 * @param {ComponentChildren} props.children Context children.
 */
export function SearchProvider({ children }) {
	const value = useState('');

	return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
