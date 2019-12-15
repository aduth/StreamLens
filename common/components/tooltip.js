/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/** @typedef {import('preact').ComponentType} ComponentType */

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Valid tooltip position.
 *
 * @typedef {'top'|'top-center'|'top-left'|'bottom'|'bottom-center'|'bottom-left'} TooltipPosition
 */

/**
 * Returns a Tooltip element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}               props             Component props.
 * @param {string|ComponentType} [props.tagName]   Optional container type.
 * @param {string}               props.text        Tooltip text.
 * @param {TooltipPosition}      [props.position]  Tooltip position.
 * @param {ComponentChildren}    props.children    Tooltip children, used as
 *                                                 content against width tooltip
 *                                                 should be positioned.
 * @param {string}               [props.className] Optional class name.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function Tooltip( {
	tagName = 'div',
	text,
	position = 'top',
	children,
	className,
	...props
} ) {
	const [ y, x = 'center' ] = position.split( '-' );
	const classes = [
		'tooltip',
		'is-' + y,
		'is-' + x,
		className,
	].filter( Boolean ).join( ' ' );

	return html`
		<${ tagName } class=${ classes } ...${ props }>
			<span aria-hidden="true" class="tooltip__arrow"></span>
			<span class="tooltip__text">${ text }</span>
			${ children }
		</>
	`;
}

export default Tooltip;
