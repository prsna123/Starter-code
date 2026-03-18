import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import PaletteIcon from '@mui/icons-material/Palette';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  useTheme as useMuiTheme,
} from '@mui/material/styles';
import { useRegionalContext } from '@pn/config';
import React, { useEffect, useMemo } from 'react';
import { buildRegionalTheme } from './regional-theme-builder';

// Re-export useTheme so consumers use the same MUI instance as ThemeProvider
// This ensures theme context works correctly across different MFE bundles
export { useMuiTheme as useTheme };

export interface ThemeProviderProps {
  children: React.ReactNode;
}

// Create Emotion cache with specific insertion point for ITCSS compliance
// This ensures Material-UI styles inject AFTER ITCSS Objects layer
// but BEFORE BEM Components, allowing proper cascade control
const createEmotionCache = () => {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return createCache({ key: 'mui' });
  }

  // Find or create the insertion point for MUI styles
  let insertionPoint = document.querySelector<HTMLMetaElement>(
    'meta[name="emotion-insertion-point"]',
  );

  if (!insertionPoint) {
    insertionPoint = document.createElement('meta');
    insertionPoint.setAttribute('name', 'emotion-insertion-point');
    insertionPoint.setAttribute('content', 'mui-styles');
    document.head.appendChild(insertionPoint);
  }

  return createCache({
    key: 'mui',
    insertionPoint,
    prepend: false, // Insert after the insertion point
  });
};

const emotionCache = createEmotionCache();

/**
 * Mars Petcare Theme Provider
 *
 * Wraps Material-UI ThemeProvider with our ITCSS design tokens.
 * Dynamically applies regional theme based on current region.
 * Configures Emotion to inject MUI styles in the correct ITCSS layer:
 *
 * ITCSS Cascade Order:
 * 1. Settings (variables)
 * 2. Tools (mixins)
 * 3. Generic (normalize/reset) - includes MUI CssBaseline
 * 4. Elements (base HTML)
 * 5. Objects (layout patterns)
 * 6. ** Material-UI Component Styles (injected here via Emotion) **
 * 7. Components (BEM components - can override MUI)
 * 8. Utilities (highest specificity)
 *
 * Use this at the root of your MFE application.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get current region and regional config
  const { region, config: regionalConfig } = useRegionalContext();

  // Build theme using shared-ui's MUI instance for full compatibility
  const regionalTheme = useMemo(() => {
    const theme = buildRegionalTheme(regionalConfig);

    return theme;
  }, [region, regionalConfig]);

  useEffect(() => {
    // Inject CSS custom properties for BEM components to use regional theme
    // This allows static SCSS design tokens to respond to MUI theme changes
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty(
        '--color-primary',
        regionalTheme.palette.primary.main,
      );
      document.documentElement.style.setProperty(
        '--color-primary-dark',
        regionalTheme.palette.primary.dark,
      );
      document.documentElement.style.setProperty(
        '--color-secondary',
        regionalTheme.palette.secondary.main,
      );
    }
  }, [region, regionalTheme]);

  // Register theme widget with dev tools (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    // Skip dev tools registration in Storybook (isolated webpack context)
    if (
      typeof window !== 'undefined' &&
      window.location.href.includes('/iframe.html')
    ) {
      return;
    }

    // Try to register theme widget with dev tools
    try {
      const devTools = require('@mars-petcare/dev-tools');
      const registry = devTools.devToolsRegistry;

      console.log('[Theme] Registering theme widget with dev tools');

      // Create widget component that passes theme and region as props
      const WidgetComponent = () => {
        return <h3>Theme Widget</h3>;
      };

      // Register the widget
      registry.register({
        id: 'theme',
        title: 'Theme',
        icon: PaletteIcon,
        component: WidgetComponent,
        order: 5, // After bootstrap (order: 4)
      });

      console.log('[Theme] Theme widget registered successfully');

      // Cleanup on unmount
      return () => {
        console.log('[Theme] Unregistering theme widget');
        registry.unregister('theme');
      };
    } catch (e) {
      // Dev tools not available (expected in some contexts)
      // Silently ignore - this is not an error condition
    }
  }, [region, regionalTheme]);

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider key={region} theme={regionalTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
