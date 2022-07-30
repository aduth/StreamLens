import { ComponentChildren, VNode } from 'preact';

interface TabPanelProps {
	/**
	 * Tab label.
	 */
	name: VNode | string;

	/**
	 * Unique identifier for tab.
	 */
	id?: string;

	/**
	 * Unique identifier for tab label.
	 */
	labelId?: string;

	/**
	 * Whether the tab is active.
	 */
	isActive?: boolean;

	/**
	 * Tab contents.
	 */
	children: ComponentChildren;
}

function TabPanel({ id, labelId, isActive, children }: TabPanelProps): VNode {
	const classes = ['tab-panel', isActive && 'tab-panel--active'].filter(Boolean).join(' ');

	return (
		<div id={id} tabIndex={0} role="tabpanel" aria-labelledby={labelId} className={classes}>
			{children}
		</div>
	);
}

export default TabPanel;
