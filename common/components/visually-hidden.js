/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns text intended to be present in the DOM but visually hidden,
 * typically used for screen reader text.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}            props          Component props.
 * @param {ComponentChildren} props.children Hidden contents.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function VisuallyHidden( { children } ) {
	return html`<span class="visually-hidden">${ children }</span>`;
}

export default VisuallyHidden;
