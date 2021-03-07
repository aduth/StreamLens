/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';

/**
 * Internal dependencies
 */
import Icon from './icon.js';

/** @typedef {import('preact').VNode[]} VNode */

/**
 * Returns a Notice element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}     props                 Component props.
 * @param {string}     [props.icon]          Icon slug, if icon to be shown.
 * @param {string}     props.text            Notice contents.
 * @param {string}     [props.className]     Optional additional classname.
 * @param {string}     [props.buttonText]    Action button text, if button to be
 *                                           shown.
 * @param {(()=>void)} [props.buttonOnClick] Action button callback, if button
 *                                           to be shown.
 *
 * @return {import('preact').VNode} Rendered element.
 */
function Notice( { icon, text, buttonText, buttonOnClick, className } ) {
	className = [ 'notice', className ].filter( Boolean ).join( ' ' );

	return h(
		'div',
		{ className },
		icon &&
			h( Icon, {
				icon,
				height: '18',
				className: 'notice__icon',
			} ),
		h( 'div', { className: 'notice__text' }, text ),
		buttonText &&
			buttonOnClick &&
			h(
				'button',
				{
					type: 'button',
					onClick: () => buttonOnClick(),
					className: 'notice__button is-compact',
				},
				buttonText
			)
	);
}

export default Notice;
