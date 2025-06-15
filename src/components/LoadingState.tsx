import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  fullHeight?: boolean;
  spinnerSize?: 'sm' | 'md' | 'lg';
  spinnerColor?: 'primary' | 'secondary' | 'light' | 'dark';
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  children,
  loadingText,
  fullHeight = false,
  spinnerSize = 'md',
  spinnerColor = 'primary',
  className = '',
}) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={`flex flex-col items-center justify-center ${fullHeight ? 'min-h-[300px]' : ''} ${className}`}>
      <LoadingSpinner 
        size={spinnerSize} 
        color={spinnerColor} 
        text={loadingText} 
      />
    </div>
  );
};

export default LoadingState; 