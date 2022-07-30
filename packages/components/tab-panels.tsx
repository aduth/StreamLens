import { cloneElement, ComponentProps, VNode } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { useDidUpdateEffect, useId } from '@streamlens/hooks';
import type { JSX } from 'preact';
import TabPanel from './tab-panel';

interface TabPanelsProps {
	/**
	 * Accessible label describing purpose of tabs.
	 */
	label: string;

	/**
	 * Tabs content.
	 */
	children: VNode<ComponentProps<typeof TabPanel>>[];
}

function TabPanels({ label, children }: TabPanelsProps) {
	const activeButtonRef = useRef(null as HTMLButtonElement | null);
	const [activeIndex, setActiveIndex] = useState(0);
	const id = useId('tab-panels');
	useDidUpdateEffect(() => activeButtonRef.current?.focus(), [activeIndex]);

	function onTabButtonKeyDown(event: JSX.TargetedKeyboardEvent<HTMLButtonElement>) {
		let nextActiveIndex;

		switch (event.key) {
			case 'ArrowLeft':
				nextActiveIndex = activeIndex - 1;
				break;

			case 'ArrowRight':
				nextActiveIndex = activeIndex + 1;
				break;

			case 'Home':
				nextActiveIndex = 0;
				break;

			case 'End':
				nextActiveIndex = children.length - 1;
				break;
		}

		if (nextActiveIndex >= 0 && nextActiveIndex < children.length) {
			setActiveIndex(nextActiveIndex);
		}
	}

	return (
		<div className="tab-panels">
			<div role="tablist" aria-label={label} className="tab-panels__tabs-list">
				{children.map((tab, index) => (
					<button
						key={index}
						ref={index === activeIndex ? activeButtonRef : undefined}
						id={`${id}-tab-button-${index}`}
						type="button"
						role="tab"
						aria-selected={index === activeIndex}
						aria-controls={`${id}-tab-${index}`}
						tabIndex={index === activeIndex ? undefined : -1}
						onClick={() => setActiveIndex(index)}
						onKeyDown={onTabButtonKeyDown}
						className="tab-panels__tab-button"
					>
						{tab.props.name}
					</button>
				))}
			</div>
			{children.map((tab, index) =>
				cloneElement(tab, {
					key: index,
					id: `${id}-tab-${index}`,
					labelId: `${id}-tab-button-${index}`,
					isActive: activeIndex === index,
				})
			)}
		</div>
	);
}

export default TabPanels;
