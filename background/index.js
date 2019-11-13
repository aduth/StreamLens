/**
 * Internal dependencies
 */
import { createStore } from './store.js';
import * as badge from './badge.js';
import * as providers from './providers.js';
import * as persistence from './persistence.js';
import * as migrations from './migrations.js';

window.store = new Promise( async ( resolve ) => {
	const store = createStore( await persistence.get() );

	migrations.initialize();
	badge.initialize( store );
	providers.initialize( store );
	persistence.initialize( store );

	resolve( store );
} );
