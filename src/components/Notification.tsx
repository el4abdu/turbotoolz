'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Set up auto-close timer
  useEffect(() => {
    if (duration > 0) {
      // Set up progress bar
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 100));
          return newProgress < 0 ? 0 : newProgress;
        });
      }, 100);
      
      setIntervalId(interval);
      
      // Set up auto-close
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => {
        clearTimeout(timer);
        if (interval) clearInterval(interval);
      };
    }
  }, [duration]);

  // Handle close animation
  const handleClose = () => {
    setIsVisible(false);
    if (intervalId) clearInterval(intervalId);
    
    // Wait for animation to complete before removing
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  // Get icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };

  // Get color classes based on notification type
  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/30',
          border: 'border-green-400 dark:border-green-600',
          text: 'text-green-700 dark:text-green-300',
          icon: 'text-green-500 dark:text-green-400',
          progress: 'bg-green-500 dark:bg-green-400',
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/30',
          border: 'border-red-400 dark:border-red-600',
          text: 'text-red-700 dark:text-red-300',
          icon: 'text-red-500 dark:text-red-400',
          progress: 'bg-red-500 dark:bg-red-400',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/30',
          border: 'border-yellow-400 dark:border-yellow-600',
          text: 'text-yellow-700 dark:text-yellow-300',
          icon: 'text-yellow-500 dark:text-yellow-400',
          progress: 'bg-yellow-500 dark:bg-yellow-400',
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/30',
          border: 'border-blue-400 dark:border-blue-600',
          text: 'text-blue-700 dark:text-blue-300',
          icon: 'text-blue-500 dark:text-blue-400',
          progress: 'bg-blue-500 dark:bg-blue-400',
        };
    }
  };

  const colors = getColorClasses();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`w-full max-w-sm rounded-lg shadow-lg border-l-4 overflow-hidden ${colors.bg} ${colors.border}`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${colors.icon}`}>
                {getIcon()}
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className={`text-sm font-medium ${colors.text}`}>{title}</p>
                <p className={`mt-1 text-sm ${colors.text} opacity-90`}>{message}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className={`inline-flex ${colors.text} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700">
              <div 
                className={`h-full ${colors.progress} transition-all duration-100 ease-linear`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification; 