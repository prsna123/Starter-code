import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '../../../../theme/index';
import './button-mui.scss';

export interface ButtonMuiProps
  extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'contained' | 'outlined' | 'text';
  bemSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * Button component that wraps MUI Button with BEM class overrides
 *
 * This demonstrates how to:
 * 1. Wrap MUI Button and apply BEM classes
 * 2. Override MUI's ripple effect and transitions
 * 3. Apply custom button variants using design tokens
 * 4. Handle icon buttons and button states
 */
export const ButtonMui: React.FC<ButtonMuiProps> = ({
  variant = 'contained',
  bemSize = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const bemClasses = [
    'c-button-mui',
    `c-button-mui--${variant}`,
    `c-button-mui--${bemSize}`,
    fullWidth && 'c-button-mui--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <MuiButton
      variant={variant}
      className={bemClasses}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default ButtonMui;
