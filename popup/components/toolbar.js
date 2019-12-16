/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';
import { useContext, useRef, useEffect } from '/web_modules/preact/hooks.js';

/**
 * Project dependencies
 */
import IconButton from '/common/components/icon-button.js';
import VisuallyHidden from '/common/components/visually-hidden.js';

/**
 * Internal dependencies
 */
import { SearchContext } from './search-context.js';

/**
 * Returns a stream list toolbar.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function Toolbar() {
	/** @type {import('preact/hooks').PropRef<HTMLInputElement>} */
	const inputRef = useRef();
	const [ search, setSearch ] = useContext( SearchContext );

	// Auto-focus does not appear to work correctly for Firefox popup rendering.
	// This forces focus when the toolbar is mounted.
	useEffect( () => {
		if ( inputRef.current ) {
			inputRef.current.focus();
		}
	}, [] );

	/**
	 * Opens the extension options panel and closes the popup.
	 */
	function openOptionsPage() {
		browser.runtime.openOptionsPage();
		window.close();
	}

	const searchLabel = browser.i18n.getMessage( 'popupToolbarSearchLabel' );

	return html`
		<nav class="toolbar">
			<label class="toolbar__search">
				<input
					ref=${ inputRef }
					type="text"
					placeholder=${ searchLabel }
					spellcheck=${ false }
					value=${ search }
					autocomplete="false"
					autofocus
					onInput=${ ( event ) => setSearch( event.currentTarget.value ) }
					class="toolbar__search-input"
				/>
				<${ VisuallyHidden }>${ searchLabel }<//>
			</label>
			<div class="toolbar__controls">
				<${ IconButton }
					label="Settings"
					tooltipPosition="bottom-left"
					icon="cog"
					width=${ 16 }
					onClick=${ openOptionsPage }
				/>
			</div>
		</nav>
	`;
}

export default Toolbar;
