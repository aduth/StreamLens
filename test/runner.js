/* eslint-disable no-console */

/**
 * External dependencies
 */
import glob from 'fast-glob';

/**
 * Internal dependencies
 */
import './setup.js';

( async () => {
	const suites = glob.stream( '+(background|common|options|popup)/**/test/*.js' );

	console.log( 'Running…\n' );

	const progress = [];

	for await ( const suite of suites ) {
		progress.push(
			import( '../' + suite )
				.then( () => console.log( '✅ ', suite ) )
				.catch( ( error ) => {
					console.error(
						'🚨 \x1b[31mError on test:',
						error.message,
						'\x1b[0m\n',
						'\nOperator:',
						error.operator,
						'\nExpected:',
						error.expected,
						'\nActual:',
						error.actual,
						'\n\n',
						error.stack,
						'\n\n'
					);

					process.exit( 1 );
				} )
		);
	}

	await Promise.all( progress );

	console.log( '\nAll tests run successfully!' );
} )();
