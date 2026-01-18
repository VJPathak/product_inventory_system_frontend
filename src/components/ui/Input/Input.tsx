import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`input-wrapper ${className}`}>
        {label && (
          <label htmlFor={inputId} className="input-wrapper__label">
            {label}
            {props.required && <span className="input-wrapper__required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`input-wrapper__input ${error ? 'input-wrapper__input--error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="input-wrapper__error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="input-wrapper__helper">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
