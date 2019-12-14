/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/**
 * Project dependencies
 */
import useSelect from '/common/hooks/use-select.js';
import useDispatch from '/common/hooks/use-dispatch.js';

/**
 * Internal dependencies
 */
import Section from './section.js';

/**
 * Returns a Provider Authorizations element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function ColorSchemeSetting() {
	const currentValue = useSelect( ( state ) => state.preferences.colorScheme );
	const dispatch = useDispatch();
	const title = browser.i18n.getMessage( 'optionsColorSchemeTitle' );
	const description = browser.i18n.getMessage( 'optionsColorSchemeDescription' );
	const options = [
		{
			label: browser.i18n.getMessage( 'optionsColorSchemeInherit' ),
			value: null,
		},
		{
			label: browser.i18n.getMessage( 'optionsColorSchemeLight' ),
			value: 'light',
		},
		{
			label: browser.i18n.getMessage( 'optionsColorSchemeDark' ),
			value: 'dark',
		},
	];

	return html`
		<${ Section } title=${ title } description=${ description }>
			<ul class="color-scheme-setting">
				${ options.map( ( { label, value } ) => html`
					<li key=${ value }>
						<label>
							<input
								type="radio"
								name="color-scheme-setting"
								checked=${ value === currentValue }
								onInput=${ () => dispatch( 'setPreferences', { colorScheme: value } ) }
							/>
							${ label }
						</label>
					</li>
				` ) }
			</ul>
		<//>
	`;
}

export default ColorSchemeSetting;
