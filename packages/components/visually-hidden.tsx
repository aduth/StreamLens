import { ComponentChildren } from 'preact';

interface VisuallyHiddenProps {
	/**
	 * Hidden contents.
	 */
	children: ComponentChildren;
}

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns text intended to be present in the DOM but visually hidden,
 * typically used for screen reader text.
 */
function VisuallyHidden({ children }: VisuallyHiddenProps) {
	return <span className="visually-hidden">{children}</span>;
}

export default VisuallyHidden;
