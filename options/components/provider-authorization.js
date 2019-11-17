/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/**
 * Project dependencies
 */
import ProviderLabel from '/common/components/provider-label.js';
import useSelect from '/common/hooks/use-select.js';
import useDispatch from '/common/hooks/use-dispatch.js';

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
 * @param {Object} props              Component props.
 * @param {string} props.providerName Provider name.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function ProviderAuthorization( { providerName } ) {
	const dispatch = useDispatch();

	/** @type {import('/background/store').SLAuthState} */
	const auth = useSelect( ( state ) => state.auth );

	const providerAuth = auth[ providerName ];

	let classes = `provider-authorization__button is-provider-${ providerName }`;
	if ( providerAuth ) {
		classes += ' is-authorized';
	}

	return html`
		<h3 class="provider-authorization__heading">
			<${ ProviderLabel } providerName=${ providerName } />
		</h3>
		${ providerAuth && providerAuth.token === null && html`
			<${ ProviderTokenError } providerName=${ providerName } />
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
				dispatch(
					providerAuth ?
						'deauthenticate' :
						'authenticate',
					providerName,
				);
			} }
			class=${ classes }
		>
			${ providerAuth ?
				browser.i18n.getMessage( 'optionsAuthorizationDisconnect' ) :
				html`
					<img
						src="/images/provider-icons/${ providerName }.svg"
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
