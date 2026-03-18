// Material-UI Theme Configuration
// Synchronized with ITCSS design tokens from styles/settings/_settings.scss

import { createTheme, ThemeOptions } from '@mui/material/styles';

// Design tokens from ITCSS settings layer
const designTokens = {
  colors: {
    primary: '#1e40af',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    textDisabled: '#9ca3af',
    bgPrimary: '#ffffff',
    bgSecondary: '#f9fafb',
    bgTertiary: '#f3f4f6',
    border: '#e5e7eb',
    borderFocus: '#3b82f6',
  },
  typography: {
    fontFamilyBase:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontFamilyMono: "'Fira Code', 'Courier New', monospace",
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      xl2: '1.5rem', // 24px
      xl3: '1.875rem', // 30px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    0: 0,
    1: 4, // 4px
    2: 8, // 8px
    3: 12, // 12px
    4: 16, // 16px
    5: 20, // 20px
    6: 24, // 24px
    8: 32, // 32px
    10: 40, // 40px
    12: 48, // 48px
    16: 64, // 64px
  },
  borderRadius: {
    none: 0,
    sm: 2, // 2px
    base: 4, // 4px
    md: 6, // 6px
    lg: 8, // 8px
    xl: 12, // 12px
    xl2: 16, // 16px
    full: 9999,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xl2: 1536,
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  transitions: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
  },
};

// Material-UI theme configuration
const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: designTokens.colors.primary,
    },
    secondary: {
      main: designTokens.colors.secondary,
    },
    success: {
      main: designTokens.colors.success,
    },
    warning: {
      main: designTokens.colors.warning,
    },
    error: {
      main: designTokens.colors.error,
    },
    info: {
      main: designTokens.colors.info,
    },
    text: {
      primary: designTokens.colors.textPrimary,
      secondary: designTokens.colors.textSecondary,
      disabled: designTokens.colors.textDisabled,
    },
    background: {
      default: designTokens.colors.bgPrimary,
      paper: designTokens.colors.bgSecondary,
    },
    divider: designTokens.colors.border,
  },
  typography: {
    fontFamily: designTokens.typography.fontFamilyBase,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: designTokens.typography.fontWeight.normal,
    fontWeightMedium: designTokens.typography.fontWeight.medium,
    fontWeightBold: designTokens.typography.fontWeight.bold,
    h1: {
      fontSize: designTokens.typography.fontSize.xl3,
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h2: {
      fontSize: designTokens.typography.fontSize.xl2,
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h3: {
      fontSize: designTokens.typography.fontSize.xl,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h4: {
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    h5: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    h6: {
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    body1: {
      fontSize: designTokens.typography.fontSize.base,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    body2: {
      fontSize: designTokens.typography.fontSize.sm,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    button: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.medium,
      textTransform: 'none',
    },
    caption: {
      fontSize: designTokens.typography.fontSize.xs,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
  },
  shape: {
    borderRadius: designTokens.borderRadius.base,
  },
  spacing: 8, // 8px base unit
  breakpoints: {
    values: {
      xs: 0,
      sm: designTokens.breakpoints.sm,
      md: designTokens.breakpoints.md,
      lg: designTokens.breakpoints.lg,
      xl: designTokens.breakpoints.xl,
    },
  },
  shadows: [
    'none',
    designTokens.shadows.sm,
    designTokens.shadows.base,
    designTokens.shadows.base,
    designTokens.shadows.md,
    designTokens.shadows.md,
    designTokens.shadows.md,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
  ],
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.base,
          textTransform: 'none',
          fontWeight: designTokens.typography.fontWeight.medium,
          transition: `all ${designTokens.transitions.base} ease-in-out`,
        },
        sizeSmall: {
          padding: `${designTokens.spacing[2]}px ${designTokens.spacing[3]}px`,
          fontSize: designTokens.typography.fontSize.sm,
        },
        sizeMedium: {
          padding: `${designTokens.spacing[3]}px ${designTokens.spacing[4]}px`,
          fontSize: designTokens.typography.fontSize.base,
        },
        sizeLarge: {
          padding: `${designTokens.spacing[4]}px ${designTokens.spacing[6]}px`,
          fontSize: designTokens.typography.fontSize.lg,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          boxShadow: designTokens.shadows.base,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.base,
        },
        elevation1: {
          boxShadow: designTokens.shadows.sm,
        },
        elevation2: {
          boxShadow: designTokens.shadows.base,
        },
        elevation3: {
          boxShadow: designTokens.shadows.md,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.borderRadius.base,
            '&:hover fieldset': {
              borderColor: designTokens.colors.borderFocus,
            },
            '&.Mui-focused fieldset': {
              borderColor: designTokens.colors.borderFocus,
              borderWidth: '2px',
            },
          },
        },
      },
    },
  },
};

// Create and export the theme
export const theme = createTheme(themeOptions);

// Export design tokens for direct use
export { designTokens };
