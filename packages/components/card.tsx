import { h, ComponentChildren } from 'preact';
import Icon from './icon';

interface CardProps {
	/**
	 * Icon slug, if icon to be shown.
	 */
	icon?: string;

	/**
	 * Card title.
	 */
	title: string;

	/**
	 * Card contents.
	 */
	children?: ComponentChildren;

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
 * Returns a Card element.
 */
function Card({ icon, title, children, className, buttonText, buttonOnClick }: CardProps) {
	className = ['card', className].filter(Boolean).join(' ');

	return (
		<div className={className}>
			{icon && <Icon icon={icon} height="40" className="card__icon" />}
			<h4 className="card__title">{title}</h4>
			<p className="card__description">{children}</p>
			{buttonText && buttonOnClick && (
				<button type="button" onClick={() => buttonOnClick()} className="card__button">
					{buttonText}
				</button>
			)}
		</div>
	);
}

export default Card;
