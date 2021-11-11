import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch, useSelect } from '@streamlens/state';
import { providers } from '../providers';
import ProviderSubscription from './provider-subscription';

function Providers() {
	const dispatch = useDispatch();
	const auths = useSelect((state) => state.auth);
	const providerNames = useSelect((state) => state.providerNames);

	useEffect(() => {
		Object.keys(providers).forEach((name) => dispatch('registerProviderName', name));
	}, []);

	const subscriptions = providerNames
		.filter((name) => providers[name] && auths[name]?.token)
		.map((name) => (
			<ProviderSubscription key={name} provider={providers[name]} auth={auths[name]} />
		));

	return <>{subscriptions}</>;
}

export default Providers;
