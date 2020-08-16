/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';
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

/** @typedef {import('/common/components/tooltip').TooltipPosition} TooltipPosition */

/**
 * Returns a stream list toolbar.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {import('preact').VNode} Rendered element.
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

	return h(
		'nav',
		{ className: 'toolbar' },
		h(
			'label',
			{ className: 'toolbar__search' },
			h( 'input', {
				ref: /** @type {import('preact').Ref<any>} */ ( inputRef ),
				type: 'text',
				placeholder: searchLabel,
				spellcheck: false,
				value: search,
				autocomplete: 'false',
				autofocus: true,
				onInput: ( event ) => setSearch( event.currentTarget.value ),
				className: 'toolbar__search-input',
			} ),
			h( VisuallyHidden, null, searchLabel )
		),
		h(
			'div',
			{ className: 'toolbar__controls' },
			h( IconButton, {
				label: browser.i18n.getMessage( 'popupToolbarSettings' ),
				tooltipPosition: /** @type {TooltipPosition} */ ( 'bottom-left' ),
				icon: 'cog',
				width: '16',
				onClick: openOptionsPage,
			} )
		)
	);
}

export default Toolbar;
