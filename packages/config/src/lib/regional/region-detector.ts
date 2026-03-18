/**
 * Region detection logic
 * Detects the current region from domain name or environment variable
 */

import type {
  Region,
  RegionDetectionInfo,
  RegionDetectorOptions,
} from './types';

/**
 * RegionDetector class handles automatic region detection
 *
 * Detection order:
 * 1. Domain name (production): parses window.location.hostname
 * 2. Environment variable (development): reads process.env.REGION
 * 3. Default fallback: returns 'us'
 */
export class RegionDetector {
  private readonly options: Required<RegionDetectorOptions>;
  private detectionInfo: RegionDetectionInfo | null = null;

  constructor(options: RegionDetectorOptions = {}) {
    this.options = {
      fallback: options.fallback ?? 'us',
      envVariable: options.envVariable ?? 'REGION',
    };
  }

  /**
   * Detect the current region
   * @returns Region identifier ('us' or 'global')
   */
  detect(): Region {
    // Try domain detection first (production)
    const domainRegion = this.detectFromDomain();
    if (domainRegion) {
      this.detectionInfo = {
        region: domainRegion,
        method: 'domain',
        detectedAt: new Date().toISOString(),
        context: this.getHostname() || undefined,
      };
      return domainRegion;
    }

    // Try environment variable (development)
    const envRegion = this.detectFromEnvironment();
    if (envRegion) {
      this.detectionInfo = {
        region: envRegion,
        method: 'environment',
        detectedAt: new Date().toISOString(),
        context: `${this.options.envVariable}=${envRegion}`,
      };
      return envRegion;
    }

    // Use fallback
    this.detectionInfo = {
      region: this.options.fallback,
      method: 'default',
      detectedAt: new Date().toISOString(),
      context: 'No detection method succeeded',
    };
    return this.options.fallback;
  }

  /**
   * Get detection info from last detect() call
   */
  getDetectionInfo(): RegionDetectionInfo | null {
    return this.detectionInfo;
  }

  /**
   * Detect region from domain name
   * @private
   */
  private detectFromDomain(): Region | null {
    const hostname = this.getHostname();
    if (!hostname) {
      return null;
    }

    // Check for region identifiers in domain
    if (hostname.includes('mars-us') || hostname.includes('.us.')) {
      return 'us';
    }

    if (hostname.includes('mars-global') || hostname.includes('.global.')) {
      return 'global';
    }

    // No region identifier found
    return null;
  }

  /**
   * Detect region from environment variable
   * @private
   */
  private detectFromEnvironment(): Region | null {
    // Check process.env (Node.js or bundler-injected)
    if (typeof process !== 'undefined' && process.env) {
      const envValue = process.env[this.options.envVariable];
      if (envValue) {
        return this.normalizeRegion(envValue);
      }
    }

    return null;
  }

  /**
   * Get current hostname (browser or SSR-safe)
   * @private
   */
  private getHostname(): string | null {
    if (typeof window !== 'undefined' && window.location) {
      return window.location.hostname;
    }
    return null;
  }

  /**
   * Normalize region string to valid Region type
   * @private
   */
  private normalizeRegion(value: string): Region | null {
    const normalized = value.toLowerCase().trim();
    if (normalized === 'us' || normalized === 'global') {
      return normalized;
    }
    return null;
  }
}

/**
 * Create a new RegionDetector instance and detect region
 * Convenience function for one-off detection
 */
export function detectRegion(options?: RegionDetectorOptions): Region {
  const detector = new RegionDetector(options);
  return detector.detect();
}
