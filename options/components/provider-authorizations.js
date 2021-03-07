/**
 * External dependencies
 */
import { h } from 'preact';

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
 * @return {import('preact').VNode} Rendered element.
 */
function ProviderAuthorizations() {
	const providerNames = useSelect( ( state ) => state.providerNames );
	const title = browser.i18n.getMessage( 'optionsAuthorizationsTitle' );
	const description = browser.i18n.getMessage( 'optionsAuthorizationsDescription' );

	return h(
		Section,
		{
			title,
			description,
		},
		h(
			'ul',
			{ className: 'provider-authorizations' },
			providerNames.map( ( providerName ) =>
				h( 'li', { key: providerName }, h( ProviderAuthorization, { providerName } ) )
			)
		)
	);
}

export default ProviderAuthorizations;
