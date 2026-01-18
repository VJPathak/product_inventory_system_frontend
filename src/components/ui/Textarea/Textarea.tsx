import React from 'react';
import './Textarea.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={`textarea-wrapper ${className}`}>
        {label && (
          <label htmlFor={textareaId} className="textarea-wrapper__label">
            {label}
            {props.required && <span className="textarea-wrapper__required">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`textarea-wrapper__textarea ${error ? 'textarea-wrapper__textarea--error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="textarea-wrapper__error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="textarea-wrapper__helper">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
