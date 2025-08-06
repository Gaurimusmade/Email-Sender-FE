import React from 'react';

const Input = ({ 
  label, 
  error, 
  helper, 
  icon: Icon,
  className = '',
  labelClassName = '',
  inputClassName = '',
  ...props 
}) => {
  const inputClasses = `input-field ${error ? 'border-red-300 focus:ring-red-500' : ''} ${inputClassName}`;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        <input
          className={`${inputClasses} ${Icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helper && !error && (
        <p className="text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
};

export default Input;