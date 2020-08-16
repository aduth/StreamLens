/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';

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
 * @return {import('preact').VNode} Rendered element.
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

	return h(
		Section,
		{
			title,
			description,
		},
		h(
			'ul',
			{ className: 'color-scheme-setting' },
			options.map( ( { label, value } ) =>
				h(
					'li',
					{ key: value },
					h(
						'label',
						null,
						h( 'input', {
							type: 'radio',
							name: 'color-scheme-setting',
							checked: value === currentValue,
							onInput: () =>
								dispatch( 'setPreferences', {
									colorScheme: value,
								} ),
						} ),
						label
					)
				)
			)
		)
	);
}

export default ColorSchemeSetting;
