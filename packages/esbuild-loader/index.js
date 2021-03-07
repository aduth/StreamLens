// @ts-ignore
import esbuild from 'esbuild';
const { transform } = /** @type {import('esbuild')} */ (esbuild);

const TRANSFORMED_EXTENSIONS = /\.([jt]sx?)$/;
const IGNORED_PATH = /node_modules/;

const isTransformed = (url) => TRANSFORMED_EXTENSIONS.test(url) && !IGNORED_PATH.test(url);

/**
 * @param {string} specifier
 * @param {{conditions: string[], parentURL?: string}} context
 * @param {function} defaultResolve
 * @returns {Promise<{url: string}>}
 */
export function resolve(specifier, context, defaultResolve) {
	return isTransformed(specifier)
		? Promise.resolve({ url: new URL(specifier, context.parentURL).href })
		: defaultResolve(specifier, context, defaultResolve);
}

/**
 * @param {string} url
 * @param {{}} context
 * @param {function} defaultGetFormat
 * @returns {Promise<{format: string}>}
 */
export function getFormat(url, context, defaultGetFormat) {
	return isTransformed(url)
		? Promise.resolve({ format: 'module' })
		: defaultGetFormat(url, context, defaultGetFormat);
}

/**
 * @param {string|SharedArrayBuffer|Uint8Array} source
 * @param {{format: string, url: string}} context
 * @param {function} defaultTransformSource
 * @returns {Promise<{source:string|SharedArrayBuffer|Uint8Array}>}
 */
export async function transformSource(source, context, defaultTransformSource) {
	const { url } = context;

	if (!IGNORED_PATH.test(url)) {
		const match = url.match(TRANSFORMED_EXTENSIONS);
		if (match) {
			const loader = /** @type {'js'|'jsx'|'ts'|'tsx'} */ (match[1]);
			const { code } = await transform(source.toString(), { loader });
			return { source: code };
		}
	}

	return defaultTransformSource(source, context, defaultTransformSource);
}
