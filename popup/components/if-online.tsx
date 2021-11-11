import { h, Fragment, ComponentChildren } from 'preact';
import { useSelect } from '@streamlens/state';

interface IfOnlineProps {
	/**
	 * Component children.
	 */
	children: ComponentChildren;

	/**
	 * Whether to render only if authentications exist.
	 */
	hasConnection?: boolean;
}

/**
 * Component which renders its children only if the user has configured some authentications.
 */
function IfOnline({ hasConnection = true, children }: IfOnlineProps) {
	const isOnline = useSelect((state) => state.isOnline);

	return hasConnection === isOnline ? <>{children}</> : null;
}

IfOnline.Else = ({ children }: Omit<IfOnlineProps, 'hasConnection'>) => (
	<IfOnline hasConnection={false} children={children} />
);

export default IfOnline;
