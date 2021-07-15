import { h } from 'preact';

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns a Section element.
 *
 * @param {Object}            props               Component props.
 * @param {string}            props.title         Section title.
 * @param {string}            [props.description] Optional section description.
 * @param {ComponentChildren} [props.children]    Contents of section.
 */
function Section({ title, description, children }) {
	return (
		<section className="section">
			<header>
				<h2 className="section__heading">{title}</h2>
			</header>
			{description && <p className="section__description">{description}</p>}
			{children}
		</section>
	);
}

export default Section;
