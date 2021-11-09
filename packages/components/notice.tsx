import { h } from 'preact';
import Icon from './icon';

interface NoticeProps {
	/**
	 * Icon slug, if icon to be shown.
	 */
	icon?: string;

	/**
	 * Notice contents.
	 */
	text: string;

	/**
	 * Optional additional classname.
	 */
	className?: string;

	/**
	 * Action button text, if button to be shown.
	 */
	buttonText?: string;

	/**
	 * Action button callback, if button to be shown.
	 */
	buttonOnClick?: () => void;
}

/**
 * Returns a Notice element.
 */
function Notice({ icon, text, buttonText, buttonOnClick, className }: NoticeProps) {
	className = ['notice', className].filter(Boolean).join(' ');

	return (
		<div className={className}>
			{icon && <Icon icon={icon} height="18" className="notice__icon" />}
			<div className="notice__text">{text}</div>
			{buttonText && buttonOnClick && (
				<button type="button" onClick={() => buttonOnClick()} className="notice__button is-compact">
					{buttonText}
				</button>
			)}
		</div>
	);
}

export default Notice;
