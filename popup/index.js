/**
 * External dependencies
 */
import { render, Fragment } from '/web_modules/preact.js';
import { html } from '/web_modules/htm/preact.js';

/**
 * Internal dependencies
 */
import Root from './components/root.js';

( async () => {
	const store = await ( await browser.runtime.getBackgroundPage() ).store;
	const appRoot = document.getElementById( 'app' );
	if ( ! appRoot ) {
		return;
	}

	render( html`<${ Root } store=${ store } />`, appRoot );

	// Clean up on unload to avoid lingering subscriptions to store. This
	// forces unmount on all subscribing components.
	window.addEventListener( 'unload', () => {
		render(
			html`<${ Fragment }/>`,
			appRoot,
			appRoot.firstElementChild || undefined,
		);
	} );
} )();
