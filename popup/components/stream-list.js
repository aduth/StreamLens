/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { size, reject, deburr } from '/web_modules/lodash-es.js';
import { useContext } from '/web_modules/preact/hooks.js';

/**
 * Project dependencies
 */
import LoadingIndicator from '/common/components/loading-indicator.js';
import useSelect from '/common/hooks/use-select.js';

/**
 * Internal dependencies
 */
import Stream from './stream.js';
import Toolbar from './toolbar.js';
import NoStreamsLive from './no-streams-live.js';
import NoSearchResults from './no-search-results.js';
import { SearchContext } from './search-context.js';

/** @typedef {import('/background/store').SLStream} SLStream */

/**
 * Returns a term normnalized for search comparison. Normalization includes
 * diacritical marks and case, collapses whitespace, and removes common
 * punctuation.
 *
 * @param {string} term Original term.
 *
 * @return {string} Normalized term.
 */
function getNormalSearchTerm( term ) {
	return deburr( term )
		.toLocaleLowerCase()
		.replace( /\s+/, ' ' )
		.replace( /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '' );
}

/**
 * Returns true if the haystack candidate term includes the given search needle,
 * or false otherwise. Performs a tolerant search, normalizing diacritical marks
 * and case, collapsing whitespace, and removing most punctuation.
 *
 * @param {string} needle   Search term.
 * @param {string} haystack Candidate term.
 *
 * @return {boolean} Whether candidate includes search term.
 */
export function isTolerantStringMatch( needle, haystack ) {
	return getNormalSearchTerm( haystack ).includes( getNormalSearchTerm( needle ) );
}

/**
 * Returns true if the search term is a match for the given stream, or false
 * otherwise.
 *
 * @param {string}   search Search term.
 * @param {SLStream} stream Stream object to test.
 *
 * @return {boolean} Whether stream is match for search term.
 */
function isSearchMatch( search, stream ) {
	return (
		! search ||
		( stream.activity && isTolerantStringMatch( search, stream.activity ) ) ||
		isTolerantStringMatch( search, stream.login ) ||
		isTolerantStringMatch( search, stream.title )
	);
}

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
	const [ search ] = useContext( SearchContext );

	const numberOfConnections = size( auth );
	if ( numberOfConnections === 0 ) {
		return null;
	}

	const numberOfValidConnections = size( reject( auth, { token: null } ) );
	const hasFetched = size( streams.lastReceived ) === numberOfValidConnections;
	if ( hasFetched && streams.data.length === 0 ) {
		return html`<${ NoStreamsLive } />`;
	}

	const filteredStreams = streams.data.filter( isSearchMatch.bind( null, search ) );
	if ( hasFetched && filteredStreams.length === 0 ) {
		return html`<${ NoSearchResults } />`;
	}

	return html`
		<${ Toolbar } />
		<ul class="stream-list">
			${ filteredStreams.map( ( stream ) => html`
				<li key=${ stream.url }>
					<${ Stream } ...${ stream } />
				</li>
			` ) }
		</ul>
		${ ! hasFetched && html`<${ LoadingIndicator } />` }
	`;
}

export default StreamList;
