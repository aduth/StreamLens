/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { useSelector } from '/web_modules/@preact-hooks/unistore.js';

/**
 * Internal dependencies
 */
import Section from './section.js';
import ProviderAuthorization from './provider-authorization.js';

/**
 * Returns a Provider Authorizations element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function ProviderAuthorizations() {
	/**
	 * @type {import('/background/store').SLProvidersState}
	 */
	const providers = useSelector( ( state ) => state.providers );
	const title = browser.i18n.getMessage( 'optionsAuthorizationsTitle' );
	const description = browser.i18n.getMessage( 'optionsAuthorizationsDescription' );

	return html`
		<${ Section }
			title=${ title }
			description=${ description }
		>
			<ul class="provider-authorizations">
				${ Object
					.entries( providers )
					.map( ( [ providerName, provider ] ) => html`
						<li key=${ providerName }>
							<${ ProviderAuthorization } provider=${ provider } />
						</li>
					` ) }
			</ul>
		<//>
	`;
}

export default ProviderAuthorizations;
