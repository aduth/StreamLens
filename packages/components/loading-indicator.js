/**
 * External dependencies
 */
import { h } from 'preact';

/**
 * Returns a Loading Indicator element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {import('preact').VNode} Rendered element.
 */
function LoadingIndicator() {
	const label = browser.i18n.getMessage( 'commonLoadingIndicatorLabel' );

	return h(
		'div',
		{
			className: 'loading-indicator',
			role: 'status',
			'aria-label': label,
		},
		h( 'div', { className: 'loading-indicator__dot' } ),
		h( 'div', { className: 'loading-indicator__dot' } ),
		h( 'div', { className: 'loading-indicator__dot' } )
	);
}

export default LoadingIndicator;
