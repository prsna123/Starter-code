import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'planning',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (
      libraryName === 'react' ||
      libraryName === 'react-dom' ||
      libraryName === 'react-router-dom'
    ) {
      return { ...defaultConfig, singleton: true, strictVersion: false };
    }
    return defaultConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
