/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns a Root element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}            props             Component props.
 * @param {string}            props.title       Section title.
 * @param {string}            props.description Section description.
 * @param {ComponentChildren} props.children    Contents of section.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function Section( { title, description, children } ) {
	return html`
		<section class="section">
			<header>
				<h2 class="section__heading">${ title }</h2>
			</header>
			${ description && (
				html`<p class="section__description">${ description }</p>`
			) }
			${ children }
		</section>
	`;
}

export default Section;
