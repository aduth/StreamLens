/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns a Section element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}            props               Component props.
 * @param {string}            props.title         Section title.
 * @param {string}            [props.description] Optional section description.
 * @param {ComponentChildren} [props.children]    Contents of section.
 *
 * @return {import('preact').VNode} Rendered element.
 */
function Section( { title, description, children } ) {
	return h(
		'section',
		{ className: 'section' },
		h(
			'header',
			null,
			h(
				'h2',
				{ className: 'section__heading' },
				title,
			),
		),
		description && h(
			'p',
			{ className: 'section__description' },
			description,
		),
		children,
	);
}

export default Section;
