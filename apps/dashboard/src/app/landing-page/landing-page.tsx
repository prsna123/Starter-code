import { useState } from 'react';
import { FilterWidget } from '@pn/shared-ui';
import styles from './landing-page.module.scss';

const FILTER_HEADINGS = [
  'Region',
  'Category',
  'Brand',
  'Product',
  'Channel',
  'Time Period',
  'Retailer',
];

export function LandingPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleApply = (values: Record<string, string>) => {
    setActiveFilters(values);
  };

  const handleReset = () => {
    setActiveFilters({});
  };

  return (
    <main className={styles['landing-page']}>
      <header className={styles['landing-page__header']}>
        <h1 className={styles['landing-page__title']}>Dashboard</h1>
        <p className={styles['landing-page__subtitle']}>
          Pet Nutrition Supplier Relationship Management
        </p>
      </header>

      <section className={styles['landing-page__filters']} aria-label="Dashboard filters">
        <FilterWidget
          dropdownCount={7}
          dropdownHeadings={FILTER_HEADINGS}
          staticLeft="All Retailers"
          onApply={handleApply}
          onReset={handleReset}
        />
      </section>

      <section className={styles['landing-page__content']} aria-label="Dashboard content">
        {Object.keys(activeFilters).length > 0 && (
          <div className={styles['landing-page__active-filters']}>
            <h2 className={styles['landing-page__active-filters-title']}>Active Filters</h2>
            <ul className={styles['landing-page__active-filters-list']}>
              {FILTER_HEADINGS.map((heading, index) => {
                const key = `filter-${index + 1}`;
                const value = activeFilters[key];
                return value ? (
                  <li key={key} className={styles['landing-page__active-filter-item']}>
                    <span className={styles['landing-page__active-filter-label']}>{heading}:</span>
                    <span className={styles['landing-page__active-filter-value']}>{value}</span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}

export default LandingPage;
