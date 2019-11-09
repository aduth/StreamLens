/**
 * Project dependencies
 */
import { applications } from '/config.js';

/**
 * Internal dependencies
 */
import { InvalidTokenError } from '../providers.js';

/**
 * @typedef {import('../store').SLStream} SLStream
 */

/**
 * Introspection response, listing the token scopes and various other
 * information about the grant.
 *
 * @typedef MixerTokenDetails
 *
 * @property {boolean} active     True if the token is valid and usable, false
 *                                otherwise. When false, no other values will
 *                                be returned.
 * @property {string}  scope      Space-delimited list of scopes the token is
 *                                granted.
 * @property {string}  client_id  The client ID associated with the token.
 * @property {string}  username   Username of the user to whom this token is
 *                                granted.
 * @property {string}  token_type The type of the token, "access_token" or
 *                                "refresh_token"
 * @property {number}  exp        Second timestamp when the token expired.
 * @property {number}  sub        User ID of the user to whom this token
 *                                belongs.
 */

/**
 * A GameType can be set on a channel and represents the title they are
 * broadcasting.
 *
 * @typedef MixerGameType
 *
 * @property {number} id              The unique ID of the game type.
 * @property {string} name            The name of the type.
 * @property {string} [coverUrl]      The url to the type's cover.
 * @property {string} [backgroundUrl] The url to the type's background.
 * @property {string} parent          The name of the parent type.
 * @property {string} description     The description of the type.
 * @property {string} source          The source where the type has been
 *                                    imported from.
 * @property {number} viewersCurrent  Total amount of users watching this type
 *                                    of stream.
 * @property {number} online          Amount of streams online with this type.
 */

/**
 * The social information for a channel.
 *
 * @typedef MixerSocialInfo
 *
 * @property {string}   twitter  Twitter profile URL.
 * @property {string}   facebook Facebook profile URL.
 * @property {string}   youtube  Youtube profile URL.
 * @property {string}   player   Player.me profile URL.
 * @property {string}   discord  Discord username and tag.
 * @property {string[]} verified A list of social keys which have been verified
 *                               via linking the Mixer account with the account
 *                               on the corresponding external service.
 */

/**
 * A Group which a user can belong to can control features or access controls
 * throughout Mixer.
 *
 * @typedef MixerUserGroup
 *
 * @property {number} id        The unique ID of the group.
 * @property {string} name      The name of the group.
 * @property {string} createdAt The creation date of the channel.
 * @property {string} updatedAt The update date of the channel.
 * @property {string} deletedAt The deletion date of the channel.
 */

/**
 * A User object with an embedded array of groups they belong to. A user is a
 * person on Mixer; they can sign in and interact with the site. Each user owns
 * a channel, which they can broadcast to.
 *
 * @typedef MixerUser
 *
 * @property {MixerUserGroup[]} groups        The groups of the user.
 * @property {number}           id            The unique ID of the user.
 * @property {number}           level         The user's current level on Mixer,
 *                                            as determined by the number of
 *                                            experience points the user has.
 * @property {MixerSocialInfo}  [social]      Social links.
 * @property {string}           username      The user's name. This is unique on
 *                                            the site and is also their channel
 *                                            name.
 * @property {string}           [email]       The user's email address. This is
 *                                            only shown if apropriate
 *                                            permissions are present.
 * @property {boolean}          verified      Indicates whether the user has
 *                                            verified their e-mail.
 * @property {number}           experience    The user's experience points.
 * @property {number}           sparks        The amount of sparks the user has.
 * @property {string}           [avatarUrl]   The user's profile URL.
 * @property {string}           [bio]         The user's biography. This may
 *                                            contain HTML.
 * @property {number}           [primaryTeam] The ID of user's main team.
 * @property {string}           createdAt     The creation date of the channel.
 * @property {string}           updatedAt     The update date of the channel.
 * @property {string}           deletedAt     The deletion date of the channel.
 */

/**
 * Augmented regular channel with additional data.
 *
 * @typedef MixerChannel
 *
 * @property {MixerGameType} [type]                 A nested type showing
 *                                                  information about this
 *                                                  channel's currently selected
 *                                                  type.
 * @property {MixerUser}     user                   This channel's owner
 * @property {number}        id                     The unique ID of the
 *                                                  channel.
 * @property {number}        userId                 The ID of the user owning
 *                                                  the channel.
 * @property {string}        token                  The name and url of the channel.
 * @property {boolean}       online                 Indicates if the channel is
 *                                                  streaming.
 * @property {boolean}       featured               True if featureLevel is > 0.
 * @property {number}        featureLevel           The featured level for this
 *                                                  channel. Its value controls
 *                                                  the position and order of
 *                                                  channels in the featured
 *                                                  carousel.
 * @property {boolean}       partnered              Indicates if the channel is
 *                                                  partnered.
 * @property {number}        [transcodingProfileId] The id of the transcoding
 *                                                  profile.
 * @property {boolean}       suspended              Indicates if the channel is
 *                                                  suspended.
 * @property {string}        name                   The title of the channel.
 * @property {string}        audience               The target audience of the
 *                                                  channel.
 * @property {number}        viewersTotal           Amount of unique viewers
 *                                                  that ever viewed this
 *                                                  channel.
 * @property {number}        viewersCurrent         Amount of current viewers.
 * @property {number}        numFollowers           Amount of followers.
 * @property {string}        description            The description of the
 *                                                  channel, can contain HTML.
 * @property {number}        [typeId]               The ID of the game type.
 * @property {boolean}       interactive            Indicates if that channel is
 *                                                  interactive.
 * @property {number}        [interactiveGameId]    The ID of the interactive
 *                                                  game used.
 * @property {number}        ftl                    The ftl stream id.
 * @property {boolean}       hasVod                 Indicates if the channel has
 *                                                  vod saved.
 * @property {string}        [languageId]           ISO 639 language id.
 * @property {number}        [coverId]              The ID of the cover
 *                                                  resource.
 * @property {number}        [thumbnailId]          The resource ID of the
 *                                                  thumbnail.
 * @property {number}        badgeId                The resource ID of the
 *                                                  subscriber badge.
 * @property {string}        bannerUrl              The URL of the the banner
 *                                                  image.
 * @property {number}        hosteeId               The ID of the hostee
 *                                                  channel.
 * @property {boolean}       hasTranscodes          Indicates if the channel has
 *                                                  transcodes enabled.
 * @property {boolean}       vodsEnabled            Indicates if the channel has
 *                                                  vod recording enabled.
 * @property {string}        [costreamId]           The costream that the
 *                                                  channel is in, if any.
 * @property {string}        createdAt              The creation date of the
 *                                                  channel.
 * @property {string}        updatedAt              The update date of the
 *                                                  channel.
 * @property {string}        deletedAt              The deletion date of the
 *                                                  channel.
 */

/**
 * Mixer base API URL.
 *
 * @type {string}
 */
const API_BASE = 'https://mixer.com/api/v1';

/**
 * Provider name.
 *
 * @type {string}
 */
const name = 'mixer';

/**
 * Number of streams to request per page.
 *
 * @type {number}
 */
const STREAMS_PER_PAGE = 100;

export default /** @type {import('../providers').SLProvider} */ ( {
	name,

	label: 'Mixer',

	supportsOIDC: false,

	authEndpoint: 'https://mixer.com/oauth/authorize',

	async getUser( token ) {
		const response = await window.fetch( API_BASE + '/oauth/token/introspect', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Client-Id': applications.mixer.clientId,
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify( { token } ),
		} );

		if ( response.status !== 200 ) {
			throw new InvalidTokenError();
		}

		/**
		 * @type {MixerTokenDetails}
		 */
		const json = await response.json();

		return {
			login: json.username,
			id: json.sub,
		};
	},

	async getStreams( auth ) {
		const results = [];

		for ( let page = 0; true; page++ ) {
			const url = new URL( `${ API_BASE }/users/${ auth.user.id }/follows` );
			url.searchParams.set( 'limit', STREAMS_PER_PAGE.toString() );
			url.searchParams.set( 'page', page.toString() );

			const response = await window.fetch( url.toString(), {
				headers: {
					'Content-Type': 'application/json',
					'Client-Id': applications.mixer.clientId,
					Authorization: 'Bearer ' + auth.token,
				},
			} );

			// Invalidate token.
			if ( response.status === 401 ) {
				throw new InvalidTokenError();
			} else if ( response.status !== 200 ) {
				break;
			}

			/**
			 * @type {MixerChannel[]}
			 */
			const json = await response.json();

			/**
			 * @type {SLStream[]}
			 */
			const streams = json
				.filter( ( channel ) => channel.online )
				.map( ( channel ) => ( {
					providerName: name,
					login: channel.user.username,
					url: 'https://mixer.com/' + channel.user.username,
					viewers: channel.viewersCurrent,
					title: channel.name,
					avatar: channel.user.avatarUrl,
					activity: channel.type.name,
				} ) );

			results.push( ...streams );

			const totalCount = parseInt( response.headers.get( 'x-total-count' ) || '', 10 );
			if ( isNaN( totalCount ) ) {
				break;
			}

			const hasExhaustedPages = page >= Math.ceil( totalCount / STREAMS_PER_PAGE ) - 1;
			if ( hasExhaustedPages ) {
				break;
			}
		}

		return results;
	},
} );
