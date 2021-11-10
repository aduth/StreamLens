import { SLProviderUser, SLStream, SLAuth } from '../store';
import twitch from './twitch';

type SLProviderGetUser = (token: string) => SLProviderUser | Promise<SLProviderUser>;

type SLProviderGetStreams = (auth: SLAuth) => Promise<SLStream[]>;

/**
 * Error thrown when provider authentication becomes invalid.
 */
export class InvalidTokenError extends Error {}

/**
 * Provider implementation.
 */
export interface SLProvider {
	/**
	 * Unique provider slug.
	 */
	name: string;

	/**
	 * OAuth endpoint from which to retrieve bearer token.
	 */
	authEndpoint: string;

	/**
	 * Whether the provider supports OpenID Connect.
	 */
	supportsOIDC: boolean;

	/**
	 * Given an OAuth bearer token, returns user details.
	 */
	getUser: SLProviderGetUser;

	/**
	 * Fetches and return latest stream data.
	 */
	getStreams: SLProviderGetStreams;
}

/**
 * Provider implementations.
 */
export const providers: Record<string, SLProvider> = { twitch };
