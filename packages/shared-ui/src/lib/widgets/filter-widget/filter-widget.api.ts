import { DropdownOption } from '../../components/dropdown';
import { getMockOptions } from './filter-widget.mock';

export async function getOptionsForFilter(filterLabel: string): Promise<DropdownOption[]> {
  return Promise.resolve(getMockOptions(filterLabel));
}
