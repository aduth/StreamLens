import { h, render } from 'preact';
import createStore from 'unistore';
import { primary } from 'unistore-browser-sync';
import { StoreContext } from 'prsh';
import { getInitialState } from './store';
import Badge from './components/badge';
import Persistence from './components/persistence';
import Migrations from './components/migrations';
import * as providers from './providers';
import * as actions from './store/actions';

(async () => {
	const initialState = await getInitialState();
	const store = primary(createStore(initialState), { ...actions });

	providers.initialize(store);

	render(
		<StoreContext.Provider value={store}>
			<Badge />
			<Persistence />
			<Migrations />
		</StoreContext.Provider>,
		{} as Document
	);
})();
