/**
 * useRegion hook
 * Access the current region identifier
 */

import type { Region } from '../types';
import { useRegionalContext } from './RegionalProvider';

/**
 * Hook to get the current region
 * @returns Current region identifier ('us' | 'global')
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const region = useRegion();
 *   return <div>Current region: {region}</div>;
 * }
 * ```
 */
export function useRegion(): Region {
  const { region } = useRegionalContext();
  return region;
}
