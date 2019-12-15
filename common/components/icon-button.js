/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

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
 * @type {import('preact').FunctionComponent}
 *
 * @param {import('./icon').IconProps & IconButtonProps} props Component props.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function IconButton( { onClick, label, tooltipPosition, ...iconProps } ) {
	return html`
		<${ Tooltip }
			tagName="button"
			position=${ tooltipPosition }
			text=${ label }
			type="button"
			onClick=${ onClick }
			className="icon-button"
			aria-label=${ label }
		>
			<${ Icon } ...${ iconProps } />
		<//>
	`;
}

export default IconButton;
