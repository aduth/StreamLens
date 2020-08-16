import { nodeResolve } from '@rollup/plugin-node-resolve';
import { parse } from 'es-module-lexer';

const dependencies = [
	'lodash-es',
	'preact',
	'preact/hooks',
	'prsh',
	'unistore',
	'unistore-browser-sync',
	'webextension-polyfill',
];

const mapWebModules = {
	async renderChunk( code ) {
		const [ imports ] = await parse( code );

		for ( let i = imports.length - 1; i >= 0; i-- ) {
			const { s: start, e: end } = imports[ i ];
			const source = code.substring( start, end );
			if ( dependencies.includes( source ) ) {
				code = code.slice( 0, start ) + '/web_modules/' + source + '.js' + code.slice( end );
			}
		}

		return code;
	},
};

export default /** @type {import('rollup').RollupOptions[]} */ ( dependencies.map(
	( dependency ) => ( {
		input: dependency,
		context: 'window',
		output: {
			file: `web_modules/${ dependency }.js`,
			format: 'esm',
		},
		external: dependencies,
		plugins: [ nodeResolve(), mapWebModules ],
	} )
) );
