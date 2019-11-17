/**
 * External dependencies
 */
import { createContext } from '/web_modules/preact.js';

/** @typedef {import('/common/sync.js').SyncStore} SyncStore */

/**
 * @type {import('preact').Context<?SyncStore>}
 */
export const StoreContext = createContext( null );

export const StoreProvider = StoreContext.Provider;
