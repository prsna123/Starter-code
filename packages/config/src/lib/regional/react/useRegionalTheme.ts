/**
 * useRegionalTheme hook
 * Get the Material-UI theme configured for the current region
 */

// import { logger } from '@mars-petcare/telemetry';
import type { Theme } from '@mui/material/styles';
import { useMemo } from 'react';
import { buildRegionalTheme } from '../theme-builder';
import { useRegionalContext } from './RegionalProvider';

/**
 * Hook to get the regional Material-UI theme
 * @returns Material-UI Theme object configured for the current region
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@mui/material/styles';
 *
 * function MyComponent() {
 *   const theme = useRegionalTheme();
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <Button color="primary">Regional Button</Button>
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function useRegionalTheme(): Theme {
  const { region, config } = useRegionalContext();

  const theme = useMemo(() => {
    const builtTheme = buildRegionalTheme(config);

    return builtTheme;
  }, [region, config]);

  return theme;
}
