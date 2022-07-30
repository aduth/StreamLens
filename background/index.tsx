import { render } from 'preact';
import createStore from 'unistore';
import { primary } from 'unistore-browser-sync';
import { StoreContext } from '@streamlens/state';
import { getInitialState } from './store';
import Badge from './components/badge';
import Persistence from './components/persistence';
import Migrations from './components/migrations';
import Providers from './components/providers';
import ConnectionStatus from './components/connection-status';
import * as actions from './store/actions';

getInitialState().then((initialState) => {
	const store = primary(createStore(initialState), { ...actions });

	render(
		<StoreContext.Provider value={store}>
			<Badge />
			<Persistence />
			<Migrations />
			<Providers />
			<ConnectionStatus />
		</StoreContext.Provider>,
		{} as Document
	);
});
