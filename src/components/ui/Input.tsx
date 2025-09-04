import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'password';
  required?: boolean;
  className?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  dir?: 'rtl' | 'ltr' | 'auto';
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  className = '',
  error,
  startIcon,
  endIcon,
  dir
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {startIcon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          dir={dir}
          className={`w-full ${startIcon ? 'pl-4 pr-11' : 'px-4'} ${endIcon ? 'pl-11' : ''} py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {endIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {endIcon}
          </span>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input;
