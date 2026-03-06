// Regional configuration definitions
// Defines all US vs Global differences

import type { Region, RegionalConfig } from './types';

//
// Regional configurations for all supported regions
//
export const REGIONAL_CONFIGS: Record<Region, RegionalConfig> = {
  us: {
    region: 'us',
    features: {
      showAnnouncementBanner: true,
      showAnalyticsDashboard: true,
      showAdvancedReports: true,
      enableBetaFeatures: true,
    },
    theme: {
      primaryColor: '#1e40af', // Blue
      secondaryColor: '#6b7280', // Gray
      fontFamily: 'Inter, sans-serif',
      spacing: 8,
    },
    api: {
      baseUrl: 'https://api.mars-us.com',
      timeout: 5000,
      retryAttempts: 3,
    },
    locale: {
      language: 'en-US',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timezone: 'America/New_York',
    },
  },
  global: {
    region: 'global',
    features: {
      showAnnouncementBanner: false,
      showAnalyticsDashboard: true,
      showAdvancedReports: false,
      enableBetaFeatures: false,
    },
    theme: {
      primaryColor: '#059669', // Green
      secondaryColor: '#6b7280', // Gray
      fontFamily: 'Inter, sans-serif',
      spacing: 8,
    },
    api: {
      baseUrl: 'https://api.mars-global.com',
      timeout: 8000,
      retryAttempts: 5,
    },
    locale: {
      language: 'en-GB',
      currency: 'GBP',
      dateFormat: 'DD/MM/YYYY',
      timezone: 'Europe/London',
    },
  },
};

//
// Helper functions
//
export function getRegionalConfig(region: Region): RegionalConfig {
  return REGIONAL_CONFIGS[region];
}

export function isValidRegion(region: string): region is Region {
  return region === 'us' || region === 'global';
}

export function getSupportedRegions(): Region[] {
  return Object.keys(REGIONAL_CONFIGS) as Region[];
}
