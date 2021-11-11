import { useEffect } from 'preact/hooks';
import { useDispatch } from '@streamlens/state';

/**
 * Component managing online status, responding to global events.
 */
function ConnectionStatus() {
	const dispatch = useDispatch();

	useEffect(() => {
		const toggleIsOnline = (isOnline) => dispatch('toggleIsOnline', isOnline);
		const setIsOnline = () => toggleIsOnline(true);
		const setIsOffline = () => toggleIsOnline(false);

		self.addEventListener('online', setIsOnline);
		self.addEventListener('offline', setIsOffline);

		return () => {
			self.removeEventListener('online', setIsOnline);
			self.removeEventListener('offline', setIsOffline);
		};
	}, []);

	return null;
}

export default ConnectionStatus;
