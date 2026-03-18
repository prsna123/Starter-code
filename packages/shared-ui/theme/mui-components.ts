/**
 * Re-export commonly used MUI components from shared-ui's MUI instance.
 *
 * This ensures all MUI components use the same Material-UI instance and theme
 * context as ThemeProvider, preventing the issue where components use a
 * different MUI instance with the default theme.
 *
 * Import these from '@mars-petcare/shared-ui/theme' instead of '@mui/material'
 * to ensure theming works correctly.
 */

export {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

// Also export common types
export type {
  AlertProps,
  ButtonProps,
  ChipProps,
  StackProps,
} from '@mui/material';
