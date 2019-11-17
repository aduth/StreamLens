/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

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
 * @param {Object}            props               Component props.
 * @param {string|void}       props.icon          Icon slug, if icon to be
 *                                                shown.
 * @param {string}            props.title         Card title.
 * @param {ComponentChildren} props.children      Card contents.
 * @param {string|void}       props.className     Optional additional classname.
 * @param {string|void}       props.buttonText    Action button text, if button
 *                                                to be shown.
 * @param {(()=>void)|void}   props.buttonOnClick Action button callback, if
 *                                                button to be shown.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function Card( { icon, title, children, className, buttonText, buttonOnClick } ) {
	className = [ 'card', className ].filter( Boolean ).join( ' ' );

	return html`
		<div class=${ className }>
			${ icon && html`
				<${ Icon }
					icon=${ icon }
					height="40"
					className="card__icon"
				/>
			` }
			<h4 class="card__title">
				${ title }
			</h4>
			<p class="card__description">
				${ children }
			</p>
			${ buttonText && html`
				<button
					type="button"
					onClick=${ buttonOnClick }
					class="card__button"
				>
					${ buttonText }
				</button>
			` }
		</div>
	`;
}

export default Card;
