/**
 * External dependencies
 */
import { useEffect } from 'preact/hooks';

/**
 * Internal dependencies
 */
import useSelect from '../hooks/use-select.js';

/** @typedef {import('preact').VNode} VNode */

/**
 * Returns a wrapping element which assigns the color context as a data
 * attribute on its wrapping element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object} props          Component props.
 * @param {VNode}  props.children Contents of section.
 *
 * @return {import('preact').VNode} Rendered element.
 */
function ColorScheme({ children }) {
	const colorScheme = useSelect((state) => state.preferences.colorScheme);

	useEffect(() => {
		const normalColorScheme = colorScheme === null ? 'inherit' : colorScheme;
		document.body.dataset.theme = normalColorScheme;
	}, [colorScheme]);

	return children;
}

export default ColorScheme;
