import { Meta } from '@storybook/react';
import { ButtonMui } from './button-mui';
import { useTheme } from '../../theme';

const meta = {
  title: 'Atoms/ButtonMui',
  component: ButtonMui,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'Button style variant',
    },
    bemSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Button colour',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
  },
};

export default meta;

export const Contained = {
  args: {
    variant: 'contained',
    children: 'Contained Button',
  },
};

export const Outlined = {
  args: {
    variant: 'outlined',
    children: 'Outlined Button',
  },
};

export const Text = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

export const Small = {
  args: {
    bemSize: 'sm',
    children: 'Small Button',
  },
};

export const Medium = {
  args: {
    bemSize: 'md',
    children: 'Medium Button',
  },
};

export const Large = {
  args: {
    bemSize: 'lg',
    children: 'Large Button',
  },
};

export const Primary = {
  args: {
    color: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    color: 'secondary',
    children: 'Secondary Button',
  },
};

export const Error = {
  args: {
    color: 'error',
    children: 'Error Button',
  },
};

export const Success = {
  args: {
    color: 'success',
    children: 'Success Button',
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ButtonMui variant="contained">Contained</ButtonMui>
      <ButtonMui variant="outlined">Outlined</ButtonMui>
      <ButtonMui variant="text">Text</ButtonMui>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <ButtonMui bemSize="sm">Small</ButtonMui>
      <ButtonMui bemSize="md">Medium</ButtonMui>
      <ButtonMui bemSize="lg">Large</ButtonMui>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllColours = {
  render: () => {
    const theme = useTheme();

    return (
      <div>
        <div style={{
          marginBottom: '1rem',
          padding: '0.5rem',
          background: '#f0f0f0',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          <strong>MUI Theme Debug:</strong><br/>
          Primary: <span style={{ color: theme.palette.primary.main }}>{theme.palette.primary.main}</span><br/>
          Primary Dark: <span style={{ color: theme.palette.primary.dark }}>{theme.palette.primary.dark}</span><br/>
          Secondary: <span style={{ color: theme.palette.secondary.main }}>{theme.palette.secondary.main}</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <ButtonMui color="primary">Primary</ButtonMui>
          <ButtonMui color="secondary">Secondary</ButtonMui>
          <ButtonMui color="error">Error</ButtonMui>
          <ButtonMui color="warning">Warning</ButtonMui>
          <ButtonMui color="info">Info</ButtonMui>
          <ButtonMui color="success">Success</ButtonMui>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const Interactive = {
  args: {
    children: 'Click me!',
    onClick: () => alert('Button clicked!'),
  },
};
