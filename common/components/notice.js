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
 * Returns a Notice element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}          props               Component props.
 * @param {string|void}     props.icon          Icon slug, if icon to be shown.
 * @param {string}          props.title         Card title.
 * @param {string}          props.text          Notice contents.
 * @param {string|void}     props.className     Optional additional classname.
 * @param {string|void}     props.buttonText    Action button text, if button to
 *                                              be shown.
 * @param {(()=>void)|void} props.buttonOnClick Action button callback, if
 *                                              button to be shown.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function Notice( { icon, text, buttonText, buttonOnClick, className } ) {
	className = [ 'notice', className ].filter( Boolean ).join( ' ' );

	return html`
		<div class=${ className }>
			${ icon && html`
				<${ Icon }
					icon=${ icon }
					height="18"
					className="notice__icon"
				/>
			` }
			<div class="notice__text">
				${ text }
			</div>
			${ buttonText && html`
				<button
					type="button"
					onClick=${ buttonOnClick }
					class="notice__button is-compact"
				>
					${ buttonText }
				</button>
			` }
		</div>
	`;
}

export default Notice;
