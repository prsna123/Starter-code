import { FilterWidget } from './widgets/filter-widget';

export function SharedUi() {
  return (
    <FilterWidget
      dropdownCount={4}
      dropdownHeadings={['Region', 'Brand', 'Channel', 'Period']}
      staticLeft="Walmart"
    />
  );
}

export default SharedUi;
