import { h } from 'preact';

/** @typedef {import('/background/store').SLStream} SLStream */

/**
 * Returns a Stream element.
 *
 * @param {SLStream} props Component props.
 */
function Stream({ url, title, providerName, login, avatar, activity, viewers }) {
	const label = browser.i18n.getMessage('popupStreamLinkAccessibleLabel', [
		login,
		activity || '',
		String(viewers),
	]);

	return (
		<a
			href={url}
			aria-label={label}
			target="_blank"
			onClick={(event) => {
				// In Firefox, if the click handler is only responsible for
				// closing the popup, the navigation will not occur as expected.
				// Instead, emulate the navigation to ensure expected order of
				// window close.
				window.open(event.currentTarget.href, '_blank');
				window.close();
				event.preventDefault();
			}}
			className="stream"
			title={title}
		>
			<div className="stream__avatar-provider">
				{avatar && <img src={avatar} width="32" height="32" className="stream__avatar" />}
				<img
					src={`/images/provider-icons/${providerName}.svg`}
					width="16"
					height="16"
					className="stream__provider"
				/>
			</div>
			<div className="stream__login-activity">
				<div className="stream__login">{login}</div>
				{activity && <div className="stream__activity">{activity}</div>}
			</div>
			<div className="stream__viewers">{new Intl.NumberFormat().format(viewers)}</div>
		</a>
	);
}

export default Stream;
