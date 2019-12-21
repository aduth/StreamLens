/**
 * External dependencies
 */
import createStore from '/web_modules/unistore.js';
import { primary } from '/web_modules/unistore-browser-sync.js';

/**
 * Internal dependencies
 */
import { getInitialState } from './store.js';
import * as badge from './badge.js';
import * as providers from './providers.js';
import * as persistence from './persistence.js';
import * as migrations from './migrations.js';
import * as actions from './store/actions.js';

( async () => {
	const initialState = await getInitialState();
	const store = primary( createStore( initialState ), { ...actions } );

	migrations.initialize();
	badge.initialize( store );
	providers.initialize( store );
	persistence.initialize( store );
} )();
