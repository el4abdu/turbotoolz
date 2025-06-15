import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'light' | 'dark';
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = '',
  text
}: LoadingSpinnerProps) => {
  
  // Size mappings
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };
  
  // Color mappings
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-gray-500',
    light: 'text-white',
    dark: 'text-gray-800'
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      {text && (
        <p className={`mt-3 text-sm font-medium ${colorClasses[color]}`}>{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner; 