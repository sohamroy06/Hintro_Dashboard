import { useState } from 'react';
import './FormInput.css';

export function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled,
  showPasswordToggle = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && showPassword ? 'text' : type;

  return (
    <div className="form-input">
      {label && <label className="form-input__label">{label}</label>}
      <div className="form-input__wrapper">
        <input
          type={inputType}
          className={`form-input__field ${error ? 'form-input__field--error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="form-input__toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <span className="form-input__error">{error}</span>}
    </div>
  );
}
