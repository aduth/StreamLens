/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { size, reject } from '/web_modules/lodash-es.js';

/**
 * Project dependencies
 */
import LoadingIndicator from '/common/components/loading-indicator.js';
import useSelect from '/common/hooks/use-select.js';

/**
 * Internal dependencies
 */
import Stream from './stream.js';
import NoStreamsLive from './no-streams-live.js';

/**
 * Returns a Stream List element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {?import('preact').ComponentChild} Rendered element.
 */
function StreamList() {
	const auth = useSelect( ( state ) => state.auth );
	const streams = useSelect( ( state ) => state.streams );

	const numberOfConnections = size( auth );
	if ( numberOfConnections === 0 ) {
		return null;
	}

	const numberOfValidConnections = size( reject( auth, { token: null } ) );
	const hasFetched = size( streams.lastReceived ) === numberOfValidConnections;
	if ( hasFetched && streams.data.length === 0 ) {
		return html`<${ NoStreamsLive } />`;
	}

	return html`
		<ul class="stream-list">
			${ streams.data.map( ( stream ) => html`
				<li key=${ stream.url }>
					<${ Stream } ...${ stream } />
				</li>
			` ) }
		</ul>
		${ ! hasFetched && html`<${ LoadingIndicator } />` }
	`;
}

export default StreamList;
