import { h, ComponentChildren } from 'preact';

/**
 * Valid tooltip position.
 */
export type TooltipPosition =
	| 'top'
	| 'top-center'
	| 'top-left'
	| 'bottom'
	| 'bottom-center'
	| 'bottom-left';

interface TooltipProps {
	/**
	 * Optional container type.
	 */
	tagName?: string;

	/**
	 * Tooltip text.
	 */
	text: string;

	/**
	 * Tooltip position.
	 */
	position?: TooltipPosition;

	/**
	 * Tooltip children, used as content to position tooltip against.
	 */
	children?: ComponentChildren;

	/**
	 * Optional class name.
	 */
	className?: string;
}

/**
 * Returns a Tooltip element.
 */
function Tooltip({
	tagName = 'div',
	text,
	position = 'top',
	children,
	className,
	...props
}: TooltipProps & Record<string, any>) {
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
