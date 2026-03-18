/**
 * Regional theme builder for shared-ui
 *
 * This file re-implements theme building using shared-ui's MUI instance.
 * It ensures that themes created here are fully compatible with MUI components
 * exported from this package, avoiding cross-instance compatibility issues.
 */

import {
  createTheme,
  type Theme,
  type ThemeOptions,
} from '@mui/material/styles';
import type { RegionalConfig } from '@pn/config';

/**
 * Base theme options shared across all regions
 */
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

/**
 * Build a Material-UI theme from regional configuration
 * Uses shared-ui's MUI instance to ensure compatibility with exported components
 *
 * @param config - Regional configuration object
 * @returns Material-UI Theme object
 */
export function buildRegionalTheme(config: RegionalConfig): Theme {
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
