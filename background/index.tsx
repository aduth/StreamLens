import { h, render } from 'preact';
import createStore from 'unistore';
import { primary } from 'unistore-browser-sync';
import { StoreContext } from 'prsh';
import { getInitialState } from './store';
import Badge from './components/badge';
import * as providers from './providers';
import * as persistence from './persistence';
import * as migrations from './migrations';
import * as actions from './store/actions';

(async () => {
	const initialState = await getInitialState();
	const store = primary(createStore(initialState), { ...actions });

	migrations.initialize();
	providers.initialize(store);
	persistence.initialize(store);

	render(
		<StoreContext.Provider value={store}>
			<Badge />
		</StoreContext.Provider>,
		{} as Document
	);
})();
