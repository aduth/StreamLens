/**
 * External dependencies
 */
import glob from 'glob';

( async () => {
	const suites = glob.sync( '+(background|common|options|popup)/**/test/*.js' );

	// eslint-disable-next-line no-console
	console.log( 'Running %d test suites...', suites.length );

	await Promise.all( suites.map( ( test ) => import( '../' + test ) ) );

	// eslint-disable-next-line no-console
	console.log( 'All tests run successfully!' );
} )();
