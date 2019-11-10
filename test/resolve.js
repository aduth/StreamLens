/**
 * Returns the resolved file path for a given module specifier and parent file.
 * Overrides the default resolver behavior to allow for root path imports as
 * from the current working directory.
 *
 * @see https://nodejs.org/api/esm.html#esm_resolve_hook
 *
 * @param {string}   specifier       Imported module specifier.
 * @param {string}   parentModule    Parent file URL.
 * @param {Function} defaultResolver Default resolver implementation.
 *
 * @return {string} Resolved file path.
 */
export function resolve( specifier, parentModule, defaultResolver ) {
	// Resolve root path imports from current working directory.
	specifier = specifier.replace( /^\//, process.cwd() + '/' );

	return defaultResolver( specifier, parentModule );
}
