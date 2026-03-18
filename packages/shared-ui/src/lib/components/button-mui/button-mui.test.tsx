// bring in the jest-dom matchers (toBeInTheDocument, etc.)
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ButtonMui } from './button-mui';

describe('ButtonMui Component', () => {
  it('should render children', () => {
    render(<ButtonMui>Click me</ButtonMui>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should apply base BEM class', () => {
    const { container } = render(<ButtonMui>Test</ButtonMui>);
    expect(container.querySelector('.c-button-mui')).toBeInTheDocument();
  });

  it('should apply variant BEM classes', () => {
    const { container: c1 } = render(
      <ButtonMui variant="outlined">Test</ButtonMui>,
    );
    expect(c1.querySelector('.c-button-mui--outlined')).toBeInTheDocument();

    const { container: c2 } = render(
      <ButtonMui variant="text">Test</ButtonMui>,
    );
    expect(c2.querySelector('.c-button-mui--text')).toBeInTheDocument();
  });

  it('should apply size BEM classes', () => {
    const { container: c1 } = render(<ButtonMui bemSize="sm">Test</ButtonMui>);
    expect(c1.querySelector('.c-button-mui--sm')).toBeInTheDocument();

    const { container: c2 } = render(<ButtonMui bemSize="lg">Test</ButtonMui>);
    expect(c2.querySelector('.c-button-mui--lg'))?.toBeInTheDocument();
  });

  it('should apply fullWidth class', () => {
    const { container } = render(<ButtonMui fullWidth>Test</ButtonMui>);
    expect(
      container.querySelector('.c-button-mui--full-width'),
    ).toBeInTheDocument();
  });

  it('should pass through MUI Button props', () => {
    render(<ButtonMui disabled>Disabled</ButtonMui>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <ButtonMui className="custom">Test</ButtonMui>,
    );
    expect(container.querySelector('.custom')).toBeInTheDocument();
  });
});
