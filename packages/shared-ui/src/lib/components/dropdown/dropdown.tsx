import { useEffect, useRef, useState } from 'react';
import './dropdown.scss';

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DropdownProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function Dropdown({
  id,
  label,
  value,
  placeholder = 'Select',
  options,
  onChange,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption?.label ?? placeholder;
  const isPlaceholder = !selectedOption;

  const handleToggle = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`c-dropdown${disabled ? ' c-dropdown--disabled' : ''}`}
    >
      <label className="c-dropdown__label" htmlFor={id}>
        {label}
      </label>

      <div className="c-dropdown__control-wrap">
        {/* Trigger row */}
        <div
          className={`c-dropdown__trigger${isOpen ? ' c-dropdown__trigger--open' : ''}`}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <span className={`c-dropdown__value${isPlaceholder ? ' c-dropdown__value--placeholder' : ''}`}>
            {displayLabel}
          </span>

          {/* MdOutlineKeyboardArrowDown-style icon */}
          <svg
            className={`c-dropdown__chevron${isOpen ? ' c-dropdown__chevron--open' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="#262626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Options list */}
        {isOpen && (
          <ul
            className="c-dropdown__options"
            role="listbox"
            aria-labelledby={id}
          >
            {options.map((option, index) => (
              <>
                <li
                  key={option.value}
                  className={`c-dropdown__option${
                    value === option.value ? ' c-dropdown__option--selected' : ''
                  }${option.disabled ? ' c-dropdown__option--disabled' : ''}`}
                  role="option"
                  aria-selected={value === option.value}
                  onMouseDown={() => !option.disabled && handleSelect(option.value)}
                >
                  {option.label}
                </li>
                {index < options.length - 1 && (
                  <li key={`divider-${option.value}`} className="c-dropdown__divider" role="presentation" />
                )}
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
