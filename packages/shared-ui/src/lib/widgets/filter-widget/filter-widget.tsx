import { useEffect, useMemo, useState } from 'react';
import { Dropdown, DropdownOption } from '../../components/dropdown';
import { getOptionsForFilter } from './filter-widget.api';
import { FilterWidgetConfig, FilterWidgetProps } from './filter-widget.types';
import './filter-widget.scss';

const DEFAULT_RETAILER = 'Retailer';

function buildFilterConfigs(dropdownCount: number, dropdownHeadings: string[]): FilterWidgetConfig[] {
  const count = Math.max(0, dropdownCount);

  return Array.from({ length: count }, (_, index) => ({
    key: `filter-${index + 1}`,
    label: dropdownHeadings[index] ?? `Filter ${index + 1}`,
  }));
}

export function FilterWidget({
  dropdownCount,
  dropdownHeadings,
  staticLeft = 'All Retailers',
  onApply,
  onReset,
}: FilterWidgetProps) {
  const filterConfigs = useMemo(
    () => buildFilterConfigs(dropdownCount, dropdownHeadings),
    [dropdownCount, dropdownHeadings]
  );

  const [optionsByKey, setOptionsByKey] = useState<Record<string, DropdownOption[]>>({});
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    let isMounted = true;

    const loadOptions = async () => {
      const entries = await Promise.all(
        filterConfigs.map(async (filterConfig) => {
          const options = await getOptionsForFilter(filterConfig.label);
          return [filterConfig.key, options] as const;
        })
      );

      if (!isMounted) {
        return;
      }

      setOptionsByKey(Object.fromEntries(entries));
      setValues((currentValues) => {
        const nextValues: Record<string, string> = {};

        for (const filterConfig of filterConfigs) {
          nextValues[filterConfig.key] = currentValues[filterConfig.key] ?? '';
        }

        return nextValues;
      });
    };

    loadOptions();

    return () => {
      isMounted = false;
    };
  }, [filterConfigs]);

  const handleValueChange = (key: string, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  };

  const handleReset = () => {
    const resetValues = Object.fromEntries(filterConfigs.map((filterConfig) => [filterConfig.key, '']));
    setValues(resetValues);
    onReset?.();
  };

  const handleApply = () => {
    onApply?.(values);
  };

  return (
    <section className="c-filter-widget" aria-label="Filter widget">
      <div className="c-filter-widget__retailer">
        <p className="c-filter-widget__retailer-label">{DEFAULT_RETAILER}</p>
        <p className="c-filter-widget__retailer-value">{staticLeft}</p>
      </div>

      <div className="c-filter-widget__filters">
        {filterConfigs.map((filterConfig) => (
          <Dropdown
            key={filterConfig.key}
            id={filterConfig.key}
            label={filterConfig.label}
            value={values[filterConfig.key] ?? ''}
            options={optionsByKey[filterConfig.key] ?? []}
            onChange={(value) => handleValueChange(filterConfig.key, value)}
          />
        ))}
      </div>

      <div className="c-filter-widget__actions">
        <button className="c-filter-widget__button c-filter-widget__button--ghost" type="button" onClick={handleReset}>
          Reset
        </button>
        <button className="c-filter-widget__button c-filter-widget__button--primary" type="button" onClick={handleApply}>
          Apply Filter
        </button>
      </div>
    </section>
  );
}

export default FilterWidget;
