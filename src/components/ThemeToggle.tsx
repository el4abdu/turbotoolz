"use client";

import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  return (
    <button
      onClick={handleToggle}
      className="relative inline-flex items-center justify-center p-2 w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none transition-colors duration-500 overflow-hidden shadow-inner"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      disabled={isAnimating}
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Stars (visible in dark mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full opacity-70"></div>
        <div className="absolute top-3 left-4 w-0.5 h-0.5 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-2 left-8 w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-4 left-6 w-0.5 h-0.5 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-5 left-10 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
      </div>
      
      {/* Clouds (visible in light mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-2 left-8 w-2 h-1.5 bg-white rounded-full"></div>
        <div className="absolute top-3 left-6 w-3 h-2 bg-white rounded-full"></div>
        <div className="absolute top-4 left-2 w-2.5 h-1.5 bg-white rounded-full"></div>
      </div>
      
      {/* Sun/Moon */}
      <div
        className={`absolute w-6 h-6 rounded-full shadow-md transform transition-all duration-500 flex items-center justify-center ${
          theme === 'dark' 
            ? 'translate-x-[0.75rem] bg-gray-100' 
            : 'translate-x-[-0.75rem] bg-yellow-300'
        }`}
      >
        {theme === 'dark' ? (
          // Moon shape
          <div className="relative w-5 h-5 rounded-full bg-gray-100">
            <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-gray-700"></div>
          </div>
        ) : (
          // Sun rays
          <div className="relative w-full h-full">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-yellow-500"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 45}deg) translateX(0.5rem) translateY(-50%)`,
                }}
              ></div>
            ))}
            <div className="absolute inset-1 rounded-full bg-yellow-300"></div>
          </div>
        )}
      </div>
      
      {/* Animated transition overlay */}
      {isAnimating && (
        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
          theme === 'dark' ? 'bg-gray-700 scale-0' : 'bg-gray-200 scale-100'
        }`}></div>
      )}
    </button>
  );
};

export default ThemeToggle; 