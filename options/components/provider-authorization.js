/**
 * External dependencies
 */
import { h, Fragment } from '/web_modules/preact.js';

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
 * @return {import('preact').VNode} Rendered element.
 */
function ProviderAuthorization( { providerName } ) {
	const dispatch = useDispatch();
	const auth = useSelect( ( state ) => state.auth );

	const providerAuth = auth[ providerName ];

	let classes = `provider-authorization__button is-provider-${ providerName }`;
	if ( providerAuth ) {
		classes += ' is-authorized';
	}

	return h(
		Fragment,
		null,
		h(
			'h3',
			{ className: 'provider-authorization__heading' },
			h( ProviderLabel, { providerName } )
		),
		providerAuth && providerAuth.token === null && h( ProviderTokenError, { providerName } ),
		providerAuth &&
			h(
				'div',
				{ className: 'provider-authorization__user' },
				browser.i18n.getMessage( 'optionsAuthorizationLogin' ),
				' ',
				h( 'strong', null, providerAuth.user.login )
			),
		h(
			'button',
			{
				onClick() {
					dispatch( providerAuth ? 'deauthenticate' : 'authenticate', providerName );
				},
				className: classes,
			},
			providerAuth
				? browser.i18n.getMessage( 'optionsAuthorizationDisconnect' )
				: h(
						Fragment,
						null,
						h( 'img', {
							src: `/images/provider-icons/${ providerName }.svg`,
							width: '20',
							height: '20',
							className: 'provider-authorization__provider',
						} ),
						browser.i18n.getMessage( 'optionsAuthorizationConnect' )
				  )
		)
	);
}

export default ProviderAuthorization;
