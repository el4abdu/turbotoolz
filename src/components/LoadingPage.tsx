import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useTheme } from './ThemeProvider';

interface LoadingPageProps {
  message?: string;
  showLogo?: boolean;
  progress?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ 
  message = 'Loading...', 
  showLogo = true,
  progress
}) => {
  const { theme } = useTheme();
  
  // Determine if we should show the progress bar or the indeterminate animation
  const hasProgress = typeof progress === 'number';
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-light dark:bg-dark z-50">
      {/* Background animation elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 dark:bg-primary/20 animate-pulse-scale"></div>
        <div className="absolute top-2/3 left-2/3 w-48 h-48 rounded-full bg-secondary/10 dark:bg-secondary/20 animate-pulse-scale" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-accent/10 dark:bg-accent/20 animate-pulse-scale" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="w-full max-w-md p-8 flex flex-col items-center relative z-10">
        {showLogo && (
          <div className="mb-8 animate-pulse">
            <h1 className="text-5xl font-bold">
              <span className="text-primary">Turbo</span>
              <span className="text-dark dark:text-light">Toolz</span>
            </h1>
          </div>
        )}
        
        <div className="w-full flex flex-col items-center backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-8 rounded-2xl shadow-lg">
          <LoadingSpinner size="lg" className="mb-6" />
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
            {hasProgress ? (
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            ) : (
              <div className="bg-primary h-2.5 rounded-full w-0 animate-progress"></div>
            )}
          </div>
          
          <div className="flex justify-between w-full mb-2">
            <p className="text-gray-700 dark:text-gray-300 text-center font-medium">{message}</p>
            {hasProgress && (
              <span className="text-sm text-primary font-medium">{Math.round(progress)}%</span>
            )}
          </div>
          
          {/* Tool icons animating in a row */}
          <div className="flex justify-center space-x-4 mt-8">
            {[1, 2, 3, 4, 5].map((item, index) => (
              <div 
                key={item}
                className="w-8 h-8 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center">
        <p className="mb-1">© {new Date().getFullYear()} TurboToolz</p>
        <p className="text-xs">Your all-in-one toolkit for everyday online tasks</p>
      </div>
    </div>
  );
};

export default LoadingPage; 