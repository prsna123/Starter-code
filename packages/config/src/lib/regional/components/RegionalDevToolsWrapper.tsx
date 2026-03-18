import { useEffect, useState } from 'react';
import { Region } from '../types';
import { RegionalDevTools } from './RegionalDevTools';

interface RegionalDevToolsWrapperProps {
  enabled?: boolean;
  onRegionChange?: (region: Region) => void;
}

/**
 * Wrapper component that adds keyboard shortcut and auto-enables dev tools in development
 */
export function RegionalDevToolsWrapper({
  enabled = true,
  onRegionChange,
}: RegionalDevToolsWrapperProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+Shift+D (or Cmd+Shift+D on Mac)
      const isDevToolsCombo =
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === 'd';

      if (isDevToolsCombo) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <RegionalDevTools
      open={open}
      onClose={() => setOpen(false)}
      onRegionChange={onRegionChange}
    />
  );
}
