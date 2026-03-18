import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../../theme/ThemeProvider';

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
};
