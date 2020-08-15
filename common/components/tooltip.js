/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * @typedef TooltipProps
 *
 * @property {string}            [tagName]   Optional container type.
 * @property {string}            text        Tooltip text.
 * @property {TooltipPosition}   [position]  Tooltip position.
 * @property {ComponentChildren} [children]  Tooltip children, used as content
 *                                           to position tooltip against.
 * @property {string}            [className] Optional class name.
 */

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
 * @param {TooltipProps & Record<string,any>} props Component props.
 *
 * @return {import('preact').VNode} Rendered element.
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

	return h(
		tagName,
		{
			...props,
			className: classes,
		},
		h(
			'span',
			{
				'aria-hidden': true,
				clssName: 'tooltip__arrow',
			},
		),
		h(
			'span',
			{ className: 'tooltip__text' },
			text,
		),
		children,
	);
}

export default Tooltip;
