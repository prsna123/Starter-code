import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'host',
  remotes: ['dashboard', 'intelligence', 'planning', 'output'],
  shared: (libraryName, defaultConfig) => {
    if (
      libraryName === 'react' ||
      libraryName === 'react-dom' ||
      libraryName === 'react-router-dom' ||
      libraryName === '@pn/shared-ui' ||
      libraryName === '@pn/shared-utils' ||
      libraryName === '@pn/shared-types' ||
      libraryName === '@pn/config'
    ) {
      return { ...defaultConfig, singleton: true, strictVersion: false };
    }

    if (libraryName === '@pn/shared-ui') {
      return { ...defaultConfig, singleton: true, strictVersion: false };
    }
    return defaultConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
