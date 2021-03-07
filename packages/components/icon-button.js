/**
 * External dependencies
 */
import { h } from 'preact';

/**
 * Internal dependencies
 */
import Tooltip from './tooltip.js';
import Icon from './icon.js';

/** @typedef {import('./tooltip').TooltipPosition} TooltipPosition */

/**
 * IconButton component props.
 *
 * @typedef {Object} IconButtonProps
 *
 * @property {(event:Event)=>void} onClick         Click callback.
 * @property {string}              label           Tooltip text, and accessible
 *                                                 label for button.
 * @property {TooltipPosition}     tooltipPosition Tooltip position.
 */

/**
 * Returns an Icon element.
 *
 * @param {import('./icon').IconProps & IconButtonProps} props Component props.
 */
function IconButton({ onClick, label, tooltipPosition, ...iconProps }) {
	return (
		<Tooltip
			tagName="button"
			position={tooltipPosition}
			text={label}
			type="button"
			className="icon-button"
			aria-label={label}
			onClick={onClick}
		>
			<Icon {...iconProps} />
		</Tooltip>
	);
}

export default IconButton;
