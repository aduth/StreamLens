import { useContext, useRef, useEffect } from 'preact/hooks';
import { IconButton, VisuallyHidden } from '@streamlens/components';
import { SearchContext } from './search-context';

/**
 * Returns a stream list toolbar.
 */
function Toolbar() {
	const inputRef = useRef(null as HTMLInputElement | null);
	const [search, setSearch] = useContext(SearchContext);

	// Auto-focus does not appear to work correctly for Firefox popup rendering.
	// This forces focus when the toolbar is mounted.
	useEffect(() => inputRef.current?.focus(), []);

	/**
	 * Opens the extension options panel and closes the popup.
	 */
	function openOptionsPage() {
		browser.runtime.openOptionsPage();
		window.close();
	}

	const searchLabel = browser.i18n.getMessage('popupToolbarSearchLabel');

	return (
		<nav className="toolbar">
			<label className="toolbar__search">
				<input
					ref={inputRef}
					type="text"
					placeholder={searchLabel}
					spellcheck={false}
					value={search}
					autocomplete="false"
					autofocus={true}
					onInput={(event) => setSearch(event.currentTarget.value)}
					className="toolbar__search-input"
				/>
				<VisuallyHidden>{searchLabel}</VisuallyHidden>
			</label>
			<div className="toolbar__controls">
				<IconButton
					label={browser.i18n.getMessage('popupToolbarSettings')}
					tooltipPosition="bottom-left"
					icon="cog"
					width="16"
					onClick={openOptionsPage}
				/>
			</div>
		</nav>
	);
}

export default Toolbar;
