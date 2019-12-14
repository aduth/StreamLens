/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/**
 * Internal dependencies
 */
import useSelect from '../hooks/use-select.js';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns a wrapping element which assigns the color context as a data
 * attribute on its wrapping element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}            props          Component props.
 * @param {ComponentChildren} props.children Contents of section.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function ColorScheme( { children } ) {
	const colorScheme = useSelect( ( state ) => state.preferences.colorScheme );
	const normalColorScheme = colorScheme === null ? 'inherit' : colorScheme;

	return html`
		<div class="color-scheme is-${ normalColorScheme }">
			${ children }
		</div>
	`;
}

export default ColorScheme;
