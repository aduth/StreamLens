import { size, reject, deburr, clamp } from 'lodash-es';
import { useContext, useState, useRef } from 'preact/hooks';
import { LoadingIndicator } from '@streamlens/components';
import { useSelect } from '@streamlens/state';
import Stream from './stream';
import Toolbar from './toolbar';
import NoStreamsLive from './no-streams-live';
import NoSearchResults from './no-search-results';
import { SearchContext } from './search-context';
import { SLStream } from '/background/store';

/**
 * Returns a term normnalized for search comparison. Normalization includes
 * diacritical marks and case, collapses whitespace, and removes common
 * punctuation.
 *
 * @param term Original term.
 *
 * @return Normalized term.
 */
function getNormalSearchTerm(term: string): string {
	return deburr(term)
		.toLocaleLowerCase()
		.replace(/\s+/, ' ')
		.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');
}

/**
 * Returns true if the haystack candidate term includes the given search needle,
 * or false otherwise. Performs a tolerant search, normalizing diacritical marks
 * and case, collapsing whitespace, and removing most punctuation.
 *
 * @param needle Search term.
 * @param haystack Candidate term.
 *
 * @return Whether candidate includes search term.
 */
export function isTolerantStringMatch(needle: string, haystack: string): boolean {
	return getNormalSearchTerm(haystack).includes(getNormalSearchTerm(needle));
}

/**
 * Returns true if the search term is a match for the given stream, or false
 * otherwise.
 *
 * @param search Search term.
 * @param stream Stream object to test.
 *
 * @return Whether stream is match for search term.
 */
function isSearchMatch(search: string, stream: SLStream): boolean {
	return (
		!search ||
		(stream.activity && isTolerantStringMatch(search, stream.activity)) ||
		isTolerantStringMatch(search, stream.login) ||
		isTolerantStringMatch(search, stream.title)
	);
}

/**
 * Returns a Stream List element.
 */
function StreamList() {
	const auth = useSelect((state) => state.auth);
	const streams = useSelect((state) => state.streams);
	const [search] = useContext(SearchContext);
	const [hoverIndex, setHoverIndex] = useState(null as number | null);
	const listRef = useRef(null as HTMLUListElement | null);

	const numberOfValidConnections = size(reject(auth, { token: null }));
	const hasFetched = size(streams.lastReceived) === numberOfValidConnections;
	if (hasFetched && streams.data.length === 0) {
		return <NoStreamsLive />;
	}

	const filteredStreams = streams.data.filter(isSearchMatch.bind(null, search));

	// Ensure that if stream state updates or search filtering reduces the
	// number of streams shown, the hover index is effectively constrained to
	// the maximum number of streams.
	const effectiveHoverIndex =
		hoverIndex === null || filteredStreams.length === 0
			? null
			: clamp(hoverIndex, filteredStreams.length - 1);

	/**
	 * Returns the link element for the stream at a given zero-based index, or
	 * null if it cannot be determined or does not exist. Ideally, this would
	 * not pierce the abstraction of the Stream component and would instead be
	 * implemented as agnostic to the focusable elements within a list.
	 *
	 * @param index Index
	 *
	 * @return Link element, if known.
	 */
	function getStreamLink(index: number): HTMLElement | null {
		return listRef.current ? listRef.current.querySelector(`li:nth-child(${index + 1}) a`) : null;
	}

	/**
	 * Interprets an intent to set hover index as a focus action if focus is
	 * already within the stream list. This allows tab focus behavior to proceed
	 * as expected after a hover index changes. If focus is not already within
	 * the list, the default hover index behavior is used instead.
	 *
	 * @param index Intended hover index.
	 */
	function setHoverIndexOrFocus(index: number) {
		const isFocusInList = listRef.current && listRef.current.contains(document.activeElement);
		if (isFocusInList) {
			const target = getStreamLink(index);
			if (target) {
				target.focus();
			}
		} else {
			setHoverIndex(index);
		}
	}

	/**
	 * Interpets a key down to increment the hover index if key pressed is an
	 * arrow key. This must occur in response to a `keydown` event, since
	 * `keypress` events do not emit for arrow keys.
	 *
	 * @param event Key event.
	 */
	function incrementHoverIndex(event: KeyboardEvent) {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			// Increment the hover index by an increment corresponding to the
			// key pressed. The hover index is clamped to be constrained to a
			// valid value based on the current number of filtered streams. The
			// effective hover index is used to assure that the change is most
			// accurate in respect to what is seen by the user.
			const increment = event.key === 'ArrowUp' ? -1 : 1;
			const nextHoverIndex =
				effectiveHoverIndex === null
					? 0
					: clamp(effectiveHoverIndex + increment, 0, filteredStreams.length - 1);

			setHoverIndexOrFocus(nextHoverIndex);

			event.preventDefault();
		}
	}

	/**
	 * Interpets a key press to select a stream if key pressed is an enter key.
	 * This must occur in response to a `keypress` event, since popups created
	 * during a `keydown` event would be blocked by Firefox popup blocker,
	 * presumably because they're not considered an allowable user interaction.
	 *
	 * @param event Key event.
	 */
	function selectStream(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();

			if (effectiveHoverIndex !== null) {
				const stream = filteredStreams[effectiveHoverIndex];
				if (stream) {
					window.open(stream.url);
					window.close();
				}
			}
		}
	}

	return (
		<div onKeyDown={incrementHoverIndex} onKeyPress={selectStream} className="stream-list">
			<Toolbar />
			{hasFetched && filteredStreams.length === 0 && <NoSearchResults />}
			<ul className="stream-list__list" ref={listRef}>
				{filteredStreams.map((stream, index) => (
					<li
						key={stream.url}
						className={['stream-list__item', index === effectiveHoverIndex && 'is-hovered']
							.filter(Boolean)
							.join(' ')}
						onFocusCapture={() => setHoverIndex(index)}
						onBlurCapture={() => setHoverIndex(null)}
						onMouseEnter={() => setHoverIndex(index)}
						onMouseLeave={() => setHoverIndex(null)}
					>
						<Stream {...stream} />
					</li>
				))}
			</ul>
			{!hasFetched && <LoadingIndicator />}
		</div>
	);
}

export default StreamList;
