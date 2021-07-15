import { h } from 'preact';

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
 * @param {TooltipProps & Record<string,any>} props Component props.
 */
function Tooltip({ tagName = 'div', text, position = 'top', children, className, ...props }) {
	const [y, x = 'center'] = position.split('-');
	const classes = ['tooltip', 'is-' + y, 'is-' + x, className].filter(Boolean).join(' ');

	return h(
		tagName,
		{
			...props,
			className: classes,
		},
		<span aria-hidden className="tooltip__arrow" />,
		<span className="tooltip__text">{text}</span>,
		children
	);
}

export default Tooltip;
