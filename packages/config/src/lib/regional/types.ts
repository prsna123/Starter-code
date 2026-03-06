// Regional configuration types
// Defines all interfaces and types for the regional config system

/**
 * Supported regions
 */
export type Region = 'us' | 'global';

/**
 * Method used to detect the region
 */
export type DetectionMethod = 'domain' | 'environment' | 'default';

/**
 * Feature flags control content visibility per region
 * Layer 2: Content Visibility
 */
export interface FeatureFlags {
  /** Show announcement banner for site-wide messages (US only) */
  showAnnouncementBanner: boolean;
  /** Show analytics dashboard (all regions) */
  showAnalyticsDashboard: boolean;
  /** Show advanced reports tab (US only) */
  showAdvancedReports: boolean;
  /** Enable beta features (US only) */
  enableBetaFeatures: boolean;
}

/**
 * Theme configuration defines visual differences per region
 * Layer 1: Visual Differences
 */
export interface ThemeConfig {
  /** Primary brand color */
  primaryColor: string;
  /** Secondary brand color */
  secondaryColor: string;
  /** Font family */
  fontFamily: string;
  /** Base spacing unit (in pixels) */
  spacing: number;
}

/**
 * API configuration defines backend endpoints per region
 * Layer 3: Behavioural Differences
 */
export interface ApiConfig {
  /** Base URL for API requests */
  baseUrl: string;
  /** Request timeout in milliseconds */
  timeout: number;
  /** Number of retry attempts for failed requests */
  retryAttempts: number;
}

/**
 * Locale configuration defines regional formatting
 * Layer 3: Behavioural Differences
 */
export interface LocaleConfig {
  /** Language code (e.g. 'en-US', 'en-GB') */
  language: string;
  /** Currency code (e.g. 'USD', 'GBP') */
  currency: string;
  /** Date format pattern (e.g. 'MM/DD/YYYY', 'DD/MM/YYYY') */
  dateFormat: string;
  /** Timezone identifier (e.g. 'America/New_York', 'Europe/London') */
  timezone: string;
}

/**
 * Complete regional configuration
 * Combines all aspects of regional differences
 */
export interface RegionalConfig {
  /** Region identifier */
  region: Region;
  /** Feature flags */
  features: FeatureFlags;
  /** Theme configuration */
  theme: ThemeConfig;
  /** API configuration */
  api: ApiConfig;
  /** Locale configuration */
  locale: LocaleConfig;
}

/**
 * Options for region detection
 */
export interface RegionDetectorOptions {
  /** Fallback region if detection fails */
  fallback?: Region;
  /** Environment variable name to check (default: 'REGION') */
  envVariable?: string;
}

/**
 * Debug information about region detection
 */
export interface RegionDetectionInfo {
  /** Detected region */
  region: Region;
  /** Method used for detection */
  method: DetectionMethod;
  /** Timestamp of detection */
  detectedAt: string;
  /** Additional context (e.g. hostname, env value) */
  context?: string;
}
