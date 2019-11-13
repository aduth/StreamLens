/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { useStore, useSelector } from '/web_modules/@preact-hooks/unistore.js';

/**
 * Project dependencies
 */
import { deauthenticate, authenticate } from '/background/store/actions.js';

/**
 * Internal dependencies
 */
import ProviderTokenError from './provider-token-error.js';

/** @typedef {import('/background/providers').SLProvider} SLProvider */

/**
 * Returns a Provider Authorization element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {Object}     props          Component props.
 * @param {SLProvider} props.provider Provider details.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function ProviderAuthorization( { provider } ) {
	/** @type {import('/background/store').SLStore} */
	const store = useStore();

	/** @type {import('/background/store').SLAuthState} */
	const auth = useSelector( ( state ) => state.auth );

	const providerAuth = auth[ provider.name ];

	let classes = `provider-authorization__button is-provider-${ provider.name }`;
	if ( providerAuth ) {
		classes += ' is-authorized';
	}

	return html`
		<h3 class="provider-authorization__heading">
			${ provider.label }
		</h3>
		${ providerAuth && providerAuth.token === null && html`
			<${ ProviderTokenError } providerName=${ provider.name } />
		` }
		${ providerAuth && html`
			<div class="provider-authorization__user">
				${ browser.i18n.getMessage( 'optionsAuthorizationLogin' ) }
				${ ' ' }
				<strong>${ providerAuth.user.login }</strong>
			</div>
		` }
		<button
			type="button"
			onClick=${ () => {
				store.action(
					providerAuth ?
						deauthenticate :
						authenticate,
				)( provider.name );
			} }
			class=${ classes }
		>
			${ providerAuth ?
				browser.i18n.getMessage( 'optionsAuthorizationDisconnect' ) :
				html`
					<img
						src="/images/provider-icons/${ provider.name }.svg"
						width="20"
						height="20"
						class="provider-authorization__provider"
					/>
					${ browser.i18n.getMessage( 'optionsAuthorizationConnect' ) }
				`
			}
		</button>
	`;
}

export default ProviderAuthorization;
