/**
 * 通用输入框组件
 */

import React, { forwardRef } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  size = 'md',
  variant = 'default',
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const variantClasses = {
    default: 'bg-white/80 border border-gray-200/50 focus:border-transparent',
    filled: 'bg-gray-100/80 border-0 focus:bg-white/80',
  };

  const baseClasses = 'w-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 transition-all duration-300 backdrop-blur-sm';
  const inputClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const inputElement = (
    <div className="relative">
      {icon && iconPosition === 'left' && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={`${inputClasses} ${icon && iconPosition === 'left' ? 'pl-10' : ''} ${icon && iconPosition === 'right' ? 'pr-10' : ''}`}
        {...props}
      />
      {icon && iconPosition === 'right' && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );

  if (!label && !error && !helperText) {
    return inputElement;
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {inputElement}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
