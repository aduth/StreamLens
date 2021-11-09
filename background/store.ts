import { Store } from 'unistore';
import * as persistence from './persistence';

/**
 * Stream details object.
 */
export type SLStream = {
	/**
	 * Username of streamer.
	 */
	login: string;

	/**
	 * Unique stream URI.
	 */
	url: string;

	/**
	 * Platform provider on which stream is hosted.
	 */
	providerName: string;

	/**
	 * Current stream title.
	 */
	title: string;

	/**
	 * Avatar image URL.
	 */
	avatar?: string;

	/**
	 * Active viewers for stream, if live.
	 */
	viewers: number;

	/**
	 * Current game or activity, if live.
	 */
	activity?: string;
};

/**
 * Store stream state shape.
 */
export type SLStreamState = {
	/**
	 * User followed streams.
	 */
	data: SLStream[];

	/**
	 * Time of last received data, per provider name key.
	 */
	lastReceived: {
		[provider: string]: number;
	};
};

/**
 * Provider user details.
 */
export type SLProviderUser = {
	/**
	 * User login.
	 */
	login: string;

	/**
	 * User ID;
	 */
	id?: string | number;
};

/**
 * Provider authorization details.
 */
export type SLAuth = {
	/**
	 * Current authorization token, or null if the token has become invalid.
	 */
	token: string | null;

	/**
	 * Provider user details.
	 */
	user: SLProviderUser;
};

/**
 * Store auth state shape.
 */
export type SLAuthState = {
	[provider: string]: SLAuth;
};

/**
 * Store provider names state shape.
 */
export type SLProviderNamesState = string[];

/**
 * Store preferences state shape.
 */
export type SLPreferencesState = {
	/**
	 * Preferred color scheme.
	 */
	colorScheme: 'dark' | 'light' | null;
};

/**
 * Store state shape.
 */
export type SLState = {
	/**
	 * Stream state.
	 */
	streams: SLStreamState;

	/**
	 * Provider authorizations, keyed by platform name.
	 */
	auth: SLAuthState;

	/**
	 * Registered providers names.
	 */
	providerNames: SLProviderNamesState;

	/**
	 * User preferences.
	 */
	preferences: SLPreferencesState;
};

export type SLStore = Store<SLState>;

/**
 * Default store state.
 */
const DEFAULT_STATE: SLState = {
	providerNames: [],
	streams: {
		data: [],
		lastReceived: {},
	},
	auth: {},
	preferences: {
		colorScheme: null,
	},
};

/**
 * Returns a promise resolving with initial store state.
 */
export async function getInitialState(): Promise<SLState> {
	// Merge provided initial state (e.g. from persistence) with default.
	return {
		...DEFAULT_STATE,
		...(await persistence.get()),
	};
}
