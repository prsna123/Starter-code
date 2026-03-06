/**
 * Regional Provider
 * React Context Provider for regional configuration
 */

// import { logger } from '@mars-petcare/telemetry';
import PublicIcon from '@mui/icons-material/Public';
import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RegionDetector } from '../region-detector';
import { getRegionalConfig } from '../regional-config';
import type { Region, RegionalConfig, RegionDetectionInfo } from '../types';

// Optional dev-tools integration
let useDevToolWidget: any = null;
let RegionalDevToolsPanel: any = null;

try {
  // Try to import dev-tools if available
  const devTools = require('@mars-petcare/dev-tools');
  useDevToolWidget = devTools.useDevToolWidget;

  const panelModule = require('../components/RegionalDevToolsPanel');
  RegionalDevToolsPanel = panelModule.RegionalDevToolsPanel;
} catch (e) {
  // Dev tools not available - this is fine, it's optional
}

/**
 * Regional context value
 */
export interface RegionalContextValue {
  /** Current region */
  region: Region;
  /** Complete regional configuration */
  config: RegionalConfig;
  /** Detection information */
  detectionInfo: RegionDetectionInfo | null;
}

/**
 * Regional context
 */
const RegionalContext = createContext<RegionalContextValue | undefined>(
  undefined,
);

/**
 * RegionalProvider props
 */
export interface RegionalProviderProps {
  /** Child components */
  children: ReactNode;
  /** Override region (for testing or development) */
  overrideRegion?: Region;
}

/**
 * RegionalProvider component
 * Wraps the application and provides regional context to all children
 *
 * @example
 * ```tsx
 * <RegionalProvider>
 *   <App />
 * </RegionalProvider>
 * ```
 *
 * @example With override for testing
 * ```tsx
 * <RegionalProvider overrideRegion="global">
 *   <App />
 * </RegionalProvider>
 * ```
 *
 * @example With dev tools (requires @mars-petcare/dev-tools)
 * ```tsx
 * import { DevToolsProvider } from '@mars-petcare/dev-tools';
 *
 * <DevToolsProvider>
 *   <RegionalProvider>
 *     <App />
 *   </RegionalProvider>
 * </DevToolsProvider>
 * ```
 */
export const RegionalProvider: React.FC<RegionalProviderProps> = ({
  children,
  overrideRegion,
}) => {
  // Detect initial region
  const detector = useMemo(() => new RegionDetector(), []);
  const initialRegion = useMemo(
    () => overrideRegion || detector.detect(),
    [overrideRegion, detector],
  );
  const detectionInfo = useMemo(() => detector.getDetectionInfo(), [detector]);

  // State for dynamic region switching (used by dev tools)
  const [currentRegion, setCurrentRegion] = useState<Region>(initialRegion);

  // Compute context value
  const contextValue = useMemo<RegionalContextValue>(() => {
    const region = currentRegion;
    const config = getRegionalConfig(region);

    return { region, config, detectionInfo };
  }, [currentRegion, detectionInfo]);

  // Expose to window for debugging (development only)
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV !== 'production'
    ) {
      (window as any).__REGIONAL_CONFIG__ = {
        region: contextValue.region,
        config: contextValue.config,
        detectionMethod: detectionInfo?.method || 'unknown',
        detectedAt: detectionInfo?.detectedAt || new Date().toISOString(),
        version: '0.1.0',
      };
    }
  }, [contextValue, detectionInfo]);

  // Register dev tools widget if available
  // Update the widget whenever contextValue changes to pass latest values
  useEffect(() => {
    if (!useDevToolWidget || !RegionalDevToolsPanel) {
      return;
    }

    // Import the dev tools registry directly
    try {
      const devTools = require('@mars-petcare/dev-tools');
      const registry = devTools.devToolsRegistry;

      console.log(
        '[Regional Config] Registering/updating widget with dev tools',
      );

      // Create a component that receives context values as props
      // We capture the current contextValue in the closure, and it will be
      // re-registered whenever contextValue changes
      const WidgetComponent = () => (
        <RegionalDevToolsPanel
          region={contextValue.region}
          config={contextValue.config}
          detectionInfo={contextValue.detectionInfo}
          onRegionChange={setCurrentRegion}
        />
      );

      // Register the widget (will update if already registered)
      registry.register({
        id: 'regional-config',
        title: 'Regional Config',
        icon: PublicIcon,
        component: WidgetComponent,
        order: 1,
      });

      console.log(
        '[Regional Config] Widget registered successfully with region:',
        contextValue.region,
      );

      // Cleanup on unmount only
      return () => {
        console.log('[Regional Config] Unregistering widget');
        registry.unregister('regional-config');
      };
    } catch (e) {
      console.error(
        '[Regional Config] Failed to register dev tools widget:',
        e,
      );
    }
  }, [contextValue, setCurrentRegion]); // Re-register when context changes

  return (
    <RegionalContext.Provider value={contextValue}>
      {children}
    </RegionalContext.Provider>
  );
};

/**
 * Hook to access regional context
 * @throws Error if used outside RegionalProvider
 * @returns Regional context value
 */
export function useRegionalContext(): RegionalContextValue {
  const context = useContext(RegionalContext);
  if (!context) {
    throw new Error('useRegionalContext must be used within RegionalProvider');
  }
  return context;
}
