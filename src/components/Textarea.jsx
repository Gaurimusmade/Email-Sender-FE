import React from 'react';

const Textarea = ({ 
  label, 
  error, 
  helper, 
  className = '',
  labelClassName = '',
  textareaClassName = '',
  rows = 4,
  ...props 
}) => {
  const textareaClasses = `textarea-field ${error ? 'border-red-300 focus:ring-red-500' : ''} ${textareaClassName}`;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        className={textareaClasses}
        rows={rows}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helper && !error && (
        <p className="text-sm text-gray-500">{helper}</p>
      )}
    </div>
  );
};

export default Textarea;