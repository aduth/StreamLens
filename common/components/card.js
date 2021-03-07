/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';

/**
 * Internal dependencies
 */
import Icon from './icon.js';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns a Card element.
 *
 * @type {import('preact').FunctionComponent}
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
 *
 * @return {import('preact').VNode} Rendered element.
 */
function Card( { icon, title, children, className, buttonText, buttonOnClick } ) {
	className = [ 'card', className ].filter( Boolean ).join( ' ' );

	return h(
		'div',
		{ className },
		icon &&
			h( Icon, {
				icon,
				height: '40',
				className: 'card__icon',
			} ),
		h( 'h4', { className: 'card__title' }, title ),
		h( 'p', { className: 'card__description' }, children ),
		buttonText &&
			buttonOnClick &&
			h(
				'button',
				{
					type: 'button',
					onClick: () => buttonOnClick(),
					className: 'card__button',
				},
				buttonText
			)
	);
}

export default Card;
