/**
 * External dependencies
 */
import { find, chunk } from '/web_modules/lodash-es.js';

/**
 * Project dependencies
 */
import { applications } from '/config.js';

/**
 * Internal dependencies
 */
import { InvalidTokenError } from '../providers.js';

/** @typedef {import('../store').SLStream} SLStream */

/**
 * Twitch token details, from validation endpoint.
 *
 * @typedef TwitchTokenDetails
 *
 * @property {string}   client_id Application client ID.
 * @property {string}   login     Authorized user login.
 * @property {string[]} scopes    Requested scopes.
 * @property {string}   user_id   Authorized user ID.
 */

/**
 * Twitch `/follows` API entity.
 *
 * @typedef TwitchFollow
 *
 * @property {string} from_id     ID of the user following the `to_id` user.
 * @property {string} from_name   Display name corresponding to `from_id`.
 * @property {string} to_id       ID of the user being followed by the `from_id`
 *                                user.
 * @property {string} to_name     Display name corresponding to `to_id`.
 * @property {string} followed_at Date and time when the from_id user followed
 *                                the to_id user.
 */

/**
 * Twitch `/games` API entity.
 *
 * @typedef TwitchGame
 *
 * @property {string} box_art_url Template URL for the game’s box art.
 * @property {string} id          Game ID.
 * @property {string} name        Game name.
 */

/**
 * Twitch `/users` API entity.
 *
 * @typedef TwitchUser
 *
 * @property {string} broadcaster_type  User’s broadcaster type: "partner",
 *                                      "affiliate", or "".
 * @property {string} description       User’s channel description.
 * @property {string} display_name      User’s display name.
 * @property {string} email             User’s email address. Returned if the
 *                                      request includes the `user:read:email`
 *                                      scope.
 * @property {string} id                User’s ID.
 * @property {string} login             User’s login name.
 * @property {string} offline_image_url URL of the user’s offline image.
 * @property {string} profile_image_url URL of the user’s profile image.
 * @property {string} type              User’s type: "staff", "admin",
 *                                      "global_mod", or "".
 * @property {number} view_count        Total number of views of the user’s
 *                                      channel.
 */

/**
 * Twitch `/streams` API entity.
 *
 * @typedef TwitchStream
 *
 * @property {string} game_id       ID of the game being played on the stream.
 * @property {string} id            Stream ID.
 * @property {string} language      Stream language.
 * @property {string} started_at    UTC timestamp.
 * @property {string} tag_ids       Shows tag IDs that apply to the stream.
 * @property {string} thumbnail_url Thumbnail URL of the stream. All image URLs
 *                                  have variable width and height. You can
 *                                  replace {width} and {height} with any values
 *                                  to get that size image.
 * @property {string} title         Stream title.
 * @property {string} type          Stream type: "live" or "" (in case of
 *                                  error).
 * @property {string} user_id       ID of the user who is streaming.
 * @property {string} user_name     Display name corresponding to user_id.
 * @property {number} viewer_count  Number of viewers watching the stream at the
 *                                  time of the query.
 */

/**
 * Twitch API pagination cursor.
 *
 * @typedef {string|void} TwitchAPIPaginationCursor
 */

/**
 * Twitch API response pagination details.
 *
 * @typedef TwitchAPIPagination
 *
 * @property {TwitchAPIPaginationCursor} [cursor] Pagination cursor ID, if a
 *                                                next page exists.
 */

/**
 * Twitch API response payload.
 *
 * @typedef TwitchAPIResponse
 *
 * @property {T} data Response data.
 *
 * @template T
 */

/**
 * Twitch API paginated response payload.
 *
 * @typedef TwitchAPIPaginatedResponse
 *
 * @property {T}                   data       Response data.
 * @property {TwitchAPIPagination} pagination Pagination data.
 * @property {number}              total      Total number of results.
 *
 * @template T
 */

/**
 * Twitch base API URL.
 *
 * @type {string}
 */
const API_BASE = 'https://api.twitch.tv/helix';

/**
 * Provider name.
 *
 * @type {string}
 */
const name = 'twitch';

/**
 * Maximum number of entities to request per API page.
 *
 * @type {number}
 */
const MAX_PER_PAGE = 100;

export default /** @type {import('../providers').SLProvider} */ ( {
	name,

	label: 'Twitch',

	supportsOIDC: true,

	authEndpoint: 'https://id.twitch.tv/oauth2/authorize',

	async getUser( token ) {
		const response = await window.fetch( 'https://id.twitch.tv/oauth2/validate', {
			headers: {
				Authorization: 'OAuth ' + token,
			},
		} );

		if ( response.status !== 200 ) {
			throw new InvalidTokenError();
		}

		/** @type {TwitchTokenDetails} */
		const json = await response.json();

		return {
			login: json.login,
			id: json.user_id,
		};
	},

	async getStreams( auth ) {
		/**
		 * Performs a fetch assuming to return JSON, including client ID and
		 * current authorization token in the request.
		 *
		 * @throws {InvalidTokenError}
		 * @throws {Error}
		 *
		 * @param {string} url URL of resource to fetch.
		 *
		 * @return {Promise<*>} Response JSON.
		 */
		async function fetchJSONWithClientId( url ) {
			const response = await window.fetch( url, {
				headers: {
					'Content-Type': 'application/json',
					'Client-Id': applications.twitch.clientId,
					Authorization: 'Bearer ' + auth.token,
				},
			} );

			if ( response.status === 400 ) {
				throw new InvalidTokenError();
			} else {
				return response.json();
			}
		}

		/**
		 * Fetches Twitch user follows, returning a promise resolving to a
		 * formatted array of followed stream user IDs.
		 *
		 * @param {number|string} userId User ID.
		 *
		 * @return {Promise<string[]>} User followed IDs.
		 */
		async function fetchFollows( userId ) {
			const url = new URL( `${ API_BASE }/users/follows` );
			url.searchParams.set( 'first', MAX_PER_PAGE.toString() );
			url.searchParams.set( 'from_id', userId.toString() );

			const results = [];

			/** @type {TwitchAPIPaginationCursor} */
			let cursor;
			do {
				if ( cursor ) {
					url.searchParams.set( 'after', cursor );
				}

				/** @type {TwitchAPIPaginatedResponse<TwitchFollow[]>} */
				const json = await fetchJSONWithClientId( url.toString() );

				results.push( ...json.data.map( ( follow ) => follow.to_id ) );

				// Even if response includes all results, a pagination cursor will
				// be assigned. Abort early if safe to assume results complete.
				if ( json.data.length === json.total ) {
					break;
				}

				cursor = json.pagination.cursor;
			} while ( cursor );

			return results;
		}

		/**
		 * Fetches streams from an array of stream user IDs, returning a promise
		 * resolving to an array of stream objects.
		 *
		 * @param {string[]} userIds User IDs of streams to fetch.
		 *
		 * @return {Promise<SLStream[]>} Promise resolving to array of stream
		 *                               objects.
		 */
		async function fetchStreams( userIds ) {
			const pages = chunk( userIds, MAX_PER_PAGE );

			return ( await Promise.all( pages.map( async ( page ) => {
				const streamsURL = new URL( API_BASE + '/streams' );
				streamsURL.searchParams.set( 'first', MAX_PER_PAGE.toString() );

				const usersURL = new URL( API_BASE + '/users' );
				usersURL.searchParams.set( 'first', MAX_PER_PAGE.toString() );

				page.forEach( ( userId ) => {
					streamsURL.searchParams.append( 'user_id', userId );
					usersURL.searchParams.append( 'id', userId );
				} );

				/** @type {TwitchAPIPaginatedResponse<TwitchStream[]>} */
				const streams = await fetchJSONWithClientId( streamsURL.toString() );
				if ( ! streams.data.length ) {
					return [];
				}

				const gamesURL = new URL( API_BASE + '/games' );
				gamesURL.searchParams.set( 'first', MAX_PER_PAGE.toString() );
				streams.data.forEach( ( stream ) => {
					gamesURL.searchParams.append( 'id', stream.game_id );
				} );

				/** @type {[TwitchAPIResponse<TwitchGame[]>,TwitchAPIPaginatedResponse<TwitchUser[]>]} */
				const [ games, users ] = await Promise.all( [
					fetchJSONWithClientId( gamesURL.toString() ),
					fetchJSONWithClientId( usersURL.toString() ),
				] );

				return streams.data.map( ( stream ) => ( {
					providerName: name,
					login: stream.user_name,
					url: 'https://twitch.tv/' + stream.user_name,
					viewers: stream.viewer_count,
					title: stream.title,
					avatar: ( find( users.data, { id: stream.user_id } ) || {} ).profile_image_url,
					activity: ( find( games.data, { id: stream.game_id } ) || {} ).name,
				} ) );
			} ) ) ).flat();
		}

		const follows = await fetchFollows( auth.user.id );
		return fetchStreams( follows );
	},
} );
