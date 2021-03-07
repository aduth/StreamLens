/**
 * External dependencies
 */
import { h } from 'preact';

/**
 * Project dependencies
 */
import { useSelect, useDispatch } from '@streamlens/hooks';

/**
 * Internal dependencies
 */
import Section from './section.js';

/**
 * Returns a Provider Authorizations element.
 */
function ColorSchemeSetting() {
	const currentValue = useSelect((state) => state.preferences.colorScheme);
	const dispatch = useDispatch();
	const title = browser.i18n.getMessage('optionsColorSchemeTitle');
	const description = browser.i18n.getMessage('optionsColorSchemeDescription');
	const options = [
		{
			label: browser.i18n.getMessage('optionsColorSchemeInherit'),
			value: null,
		},
		{
			label: browser.i18n.getMessage('optionsColorSchemeLight'),
			value: 'light',
		},
		{
			label: browser.i18n.getMessage('optionsColorSchemeDark'),
			value: 'dark',
		},
	];

	return (
		<Section title={title} description={description}>
			<ul className="color-scheme-setting">
				{options.map(({ label, value }) => (
					<li key={value}>
						<label>
							<input
								type="radio"
								name="color-scheme-setting"
								checked={value === currentValue}
								onInput={() =>
									dispatch('setPreferences', {
										colorScheme: value,
									})
								}
							/>
							{label}
						</label>
					</li>
				))}
			</ul>
		</Section>
	);
}

export default ColorSchemeSetting;
