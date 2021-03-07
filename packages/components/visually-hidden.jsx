/**
 * External dependencies
 */
import { h } from 'preact';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns text intended to be present in the DOM but visually hidden,
 * typically used for screen reader text.
 *
 * @param {Object}            props            Component props.
 * @param {ComponentChildren} [props.children] Hidden contents.
 */
function VisuallyHidden({ children }) {
	return <span className="visually-hidden">{children}</span>;
}

export default VisuallyHidden;
