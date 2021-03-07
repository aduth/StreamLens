/**
 * External dependencies
 */
import { h, Fragment } from 'preact';

/**
 * Project dependencies
 */
import { ProviderLabel } from '@streamlens/components';
import { useSelect, useDispatch } from '@streamlens/hooks';

/**
 * Internal dependencies
 */
import ProviderTokenError from './provider-token-error.js';

/** @typedef {import('/background/providers').SLProvider} SLProvider */

/**
 * Returns a Provider Authorization element.
 *
 * @param {Object} props              Component props.
 * @param {string} props.providerName Provider name.
 */
function ProviderAuthorization({ providerName }) {
	const dispatch = useDispatch();
	const auth = useSelect((state) => state.auth);

	const providerAuth = auth[providerName];

	let classes = `provider-authorization__button is-provider-${providerName}`;
	if (providerAuth) {
		classes += ' is-authorized';
	}

	return (
		<>
			<h3 className="provider-authorization__heading">
				<ProviderLabel providerName={providerName} />
			</h3>
			{providerAuth && providerAuth.token === null && (
				<ProviderTokenError providerName={providerName} />
			)}
			{providerAuth && (
				<div className="provider-authorization__user">
					{browser.i18n.getMessage('optionsAuthorizationLogin')}' '
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
