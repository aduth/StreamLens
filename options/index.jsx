/**
 * External dependencies
 */
import { render, h } from 'preact';
import createStore from 'unistore';
import { replica } from 'unistore-browser-sync';

/**
 * Internal dependencies
 */
import Root from './components/root.jsx';

replica(createStore()).then((store) => {
	const appRoot = document.getElementById('app');
	if (appRoot) {
		render(<Root store={store} />, appRoot);
	}
});
