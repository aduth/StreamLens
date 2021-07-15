import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import useSelect from '../hooks/use-select.js';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns a wrapping element which assigns the color context as a data
 * attribute on its wrapping element.
 *
 * @param {Object}            props          Component props.
 * @param {ComponentChildren} props.children Contents of section.
 */
function ColorScheme({ children }) {
	const colorScheme = useSelect((state) => state.preferences.colorScheme);

	useEffect(() => {
		const normalColorScheme = colorScheme === null ? 'inherit' : colorScheme;
		document.body.dataset.theme = normalColorScheme;
	}, [colorScheme]);

	return <>{children}</>;
}

export default ColorScheme;
