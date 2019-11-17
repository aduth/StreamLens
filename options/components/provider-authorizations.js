/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/**
 * Project dependencies
 */
import useSelect from '/common/hooks/use-select.js';

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
	/** @type {import('/background/store').SLProviderNamesState} */
	const providerNames = useSelect( ( state ) => state.providerNames );
	const title = browser.i18n.getMessage( 'optionsAuthorizationsTitle' );
	const description = browser.i18n.getMessage( 'optionsAuthorizationsDescription' );

	return html`
		<${ Section }
			title=${ title }
			description=${ description }
		>
			<ul class="provider-authorizations">
				${ providerNames.map( ( providerName ) => html`
					<li key=${ providerName }>
						<${ ProviderAuthorization } providerName=${ providerName } />
					</li>
				` ) }
			</ul>
		<//>
	`;
}

export default ProviderAuthorizations;
