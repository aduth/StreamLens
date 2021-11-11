import { useDispatch } from '@streamlens/state';
import { useEffect } from 'preact/hooks';
import { InvalidTokenError, SLProvider } from '../providers';
import { SLAuth } from '../store';

/**
 * Interval at which stream data should refresh when using default subscribe
 * implementation, in milliseconds.
 */
const REFRESH_INTERVAL = 30000;

interface ProviderSubscriptionProps {
	provider: SLProvider;
	auth: SLAuth;
}

function ProviderSubscription({ provider, auth }: ProviderSubscriptionProps) {
	const dispatch = useDispatch();

	useEffect(() => {
		async function refresh() {
			try {
				const streams = await provider.getStreams(auth);
				dispatch('updateStreams', provider.name, streams);
			} catch (error) {
				if (error instanceof InvalidTokenError) {
					dispatch('setTokenError', provider.name);
				} else {
					throw error;
				}
			}
		}

		refresh();
		const intervalId = setInterval(refresh, REFRESH_INTERVAL);
		return () => clearInterval(intervalId);
	}, [auth]);

	return null;
}

export default ProviderSubscription;
