/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/**
 * Icon details.
 *
 * @typedef {Object} SLIconDetails
 *
 * @property {number} viewBoxWidth Width to assign in SVG `viewBox` attribute.
 * @property {string} path         SVG Path element `d` attribute.
 */

/**
 * Icon details, keyed by icon slug.
 *
 * @type {Object<string,SLIconDetails>}
 */
const ICONS = {
	alert: {
		viewBoxWidth: 576,
		path: 'M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z',
	},
	video: {
		viewBoxWidth: 576,
		path: 'M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z',
	},
	'video-slash': {
		viewBoxWidth: 640,
		path: 'M633.8 458.1l-55-42.5c15.4-1.4 29.2-13.7 29.2-31.1v-257c0-25.5-29.1-40.4-50.4-25.8L448 177.3v137.2l-32-24.7v-178c0-26.4-21.4-47.8-47.8-47.8H123.9L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4L42.7 82 416 370.6l178.5 138c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.5-6.9 4.2-17-2.8-22.4zM32 400.2c0 26.4 21.4 47.8 47.8 47.8h288.4c11.2 0 21.4-4 29.6-10.5L32 154.7v245.5z',
	},
};

/**
 * Returns a Notice element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}      props           Component props.
 * @param {string}      props.icon      Icon slug.
 * @param {string|void} props.width     Optional explicit width.
 * @param {string|void} props.height    Optional explicit height.
 * @param {string|void} props.className Optional additional class name.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function Icon( { icon, width, height, className } ) {
	const { viewBoxWidth, path } = ICONS[ icon ];

	return html`
		<svg
			aria-hidden="true"
			focusable="false"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox=${ `0 0 ${ viewBoxWidth } 512` }
			width=${ width }
			height=${ height }
			class=${ className }
		>
			<path
				fill="currentColor"
				d=${ path }
			/>
		</svg>
	`;
}

export default Icon;
