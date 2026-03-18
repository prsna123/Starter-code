export { designTokens, theme } from './theme';
export { ThemeProvider, useTheme } from './ThemeProvider';
export type { ThemeProviderProps } from './ThemeProvider';

// Re-export MUI components so consumers use the same MUI instance as ThemeProvider
export * from './mui-components';
