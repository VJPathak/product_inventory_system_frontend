import React, { useState, useRef, useEffect } from 'react';
import './MultiSelect.scss';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select options...',
  error,
  required,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedLabels = options.filter((opt) => value.includes(opt.value));

  return (
    <div className="multi-select" ref={containerRef}>
      {label && (
        <label className="multi-select__label">
          {label}
          {required && <span className="multi-select__required">*</span>}
        </label>
      )}
      <div
        className={`multi-select__control ${isOpen ? 'multi-select__control--open' : ''} ${
          error ? 'multi-select__control--error' : ''
        } ${disabled ? 'multi-select__control--disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            !disabled && setIsOpen(!isOpen);
          }
        }}
      >
        <div className="multi-select__value">
          {selectedLabels.length > 0 ? (
            <div className="multi-select__tags">
              {selectedLabels.map((opt) => (
                <span key={opt.value} className="multi-select__tag">
                  {opt.label}
                  <button
                    type="button"
                    className="multi-select__tag-remove"
                    onClick={(e) => removeOption(opt.value, e)}
                    aria-label={`Remove ${opt.label}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="multi-select__placeholder">{placeholder}</span>
          )}
        </div>
        <span className="multi-select__arrow">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {isOpen && (
        <ul className="multi-select__dropdown" role="listbox" aria-multiselectable="true">
          {options.length === 0 ? (
            <li className="multi-select__option multi-select__option--empty">No options available</li>
          ) : (
            options.map((option) => (
              <li
                key={option.value}
                className={`multi-select__option ${value.includes(option.value) ? 'multi-select__option--selected' : ''}`}
                onClick={() => toggleOption(option.value)}
                role="option"
                aria-selected={value.includes(option.value)}
              >
                <span className="multi-select__checkbox">
                  {value.includes(option.value) && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                {option.label}
              </li>
            ))
          )}
        </ul>
      )}

      {error && (
        <p className="multi-select__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
