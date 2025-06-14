'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdBlockModalProps {
  isOpen: boolean;
}

const AdBlockModal = ({ isOpen }: AdBlockModalProps) => {
  // No close function anymore - user must disable ad blocker
  const [countdown, setCountdown] = useState(5);
  const [refreshing, setRefreshing] = useState(false);

  // Countdown timer to refresh page
  useEffect(() => {
    if (!isOpen || refreshing) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setRefreshing(true);
      // Reload the page after countdown
      window.location.reload();
    }
  }, [isOpen, countdown, refreshing]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="adblock-modal">
          {/* Full screen overlay - no way to click through */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-[10000] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-red-600 dark:bg-red-700 p-6 text-white">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-2xl font-bold">Access Denied</h2>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-4">
                Ad Blocker Detected
              </h3>
              
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                <strong>This website cannot be used with an ad blocker enabled.</strong> Our free tools are supported by advertisements.
              </p>
              
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Please disable your ad blocker and refresh the page to continue using TurboToolz.
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to disable your ad blocker:</h4>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Look for the ad blocker icon in your browser toolbar</li>
                  <li>Click on the icon and select "Pause" or "Disable"</li>
                  <li>Choose to disable it for this website only</li>
                  <li>Refresh the page</li>
                </ol>
              </div>
              
              <div className="text-center">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Page will automatically refresh in <span className="font-bold text-red-600 dark:text-red-500">{countdown}</span> seconds
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-md transition-colors"
                >
                  I've Disabled My Ad Blocker - Refresh Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdBlockModal; 