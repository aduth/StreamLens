import { Fragment, ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';
import { useSelect } from '@streamlens/state';

interface ColorSchemeProps {
	/**
	 * Contents of section
	 */
	children: ComponentChildren;
}

/**
 * Returns a wrapping element which assigns the color context as a data
 * attribute on its wrapping element.
 */
function ColorScheme({ children }: ColorSchemeProps) {
	const colorScheme = useSelect((state) => state.preferences.colorScheme);

	useEffect(() => {
		const normalColorScheme = colorScheme === null ? 'inherit' : colorScheme;
		document.body.dataset.theme = normalColorScheme;
	}, [colorScheme]);

	return <>{children}</>;
}

export default ColorScheme;
