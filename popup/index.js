/**
 * External dependencies
 */
import { render, h } from '/web_modules/preact.js';

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
		render( h( Root, { store } ), appRoot );
	}
} );
