/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/**
 * Returns a Loading Indicator element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function LoadingIndicator() {
	const label = browser.i18n.getMessage( 'commonLoadingIndicatorLabel' );

	return html`
		<div
			class="loading-indicator"
			role="status"
			aria-label=${ label }
		>
			<div class="loading-indicator__dot" />
			<div class="loading-indicator__dot" />
			<div class="loading-indicator__dot" />
		</div>
	`;
}

export default LoadingIndicator;
