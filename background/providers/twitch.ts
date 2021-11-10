/* eslint-disable camelcase */

import { find, chunk } from 'lodash-es';
import { applications } from '../../config';
import { InvalidTokenError, SLProvider } from './';
import { SLStream } from '../store';

/**
 * Twitch token details, from validation endpoint.
 */
interface TwitchTokenDetails {
	/**
	 * Application client ID.
	 */
	client_id: string;

	/**
	 * Authorized user login.
	 */
	login: string;

	/**
	 * Requested scopes.
	 */
	scopes: string[];

	/**
	 * Authorized user ID.
	 */
	user_id: string;
}

/**
 * Twitch `/follows` API entity.
 */
interface TwitchFollow {
	/**
	 * ID of the user following the `to_id` user.
	 */
	from_id: string;

	/**
	 * Display name corresponding to `from_id`.
	 */
	from_name: string;

	/**
	 * ID of the user being followed by the `from_id` user.
	 */
	to_id: string;

	/**
	 * Display name corresponding to `to_id`.
	 */
	to_name: string;

	/**
	 * Date and time when the from_id user followed the to_id user.
	 */
	followed_at: string;
}

/**
 * Twitch `/games` API entity.
 */
interface TwitchGame {
	/**
	 * Template URL for the game’s box art.
	 */
	box_art_url: string;

	/**
	 * Game ID.
	 */
	id: string;

	/**
	 * Game name.
	 */
	name: string;
}

/**
 * Twitch `/users` API entity.
 */
interface TwitchUser {
	/**
	 * User’s broadcaster type: "partner", "affiliate", or "".
	 */
	broadcaster_type: string;

	/**
	 * User’s channel description.
	 */
	description: string;

	/**
	 * User’s display name.
	 */
	display_name: string;

	/**
	 * User’s email address. Returned if the request includes the `user:read:email` scope.
	 */
	email: string;

	/**
	 * User’s ID.
	 */
	id: string;

	/**
	 * User’s login name.
	 */
	login: string;

	/**
	 * URL of the user’s offline image.
	 */
	offline_image_url: string;

	/**
	 * URL of the user’s profile image.
	 */
	profile_image_url: string;

	/**
	 * User’s type: "staff", "admin", "global_mod", or "".
	 */
	type: string;

	/**
	 * Total number of views of the user’s channel.
	 */
	view_count: number;
}

/**
 * Twitch `/streams` API entity.
 */
interface TwitchStream {
	/**
	 * ID of the game being played on the stream.
	 */
	game_id: string;

	/**
	 * Stream ID.
	 */
	id: string;

	/**
	 * Stream language.
	 */
	language: string;

	/**
	 * UTC timestamp.
	 */
	started_at: string;

	/**
	 * Shows tag IDs that apply to the stream.
	 */
	tag_ids: string;

	/**
	 * Thumbnail URL of the stream. All image URLs have variable width and height. You can replace {width} and {height} with any values to get that size image.
	 */
	thumbnail_url: string;

	/**
	 * Stream title.
	 */
	title: string;

	/**
	 * Stream type: "live" or "" (in case of error).
	 */
	type: string;

	/**
	 * ID of the user who is streaming.
	 */
	user_id: string;

	/**
	 * Display name corresponding to user_id.
	 */
	user_name: string;

	/**
	 * Number of viewers watching the stream at the time of the query.
	 */
	viewer_count: number;
}

/**
 * Twitch API pagination cursor.
 */
type TwitchAPIPaginationCursor = string | undefined;

/**
 * Twitch API response pagination details.
 */
interface TwitchAPIPagination {
	/**
	 * Pagination cursor ID, if a next page exists.
	 */
	cursor?: TwitchAPIPaginationCursor;
}

/**
 * Twitch API response payload.
 */
interface TwitchAPIResponse<T> {
	/**
	 * Response data.
	 */
	data: T;
}

/**
 * Twitch API paginated response payload.
 */
interface TwitchAPIPaginatedResponse<T> extends TwitchAPIResponse<T> {
	/**
	 * Pagination data.
	 */
	pagination: TwitchAPIPagination;

	/**
	 * Total number of results.
	 */
	total: number;
}

/**
 * Twitch base API URL.
 */
const API_BASE = 'https://api.twitch.tv/helix';

/**
 * Provider name.
 */
const name = 'twitch';

/**
 * Maximum number of entities to request per API page.
 */
const MAX_PER_PAGE = 100;

export default {
	name,

	authEndpoint: 'https://id.twitch.tv/oauth2/authorize',

	async getUser(token) {
		const response = await window.fetch('https://id.twitch.tv/oauth2/validate', {
			headers: {
				Authorization: 'OAuth ' + token,
			},
		});

		if (response.status !== 200) {
			throw new InvalidTokenError();
		}

		const json: TwitchTokenDetails = await response.json();

		return {
			login: json.login,
			id: json.user_id,
		};
	},

	async getStreams(auth) {
		/**
		 * Performs a fetch assuming to return JSON, including client ID and
		 * current authorization token in the request.
		 *
		 * @param url URL of resource to fetch.
		 *
		 * @return Promise resolving to response JSON.
		 */
		async function fetchJSONWithClientId(url: string): Promise<any> {
			const response = await window.fetch(url, {
				headers: {
					'Content-Type': 'application/json',
					'Client-Id': applications.twitch.clientId,
					Authorization: 'Bearer ' + auth.token,
				},
			});

			if (response.status === 401) {
				throw new InvalidTokenError();
			} else {
				return response.json();
			}
		}

		/**
		 * Fetches Twitch user follows, returning a promise resolving to a
		 * formatted array of followed stream user IDs.
		 *
		 * @param userId User ID.
		 *
		 * @return Promise resolving to user followed IDs.
		 */
		async function fetchFollows(userId: number | string): Promise<string[]> {
			const url = new URL(`${API_BASE}/users/follows`);
			url.searchParams.set('first', MAX_PER_PAGE.toString());
			url.searchParams.set('from_id', userId.toString());

			const results: string[] = [];

			let cursor: TwitchAPIPaginationCursor;
			do {
				if (cursor) {
					url.searchParams.set('after', cursor);
				}

				const json: TwitchAPIPaginatedResponse<TwitchFollow[]> = await fetchJSONWithClientId(
					url.toString()
				);

				results.push(...json.data.map((follow) => follow.to_id));

				// Even if response includes all results, a pagination cursor will
				// be assigned. Abort early if safe to assume results complete.
				if (json.data.length === json.total) {
					break;
				}

				cursor = json.pagination.cursor;
			} while (cursor);

			return results;
		}

		/**
		 * Fetches streams from an array of stream user IDs, returning a promise
		 * resolving to an array of stream objects.
		 *
		 * @param userIds User IDs of streams to fetch.
		 *
		 * @return Promise resolving to array of stream objects.
		 */
		async function fetchStreams(userIds: string[]): Promise<SLStream[]> {
			const pages = chunk(userIds, MAX_PER_PAGE);

			return (
				await Promise.all(
					pages.map(async (page) => {
						const streamsURL = new URL(API_BASE + '/streams');
						streamsURL.searchParams.set('first', MAX_PER_PAGE.toString());

						const usersURL = new URL(API_BASE + '/users');
						usersURL.searchParams.set('first', MAX_PER_PAGE.toString());

						page.forEach((userId) => {
							streamsURL.searchParams.append('user_id', userId);
							usersURL.searchParams.append('id', userId);
						});

						const streams: TwitchAPIPaginatedResponse<TwitchStream[]> = await fetchJSONWithClientId(
							streamsURL.toString()
						);
						if (!streams.data.length) {
							return [];
						}

						const gamesURL = new URL(API_BASE + '/games');
						gamesURL.searchParams.set('first', MAX_PER_PAGE.toString());
						streams.data.forEach((stream) => {
							gamesURL.searchParams.append('id', stream.game_id);
						});

						const [games, users]: [
							TwitchAPIResponse<TwitchGame[]>,
							TwitchAPIPaginatedResponse<TwitchUser[]>
						] = await Promise.all([
							fetchJSONWithClientId(gamesURL.toString()),
							fetchJSONWithClientId(usersURL.toString()),
						]);

						return streams.data.reduce((result, stream) => {
							const user = find(users.data, {
								id: stream.user_id,
							});
							const game = find(games.data, {
								id: stream.game_id,
							});

							if (user) {
								result.push({
									providerName: name,
									login: stream.user_name,
									url: 'https://twitch.tv/' + user.login,
									viewers: stream.viewer_count,
									title: stream.title,
									avatar: user.profile_image_url,
									activity: game ? game.name : undefined,
								} as SLStream);
							}

							return result;
						}, [] as SLStream[]);
					})
				)
			).flat();
		}

		const follows = await fetchFollows(auth.user.id as string);
		return fetchStreams(follows);
	},
} as SLProvider;
