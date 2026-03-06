// Theme builder
// Generates Material-UI theme variants based on regional configuration

import {
  createTheme,
  type Theme,
  type ThemeOptions,
} from '@mui/material/styles';
import type { RegionalConfig } from './types';

// Base theme options that are shared across all regions
// Can be overridden with regional theme configuration
const baseThemeOptions: ThemeOptions = {
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 4,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
};

// ThemeBuilder class generates Material-UI themes per region
export class ThemeBuilder {
  /**
   * Build a Material-UI theme for the given regional configuration
   * @param config - Regional configuration object
   * @returns Material-UI Theme object
   */
  build(config: RegionalConfig): Theme {
    const { theme: themeConfig } = config;

    const regionalThemeOptions: ThemeOptions = {
      ...baseThemeOptions,
      palette: {
        primary: {
          main: themeConfig.primaryColor,
        },
        secondary: {
          main: themeConfig.secondaryColor,
        },
      },
      typography: {
        ...baseThemeOptions.typography,
        fontFamily: themeConfig.fontFamily,
      },
      spacing: themeConfig.spacing,
    };

    return createTheme(regionalThemeOptions);
  }

  /**
   * Build theme from region identifier (convenience method)
   * @param region - Region identifier
   * @param configs - Regional configurations map
   * @returns Material-UI Theme object
   */
  buildForRegion(
    region: string,
    configs: Record<string, RegionalConfig>,
  ): Theme {
    const config = configs[region];
    if (!config) {
      throw new Error(`No configuration found for region: ${region}`);
    }
    return this.build(config);
  }
}

// Convenience factories
export function createThemeBuilder(): ThemeBuilder {
  return new ThemeBuilder();
}

export function buildRegionalTheme(config: RegionalConfig): Theme {
  const builder = new ThemeBuilder();
  return builder.build(config);
}
