/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns text intended to be present in the DOM but visually hidden,
 * typically used for screen reader text.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}            props            Component props.
 * @param {ComponentChildren} [props.children] Hidden contents.
 *
 * @return {import('preact').VNode} Rendered element.
 */
function VisuallyHidden( { children } ) {
	return h( 'span', { className: 'visually-hidden' }, children );
}

export default VisuallyHidden;
