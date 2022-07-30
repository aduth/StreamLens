import { createContext, ComponentChildren } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';

interface SearchProviderProps {
	/**
	 * Context children.
	 */
	children: ComponentChildren;
}

export const SearchContext = createContext(['', () => {}] as [
	value: string,
	setValue: StateUpdater<string>
]);

/**
 * Returns an element which provides the search state context to its children.
 */
export function SearchProvider({ children }: SearchProviderProps) {
	const value = useState('');

	return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
