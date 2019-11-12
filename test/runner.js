/* eslint-disable no-console */

/**
 * External dependencies
 */
import glob from 'fast-glob';

( async () => {
	const suites = glob.stream( '+(background|common|options|popup)/**/test/*.js' );

	console.log( 'Running…\n' );

	const progress = [];

	for await ( const suite of suites ) {
		progress.push(
			import( '../' + suite )
				.then( () => console.log( '✅ ', suite ) )
				.catch( ( error ) => {
					console.error( '🚨 \x1b[31m', error.message, '\n', error.stack, '\x1b[0m' );
					process.exit( 1 );
				} ),
		);
	}

	await Promise.all( progress );

	console.log( '\nAll tests run successfully!' );
} )();
