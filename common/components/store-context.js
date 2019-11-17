/**
 * External dependencies
 */
import { createContext } from '/web_modules/preact.js';

export const StoreContext = createContext( null );

export const StoreProvider = StoreContext.Provider;
