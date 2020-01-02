/**
 * Migration implementation.
 *
 * @typedef {()=>void} SLUpdateMigration
 */

/**
 * Implemented migrations.
 *
 * @type {string[]}
 */
const MIGRATIONS = [
	'1.1.0',
];

/**
 * Returns true if the candidate satisfies the given version, or false
 * otherwise. A candidate satisfies a version if it occurs after the version.
 *
 * @param {string} version   Version against which to compare.
 * @param {string} candidate Migration version.
 *
 * @return {boolean} Whether candidate satisfies the given version.
 */
export function isVersionSatisfied( version, candidate ) {
	const partsA = version.split( '.' );
	const partsB = candidate.split( '.' );

	for ( let i = 0; i < 3; i++ ) {
		if ( Number( partsB[ i ] ) < Number( partsA[ i ] ) ) {
			return false;
		}
	}

	return version !== candidate;
}

/**
 * Assigns listener to handle `runtime.onInstalled` event, running migration
 * logic for version updates.
 */
export function initialize() {
	browser.runtime.onInstalled.addListener( async ( details ) => {
		const { reason, previousVersion } = details;
		if ( reason !== 'update' || ! previousVersion ) {
			return;
		}

		for ( let i = 0; i < MIGRATIONS.length; i++ ) {
			const version = MIGRATIONS[ i ];
			if ( isVersionSatisfied( previousVersion, version ) ) {
				/** @type {{default:SLUpdateMigration}} */
				const { default: migrate } = await import( `./migrations/${ version }.js` );
				migrate();
			}
		}
	} );
}
