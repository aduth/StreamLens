/**
 * External dependencies
 */
import { render } from '/web_modules/preact.js';
import { html } from '/web_modules/htm/preact.js';

/**
 * Project dependencies
 */
import { createReplicaStore } from '/common/sync.js';

/**
 * Internal dependencies
 */
import Root from './components/root.js';

createReplicaStore().then( ( store ) => {
	const appRoot = document.getElementById( 'app' );
	if ( appRoot ) {
		render( html`<${ Root } store=${ store } />`, appRoot );
	}
} );
