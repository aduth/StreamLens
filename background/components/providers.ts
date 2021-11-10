import { useDispatch, useSelect } from '@streamlens/state';
import { useEffect } from 'preact/hooks';
import { providers, InvalidTokenError } from '../providers';

/**
 * Interval at which stream data should refresh when using default subscribe
 * implementation, in milliseconds.
 */
const REFRESH_INTERVAL = 30000;

function Providers() {
	const dispatch = useDispatch();
	const auth = useSelect((state) => state.auth);

	useEffect(() => {
		Object.keys(providers).forEach((name) => dispatch('registerProviderName', name));
	}, []);

	useEffect(() => {
		const intervalIds = Object.keys(providers)
			.map((providerName) => {
				// Attach subscription only if valid usable token exists.
				const providerAuth = auth[providerName];
				const token = providerAuth?.token;
				if (!token) {
					return;
				}

				// If, by some chance, an authorization exists for an unknown provider name, abort.
				// This could occur given state persistence and future updates adding or removing
				// providers.
				const provider = providers[providerName];
				if (!provider) {
					return;
				}

				async function refresh() {
					try {
						const streams = await provider.getStreams(providerAuth);
						dispatch('updateStreams', providerName, streams);
					} catch (error) {
						if (error instanceof InvalidTokenError) {
							dispatch('setTokenError', providerName);
						} else {
							throw error;
						}
					}
				}

				refresh();
				return setInterval(refresh, REFRESH_INTERVAL);
			})
			.filter(Boolean) as ReturnType<typeof setTimeout>[];

		return () => intervalIds.forEach(clearInterval);
	}, [auth]);

	return null;
}

export default Providers;
