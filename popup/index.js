/**
 * External dependencies
 */
import { render, h } from '/web_modules/preact.js';
import createStore from '/web_modules/unistore.js';
import { replica } from '/web_modules/unistore-browser-sync.js';

/**
 * Internal dependencies
 */
import Root from './components/root.js';

replica( createStore() ).then( ( store ) => {
	const appRoot = document.getElementById( 'app' );
	if ( appRoot ) {
		render( h( Root, { store } ), appRoot );
	}
} );
