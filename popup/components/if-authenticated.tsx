import { Fragment, ComponentChildren } from 'preact';
import { isEmpty } from 'lodash-es';
import { useSelect } from '@streamlens/state';

interface IfAuthenticatedProps {
	/**
	 * Component children.
	 */
	children: ComponentChildren;

	/**
	 * Whether to render only if authentications exist.
	 */
	hasAuth?: boolean;
}

/**
 * Component which renders its children only if the user has configured some authentications.
 */
function IfAuthenticated({ hasAuth = true, children }: IfAuthenticatedProps) {
	const auth = useSelect((state) => state.auth);
	const hasConfiguredAuths = !isEmpty(auth);

	return hasConfiguredAuths === hasAuth ? <>{children}</> : null;
}

IfAuthenticated.Else = ({ children }: Omit<IfAuthenticatedProps, 'hasAuth'>) => (
	<IfAuthenticated hasAuth={false} children={children} />
);

export default IfAuthenticated;
