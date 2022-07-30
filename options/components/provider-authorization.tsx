import { Fragment } from 'preact';
import { useSelect, useDispatch } from '@streamlens/state';
import ProviderTokenError from './provider-token-error';

interface ProviderAuthorizationProps {
	/**
	 * Provider name.
	 */
	providerName: string;
}

/**
 * Returns a Provider Authorization element.
 */
function ProviderAuthorization({ providerName }: ProviderAuthorizationProps) {
	const dispatch = useDispatch();
	const auth = useSelect((state) => state.auth);

	const providerAuth = auth[providerName];

	let classes = `provider-authorization__button is-provider-${providerName}`;
	if (providerAuth) {
		classes += ' is-authorized';
	}

	return (
		<>
			{providerAuth && providerAuth.token === null && (
				<ProviderTokenError providerName={providerName} />
			)}
			{providerAuth && (
				<div className="provider-authorization__user">
					{browser.i18n.getMessage('optionsAuthorizationLogin')}{' '}
					<strong>{providerAuth.user.login}</strong>
				</div>
			)}
			<button
				type="button"
				onClick={() => {
					dispatch(providerAuth ? 'deauthenticate' : 'authenticate', providerName);
				}}
				className={classes}
			>
				{providerAuth ? (
					browser.i18n.getMessage('optionsAuthorizationDisconnect')
				) : (
					<>
						<img
							src={`/images/provider-icons/${providerName}.svg`}
							width="20"
							height="20"
							className="provider-authorization__provider"
						/>
						{browser.i18n.getMessage('optionsAuthorizationConnect')}
					</>
				)}
			</button>
		</>
	);
}

export default ProviderAuthorization;
