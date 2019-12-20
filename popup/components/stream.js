/**
 * External dependencies
 */
import { h } from '/web_modules/preact.js';

/** @typedef {import('/background/store').SLStream} SLStream */

/**
 * Returns a Stream element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {SLStream} props Component props.
 *
 * @return {import('preact').VNode} Rendered element.
 */
function Stream( { url, title, providerName, login, avatar, activity, viewers } ) {
	const label = browser.i18n.getMessage( 'popupStreamLinkAccessibleLabel', [
		login,
		activity || '',
		String( viewers ),
	] );

	return h(
		'a',
		{
			href: url,
			'aria-label': label,
			target: '_blank',
			onClick( event ) {
				// In Firefox, if the click handler is only responsible for
				// closing the popup, the navigation will not occur as expected.
				// Instead, emulate the navigation to ensure expected order of
				// window close.
				window.open( event.currentTarget.href, '_blank' );
				window.close();
				event.preventDefault();
			},
			className: 'stream',
			title,
		},
		h(
			'div',
			{ className: 'stream__avatar-provider' },
			avatar && h(
				'img',
				{
					src: avatar,
					width: '32',
					height: '32',
					className: 'stream__avatar',
				},
			),
			h(
				'img',
				{
					src: `/images/provider-icons/${ providerName }.svg`,
					width: '16',
					height: '16',
					className: 'stream__provider',
				},
			),
		),
		h(
			'div',
			{ className: 'stream__login-activity' },
			h(
				'div',
				{ className: 'stream__login' },
				login,
			),
			activity && h(
				'div',
				{ className: 'stream__activity' },
				activity,
			),
		),
		h(
			'div',
			{ className: 'stream__viewers' },
			new Intl.NumberFormat().format( viewers ),
		),
	);
}

export default Stream;
