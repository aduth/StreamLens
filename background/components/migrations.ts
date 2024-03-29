import { useEffect } from 'preact/hooks';

/**
 * Object used for matching on update, including implementation of migration.
 */
interface SLUpdateMigration {
	/**
	 * Version to match for migration.
	 */
	fromVersion: string;

	/**
	 * Migration function.
	 */
	migrate: () => void;
}

/**
 * Implemented migrations.
 */
const MIGRATIONS: SLUpdateMigration[] = [
	{
		fromVersion: '1.0.0',
		migrate() {
			let { initialState } = window.localStorage;
			if (!initialState) {
				return;
			}

			try {
				initialState = JSON.parse(initialState);
				browser.storage.sync.set({ initialState });
				delete window.localStorage.initialState;
			} catch (error) {}
		},
	},
];

function Migrations() {
	useEffect(() => {
		browser.runtime.onInstalled.addListener((details) => {
			const { reason, previousVersion } = details;
			if (reason !== 'update') {
				return;
			}

			const migrations = MIGRATIONS.filter(({ fromVersion }) => fromVersion === previousVersion);
			migrations.forEach(({ migrate }) => migrate());
		});
	}, []);

	return null;
}

export default Migrations;
