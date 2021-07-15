import { h } from 'preact';
import Icon from './icon.jsx';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns a Card element.
 *
 * @param {Object}            props                 Component props.
 * @param {string}            [props.icon]          Icon slug, if icon to be
 *                                                  shown.
 * @param {string}            props.title           Card title.
 * @param {ComponentChildren} [props.children]      Card contents.
 * @param {string}            [props.className]     Optional additional
 *                                                  classname.
 * @param {string}            [props.buttonText]    Action button text, if
 *                                                  button to be shown.
 * @param {(()=>void)}        [props.buttonOnClick] Action button callback, if
 *                                                  button to be shown.
 */
function Card({ icon, title, children, className, buttonText, buttonOnClick }) {
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
