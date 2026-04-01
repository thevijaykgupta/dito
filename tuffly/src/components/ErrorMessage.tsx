import React from 'react';

interface ErrorMessageProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, type = 'error' }) => {
  const bgColor = {
    error: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50'
  }[type];

  const textColor = {
    error: 'text-red-700',
    warning: 'text-yellow-700',
    info: 'text-blue-700'
  }[type];

  const borderColor = {
    error: 'border-red-200',
    warning: 'border-yellow-200',
    info: 'border-blue-200'
  }[type];

  return (
    <div className={`p-4 rounded-lg border ${bgColor} ${borderColor} mb-4`}>
      <p className={`text-sm font-medium ${textColor}`}>{message}</p>
    </div>
  );
};

export default ErrorMessage; 
