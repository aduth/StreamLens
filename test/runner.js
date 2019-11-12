/* eslint-disable no-console */

/**
 * External dependencies
 */
import glob from 'glob';

( async () => {
	const suites = glob.sync( '+(background|common|options|popup)/**/test/*.js' );

	console.log( 'Running %d test suites...', suites.length );

	await Promise.all( suites.map( async ( test ) => {
		try {
			await import( '../' + test );
			console.log( '✅ ', test );
		} catch ( error ) {
			console.error( '🚨 \x1b[31m', error.message, '\n', error.stack, '\x1b[0m' );
			process.exit( 1 );
		}
	} ) );

	console.log( 'All tests run successfully!' );
} )();
