/**
 * Regional Dev Tools Panel
 * Widget panel component for regional configuration dev tools
 * (Extracted from RegionalDevTools to work with the new dev-tools system)
 */

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PublicIcon from '@mui/icons-material/Public';
import {
  Alert,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { getSupportedRegions } from '../regional-config';
import { Region, RegionalConfig, RegionDetectionInfo } from '../types';

interface RegionalDevToolsPanelProps {
  /** Current region */
  region: Region;
  /** Regional configuration */
  config: RegionalConfig;
  /** Detection information */
  detectionInfo?: RegionDetectionInfo;
  /** Optional callback for region changes */
  onRegionChange?: (region: Region) => void;
}

/**
 * Regional configuration dev tools panel
 * Displays current region, detection info, feature flags, theme, and configuration
 */
export function RegionalDevToolsPanel({
  region,
  config,
  detectionInfo,
  onRegionChange,
}: RegionalDevToolsPanelProps) {
  const [copiedRegion, setCopiedRegion] = useState(false);
  const supportedRegions = getSupportedRegions();

  const handleCopyRegion = () => {
    navigator.clipboard.writeText(region);
    setCopiedRegion(true);
    setTimeout(() => setCopiedRegion(false), 2000);
  };

  const handleRegionChange = (
    _event: React.MouseEvent<HTMLElement>,
    newRegion: Region | null,
  ) => {
    if (newRegion && newRegion !== region && onRegionChange) {
      onRegionChange(newRegion);
    }
  };

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 2 }}>
        Development-only tools for testing regional configurations
      </Alert>

      {/* Region Switcher */}
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Current Region
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Chip
            icon={<PublicIcon />}
            label={region.toUpperCase()}
            color="primary"
          />
          <Tooltip title={copiedRegion ? 'Copied!' : 'Copy region'}>
            <IconButton size="small" onClick={handleCopyRegion}>
              {copiedRegion ? (
                <CheckCircleIcon fontSize="small" color="success" />
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>

        {onRegionChange && (
          <>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Switch Region (Realtime)
            </Typography>
            <ToggleButtonGroup
              value={region}
              exclusive
              onChange={handleRegionChange}
              fullWidth
              size="small"
              color="primary"
            >
              {supportedRegions.map((r) => (
                <ToggleButton key={r} value={r}>
                  {r.toUpperCase()}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              Changes apply immediately without page reload
            </Typography>
          </>
        )}
      </Paper>

      {/* Detection Info */}
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Detection Method
        </Typography>
        <Chip
          label={detectionInfo?.method || 'unknown'}
          size="small"
          color={detectionInfo?.method === 'domain' ? 'success' : 'warning'}
        />
        {detectionInfo?.context && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: 'block' }}
          >
            Context: {detectionInfo.context}
          </Typography>
        )}
      </Paper>

      {/* Feature Flags */}
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Feature Flags
        </Typography>
        <Stack spacing={0.5}>
          {Object.entries(config.features).map(([key, value]) => (
            <Stack
              key={key}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">{key}</Typography>
              <Chip
                label={value ? 'ON' : 'OFF'}
                size="small"
                color={value ? 'success' : 'default'}
              />
            </Stack>
          ))}
        </Stack>
      </Paper>

      {/* Theme Info */}
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Theme
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: 1,
              bgcolor: config.theme.primaryColor,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
          <Typography variant="body2" fontFamily="monospace">
            {config.theme.primaryColor}
          </Typography>
        </Stack>
      </Paper>

      {/* API & Locale */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          Configuration
        </Typography>
        <Stack spacing={1}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              API Endpoint
            </Typography>
            <Typography
              variant="body2"
              fontFamily="monospace"
              fontSize="0.8rem"
            >
              {config.api.baseUrl}
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="caption" color="text.secondary">
              Locale
            </Typography>
            <Typography variant="body2">
              {config.locale.language} • {config.locale.currency} •{' '}
              {config.locale.dateFormat}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
