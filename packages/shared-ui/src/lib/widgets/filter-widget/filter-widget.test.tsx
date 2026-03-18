import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { FilterWidget } from './filter-widget';
import * as api from './filter-widget.api';

jest.mock('./filter-widget.api');

describe('FilterWidget', () => {
  beforeEach(() => {
    (api.getOptionsForFilter as jest.Mock).mockResolvedValue([
      { label: 'North', value: 'north' },
      { label: 'South', value: 'south' },
      { label: 'East', value: 'east' },
      { label: 'West', value: 'west' },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders retailer section with static content', async () => {
    render(
      <FilterWidget
        dropdownCount={1}
        dropdownHeadings={['Region']}
        staticLeft="Walmart"
      />,
    );

    expect(screen.getByText('Retailer')).toBeInTheDocument();
    expect(screen.getByText('Walmart')).toBeInTheDocument();
  });

  it('renders dropdown labels after async load', async () => {
    render(
      <FilterWidget dropdownCount={2} dropdownHeadings={['Region', 'Brand']} />,
    );

    // Use findBy which waits for element with automatic act() wrapping
    expect(await screen.findByLabelText('Region')).toBeInTheDocument();
    expect(await screen.findByLabelText('Brand')).toBeInTheDocument();
  });

  it('renders apply and reset buttons', async () => {
    render(<FilterWidget dropdownCount={1} dropdownHeadings={['Region']} />);

    // findBy automatically waits and wraps in act()
    expect(await screen.findByText('Apply Filter')).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /Reset/ }),
    ).toBeInTheDocument();
  });

  it('calls onApply callback when apply button clicked', async () => {
    const onApply = jest.fn();

    render(
      <FilterWidget
        dropdownCount={1}
        dropdownHeadings={['Region']}
        onApply={onApply}
      />,
    );

    // Wait for component to load options
    await waitFor(() => {
      expect(api.getOptionsForFilter).toHaveBeenCalled();
    });

    const applyButton = screen.getByText('Apply Filter');

    await act(async () => {
      fireEvent.click(applyButton);
    });

    expect(onApply).toHaveBeenCalledWith(expect.any(Object));
  });

  it('calls onReset callback when reset button clicked', async () => {
    const onReset = jest.fn();

    render(
      <FilterWidget
        dropdownCount={1}
        dropdownHeadings={['Region']}
        onReset={onReset}
      />,
    );

    // Wait for component to load options
    await waitFor(() => {
      expect(api.getOptionsForFilter).toHaveBeenCalled();
    });

    const resetButton = screen.getByRole('button', { name: /Reset/ });

    await act(async () => {
      fireEvent.click(resetButton);
    });

    expect(onReset).toHaveBeenCalled();
  });
});
