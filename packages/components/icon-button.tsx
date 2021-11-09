import { h } from 'preact';
import Tooltip, { TooltipPosition } from './tooltip';
import Icon, { IconProps } from './icon';

interface IconButtonProps extends IconProps {
	/**
	 * Click callback.
	 */
	onClick: (event: Event) => void;

	/**
	 * Tooltip text, and accessible label for button.
	 */
	label: string;

	/**
	 * Tooltip position.
	 */
	tooltipPosition: TooltipPosition;
}

/**
 * Returns an Icon element.
 */
function IconButton({ onClick, label, tooltipPosition, ...iconProps }: IconButtonProps) {
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
