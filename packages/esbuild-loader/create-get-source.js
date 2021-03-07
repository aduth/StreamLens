// @ts-ignore
import esbuild from 'esbuild';
const { transform } = /** @type {import('esbuild')} */ (esbuild);

/**
 * @param {import('esbuild').TransformOptions=} options
 */
export default function createGetSource(options) {
	/**
	 * @param {string} url
	 * @param {{format: string}} context
	 * @param {typeof getSource} defaultGetSource
	 *
	 * @return {Promise<{source: string|SharedArrayBuffer|Uint8Array)}>}
	 */
	return async function getSource(url, context, defaultGetSource) {
		const { source } = await defaultGetSource(url, context, defaultGetSource);

		if (url.endsWith('.js')) {
			const transformed = await transform(source, options);
			return { source: transformed.code };
		}

		return { source };
	};
}
