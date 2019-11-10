/**
 * Object used for matching on update, including implementation of migration.
 *
 * @typedef SLUpdateMigration
 *
 * @property {string}     fromVersion Version to match for migration.
 * @property {() => void} migrate     Migration function.
 */

/**
 * Implemented migrations.
 *
 * @type {SLUpdateMigration[]}
 */
const MIGRATIONS = [
	{
		fromVersion: '1.0.0',
		migrate() {
			let { initialState } = window.localStorage;
			if ( ! initialState ) {
				return;
			}

			try {
				initialState = JSON.parse( initialState );
				browser.storage.sync.set( { initialState } );
				delete window.localStorage.initialState;
			} catch ( error ) {}
		},
	},
];

/**
 * Assigns listener to handle `runtime.onInstalled` event, running migration
 * logic for version updates.
 */
export function initialize() {
	browser.runtime.onInstalled.addListener( ( details ) => {
		const { reason, previousVersion } = details;
		if ( reason !== 'update' ) {
			return;
		}

		MIGRATIONS
			.filter( ( { fromVersion } ) => fromVersion === previousVersion )
			.forEach( ( { migrate } ) => migrate() );
	} );
}
