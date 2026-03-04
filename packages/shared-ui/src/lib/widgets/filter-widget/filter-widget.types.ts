import { DropdownOption } from '../../components/dropdown';

export interface FilterWidgetConfig {
  key: string;
  label: string;
}

export interface FilterWidgetProps {
  dropdownCount: number;
  dropdownHeadings: string[];
  staticLeft?: string;
  onApply?: (values: Record<string, string>) => void;
  onReset?: () => void;
}

export interface FilterDataApi {
  getOptionsForFilter: (filterLabel: string) => Promise<DropdownOption[]>;
}
