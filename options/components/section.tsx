import { h, ComponentChildren } from 'preact';

interface SectionProps {
	/**
	 * Section title.
	 */
	title: string;

	/**
	 * Optional section description.
	 */
	description?: string;

	/**
	 * Contents of section.
	 */
	children?: ComponentChildren;
}

/** @typedef {import('preact').ComponentChildren} ComponentChildren */

/**
 * Returns a Section element.
 */
function Section({ title, description, children }: SectionProps) {
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
