import { nodeResolve } from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { parse } from 'es-module-lexer';
import MagicString from 'magic-string';

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
		let magicString;

		for ( let i = imports.length - 1; i >= 0; i-- ) {
			const { s: start, e: end } = imports[ i ];
			const source = code.substring( start, end );
			if ( dependencies.includes( source ) ) {
				if ( ! magicString ) {
					magicString = new MagicString( code );
				}

				magicString.overwrite( start, end, '/web_modules/' + source + '.js' );
			}
		}

		if ( ! magicString ) {
			return null;
		}

		return {
			code: magicString.toString(),
			map: magicString.generateMap( { hires: true } ),
		};
	},
};

export default /** @type {import('rollup').RollupOptions[]} */ ( dependencies.map(
	( dependency ) => ( {
		input: dependency,
		context: 'window',
		output: {
			sourcemap: 'inline',
			file: `web_modules/${ dependency }.js`,
			format: 'esm',
		},
		external: dependencies,
		plugins: [ nodeResolve(), mapWebModules, sourcemaps() ],
	} )
) );
