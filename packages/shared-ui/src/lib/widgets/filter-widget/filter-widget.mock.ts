import { DropdownOption } from '../../components/dropdown';

const defaultOptions: DropdownOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Option A', value: 'option-a' },
  { label: 'Option B', value: 'option-b' },
  { label: 'Option C', value: 'option-c' },
];

export const filterOptionsByLabel: Record<string, DropdownOption[]> = {
  Region: [
    { label: 'All Regions', value: 'all-regions' },
    { label: 'North', value: 'north' },
    { label: 'South', value: 'south' },
    { label: 'West', value: 'west' },
  ],
  Brand: [
    { label: 'All Brands', value: 'all-brands' },
    { label: 'Brand 1', value: 'brand-1' },
    { label: 'Brand 2', value: 'brand-2' },
  ],
  Channel: [
    { label: 'All Channels', value: 'all-channels' },
    { label: 'Online', value: 'online' },
    { label: 'Retail', value: 'retail' },
  ],
};

export function getMockOptions(filterLabel: string): DropdownOption[] {
  return filterOptionsByLabel[filterLabel] ?? defaultOptions;
}
