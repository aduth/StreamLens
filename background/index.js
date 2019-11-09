/**
 * Internal dependencies
 */
import { createStore } from './store.js';
import * as badge from './badge.js';
import * as providers from './providers.js';
import * as persistence from './persistence.js';

const store = window.store = createStore( persistence.get() );

badge.initialize( store );
providers.initialize( store );
persistence.initialize( store );
