/**
 * External dependencies
 */
import { html } from '/web_modules/htm/preact.js';

/** @typedef {import('/background/store').SLStream} SLStream */

/**
 * Returns a Stream element.
 *
 * @type {import('preact').FunctionComponent}
 *
 * @param {SLStream} props Component props.
 *
 * @return {import('preact').ComponentChild} Rendered element.
 */
function Stream( { url, title, providerName, login, avatar, activity, viewers } ) {
	const label = browser.i18n.getMessage( 'popupStreamLinkAccessibleLabel', [
		login,
		activity || '',
		String( viewers ),
	] );

	return html`
		<a
			href=${ url }
			title=${ title }
			aria-label=${ label }
			target="_blank"
			onClick=${ ( event ) => {
				// In Firefox, if the click handler is only responsible for
				// closing the popup, the navigation will not occur as expected.
				// Instead, emulate the navigation to ensure expected order of
				// window close.
				window.open( event.currentTarget.href, '_blank' );
				window.close();
				event.preventDefault();
			} }
			class="stream"
		>
			<div class="stream__avatar-provider">
				${ avatar && html`
					<img
						src=${ avatar }
						width="32"
						height="32"
						class="stream__avatar"
					/>
				` }
				<img
					src="/images/provider-icons/${ providerName }.svg"
					width="16"
					height="16"
					class="stream__provider"
				/>
			</div>
			<div class="stream__login-activity">
				<div class="stream__login">
					${ login }
				</div>
				${ activity && html`
					<div class="stream__activity">
						${ activity }
					</div>
				` }
			</div>
			<div class="stream__viewers">
				${ new Intl.NumberFormat().format( viewers ) }
			</div>
		</a>
	`;
}

export default Stream;
