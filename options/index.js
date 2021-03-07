/**
 * External dependencies
 */
import { render, h } from 'preact';
import createStore from 'unistore';
import { replica } from 'unistore-browser-sync';

/**
 * Internal dependencies
 */
import Root from './components/root.js';

replica(createStore()).then((store) => {
	const appRoot = document.getElementById('app');
	if (appRoot) {
		render(h(Root, { store }), appRoot);
	}
});
