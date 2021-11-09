import createStore from 'unistore';
import { primary } from 'unistore-browser-sync';
import { getInitialState } from './store';
import * as badge from './badge';
import * as providers from './providers';
import * as persistence from './persistence';
import * as migrations from './migrations';
import * as actions from './store/actions';

(async () => {
	const initialState = await getInitialState();
	const store = primary(createStore(initialState), { ...actions });

	migrations.initialize();
	badge.initialize(store);
	providers.initialize(store);
	persistence.initialize(store);
})();
