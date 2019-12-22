/**
 * Migrate localStorage-based persistence to browser sync storage.
 *
 * @type {import('../migrations').SLUpdateMigration}
 */
export default function migrate() {
	let { initialState } = window.localStorage;
	if ( ! initialState ) {
		return;
	}

	try {
		initialState = JSON.parse( initialState );
		browser.storage.sync.set( { initialState } );
		delete window.localStorage.initialState;
	} catch ( error ) {}
}
