import { h } from 'preact';

/**
 * Returns a Loading Indicator element.
 */
function LoadingIndicator() {
	const label = browser.i18n.getMessage('commonLoadingIndicatorLabel');

	return (
		<div className="loading-indicator" role="status" aria-label={label}>
			<div className="loading-indicator__dot" />
			<div className="loading-indicator__dot" />
			<div className="loading-indicator__dot" />
		</div>
	);
}

export default LoadingIndicator;
