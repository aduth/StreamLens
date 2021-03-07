## v1.4.0 (Unreleased)

### Bug Fixes

- Fix an issue where expired Twitch tokens are not correctly refreshed.

### Miscellaneous

- Removed Mixer support, since Mixer is no longer.

## v1.3.2 (2020-01-03)

### Bug Fixes

- Horizontal scrollbars should no longer be shown in Firefox when many streams are live.

### Improvements

- Mixer: Improved efficiency of querying for live streams data.

## v1.3.1 (2020-01-02)

### Bug Fixes

- Resolved an issue where not every live Mixer stream would be reported if the account follows more than 100 streams.

### Improvements

- Minor performance optimizations.

## v1.3.0 (2019-12-18)

### New Features

- Added keyboard support to navigate stream list options using arrow keys, and select a stream using the Enter key.

### Improvements

- Tooltips will appear when the associated button has keyboard focus (e.g. the Settings button).
- Increase contrast of hovered/focused buttons in light theme, for more identifiable keyboard selection.

## v1.2.0 (2019-12-17)

### New Features

- Add new Color Scheme setting to override use of light or dark theme.
- The stream list now includes a search field to filter by stream or activity name.
- The stream popup includes a button to quickly navigate to the extension settings.

### Bug Fixes

- Fix issue where Twitch stream links could navigate incorrectly when the streamer's name includes spaces.

## v1.1.2 (2019-11-17)

### Bug Fixes

- Resolve an issue where the "No Streams Live" popup would show shrunken in Chrome.

## v1.1.1 (2019-11-17)

### Bug Fixes

- Resolve an issue where the "Getting Started" popup would show shrunken in Chrome.

## v1.1.0 (2019-11-17)

### New Features

- Settings are now stored using browser cloud sync (if configured), so connections are automatically synced across all instances of the browser you are logged in to.

### Bug Fixes

- Fixed errors which could occasionally occur in Firefox when adding or removing connections.
- Horizontal scrollbars should no longer be shown in Firefox when many streams are live.

## v1.0.0 (2019-11-10)

- Initial release
