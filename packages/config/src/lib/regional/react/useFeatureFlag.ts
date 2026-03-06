/**
 * useFeatureFlag hook
 * Check if a feature flag is enabled in the current region
 */

import type { FeatureFlags } from '../types';
import { useRegionalContext } from './RegionalProvider';

/**
 * Hook to check if a feature flag is enabled
 * @param flag - Feature flag name
 * @returns true if the feature is enabled in the current region
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const showPromoBar = useFeatureFlag('showPromoBar');
 *   return showPromoBar ? <PromoBar /> : null;
 * }
 * ```
 */
export function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  const { config } = useRegionalContext();
  return config.features[flag];
}
