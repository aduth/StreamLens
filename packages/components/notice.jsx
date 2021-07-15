import { h } from 'preact';
import Icon from './icon.jsx';

/** @typedef {import('preact').ComponentChildren[]} VNode */

/**
 * Returns a Notice element.
 *
 * @param {Object}     props                 Component props.
 * @param {string}     [props.icon]          Icon slug, if icon to be shown.
 * @param {string}     props.text            Notice contents.
 * @param {string}     [props.className]     Optional additional classname.
 * @param {string}     [props.buttonText]    Action button text, if button to be
 *                                           shown.
 * @param {(()=>void)} [props.buttonOnClick] Action button callback, if button
 *                                           to be shown.
 */
function Notice({ icon, text, buttonText, buttonOnClick, className }) {
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
