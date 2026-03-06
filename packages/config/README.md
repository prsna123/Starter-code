# config

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build config` to build the library. The output will include the core
configuration helpers as well as the regional configuration utilities and
React components that were previously maintained in a separate package.

## Running unit tests

Run `nx test config` to execute the unit tests via [Jest](https://jestjs.io).

## Regional configuration features

This library now exposes a full regional configuration system:

- `RegionDetector` / `detectRegion` – auto-detect a region using hostname or
  environment variable
- `REGIONAL_CONFIGS`, `getRegionalConfig`, `isValidRegion`, `getSupportedRegions`
- `ThemeBuilder` and helpers for building Material UI themes per region
- React pieces under `react/`:
  - `RegionalProvider` context and hooks (`useRegion`, `useFeatureFlag`,
    `useRegionalTheme`, `useRegionalContext`)
  - Dev tools components (`RegionalDevTools`, `RegionalDevToolsWrapper`)

These were migrated from the old `regional-config` package and can now be
modified directly within this repo. Remove the `packages/regional-config`
folder once everything has been consolidated.
