"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return newProgress;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  if (isComplete) return null;
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-light dark:bg-dark"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-24 h-24 relative mb-8">
        {theme === 'dark' ? (
          // Dark mode logo (white version)
          <svg className="w-full h-full" viewBox="0 0 888 484.74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M130.21,360.61v-50.2h179.4v50.2H254.24V516.69h-69V360.61Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
            <path d="M421.65,363.2h69V515.07H424.56l-.32-10q-8.43,5.84-21.38,9.55a105.5,105.5,0,0,1-29.14,3.73q-26.24,0-41.12-15.06t-14.9-43.88V363.2h69v89.37q0,15.23,15.22,15.22a26.64,26.64,0,0,0,11.17-2.59,23.62,23.62,0,0,0,8.59-6.15Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
            <path d="M604,364.49A110.39,110.39,0,0,1,632.77,360v51.16q-8.1.33-17.81,1.62a159.13,159.13,0,0,0-18.46,2.91,66.51,66.51,0,0,0-14.89,4.21v95.21h-69V363.2H581l.32,10.68Q589.71,368.71,604,364.49Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
            <path d="M803.91,377.93q19.59,18,19.59,60.07,0,40.49-19.43,60.39t-51.81,19.92q-14.25,0-24.77-3.73a73.25,73.25,0,0,1-19.6-10.52l-3.23,11H645.07v-216h69v68.33a56.75,56.75,0,0,1,16.51-5.51A101,101,0,0,1,749.67,360Q784.31,360,803.91,377.93Zm-55.86,84.35q5.18-6.79,5.18-23.47T748.05,416q-5.19-6.15-15.55-6.15-11.32,0-18.45,6.15v46a35,35,0,0,0,8.25,5.18,24.88,24.88,0,0,0,10.2,1.94Q742.87,469.08,748.05,462.28Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
            <path d="M995.22,380Q972.22,360,925.6,360T856.3,380q-22.66,20.09-22.66,59.1t22.5,59.1q22.5,20.09,69.46,20.08t69.78-20.08q22.83-20.07,22.83-59.1T995.22,380Zm-95.54.06h52.51v32.23l-2,57.13H901.66l-2-57.13ZM953.51,503H898.36V481h55.15Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
            <path d="M333.47,282.84C337,222.62,380.27,148,464.76,121.26c86.1-27.25,169.62,9.49,210.67,64.6-9.14,3.54-18.19,7.07-27.25,10.55-11.32,4.35-22.72,8.53-34,13.08-2.91,1.18-4.37.62-6.3-1.61-24.72-28.41-55.88-46.15-93.29-52-48.19-7.54-91.3,4.75-128.41,36-27.83,23.4-44.91,53.28-52,88.7A18,18,0,0,1,333.47,282.84Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
            <path d="M689.86,196.7c-1.26.92-2.51,1.88-3.8,2.77q-70.44,48.14-140.83,96.32a13.7,13.7,0,0,0-4.38,5.17,30.41,30.41,0,0,1-37.34,15.75,29.69,29.69,0,0,1-19.32-35.56c3.84-14.72,18.68-24.15,34.07-21.87a15,15,0,0,0,7.2-.75Q605.27,228.05,685,197.38c1.46-.56,2.94-1,4.41-1.56Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
            <path d="M634.61,251.72l58.86-40.19c4.3,11.05,8.81,21.33,12.31,31.93A170.83,170.83,0,0,1,714,298.35c0,3.67-.86,5.24-4.94,5.2-19.74-.16-39.49-.08-59.23-.07-2.35,0-4.56,0-4.72-3.27A154.08,154.08,0,0,0,634.61,251.72Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
          </svg>
        ) : (
          // Light mode logo (dark version)
          <svg className="w-full h-full" viewBox="0 0 888 484.74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M130.21,360.61v-50.2h179.4v50.2H254.24V516.69h-69V360.61Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
            <path d="M421.65,363.2h69V515.07H424.56l-.32-10q-8.43,5.84-21.38,9.55a105.5,105.5,0,0,1-29.14,3.73q-26.24,0-41.12-15.06t-14.9-43.88V363.2h69v89.37q0,15.23,15.22,15.22a26.64,26.64,0,0,0,11.17-2.59,23.62,23.62,0,0,0,8.59-6.15Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
            <path d="M604,364.49A110.39,110.39,0,0,1,632.77,360v51.16q-8.1.33-17.81,1.62a159.13,159.13,0,0,0-18.46,2.91,66.51,66.51,0,0,0-14.89,4.21v95.21h-69V363.2H581l.32,10.68Q589.71,368.71,604,364.49Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
            <path d="M803.91,377.93q19.59,18,19.59,60.07,0,40.49-19.43,60.39t-51.81,19.92q-14.25,0-24.77-3.73a73.25,73.25,0,0,1-19.6-10.52l-3.23,11H645.07v-216h69v68.33a56.75,56.75,0,0,1,16.51-5.51A101,101,0,0,1,749.67,360Q784.31,360,803.91,377.93Zm-55.86,84.35q5.18-6.79,5.18-23.47T748.05,416q-5.19-6.15-15.55-6.15-11.32,0-18.45,6.15v46a35,35,0,0,0,8.25,5.18,24.88,24.88,0,0,0,10.2,1.94Q742.87,469.08,748.05,462.28Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
            <path d="M995.22,380Q972.22,360,925.6,360T856.3,380q-22.66,20.09-22.66,59.1t22.5,59.1q22.5,20.09,69.46,20.08t69.78-20.08q22.83-20.07,22.83-59.1T995.22,380Zm-95.54.06h52.51v32.23l-2,57.13H901.66l-2-57.13ZM953.51,503H898.36V481h55.15Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
            <path d="M333.47,282.84C337,222.62,380.27,148,464.76,121.26c86.1-27.25,169.62,9.49,210.67,64.6-9.14,3.54-18.19,7.07-27.25,10.55-11.32,4.35-22.72,8.53-34,13.08-2.91,1.18-4.37.62-6.3-1.61-24.72-28.41-55.88-46.15-93.29-52-48.19-7.54-91.3,4.75-128.41,36-27.83,23.4-44.91,53.28-52,88.7A18,18,0,0,1,333.47,282.84Z" transform="translate(-130.21 -112.06)" fill="#4F46E5"/>
            <path d="M689.86,196.7c-1.26.92-2.51,1.88-3.8,2.77q-70.44,48.14-140.83,96.32a13.7,13.7,0,0,0-4.38,5.17,30.41,30.41,0,0,1-37.34,15.75,29.69,29.69,0,0,1-19.32-35.56c3.84-14.72,18.68-24.15,34.07-21.87a15,15,0,0,0,7.2-.75Q605.27,228.05,685,197.38c1.46-.56,2.94-1,4.41-1.56Z" transform="translate(-130.21 -112.06)" fill="#3B82F6"/>
            <path d="M634.61,251.72l58.86-40.19c4.3,11.05,8.81,21.33,12.31,31.93A170.83,170.83,0,0,1,714,298.35c0,3.67-.86,5.24-4.94,5.2-19.74-.16-39.49-.08-59.23-.07-2.35,0-4.56,0-4.72-3.27A154.08,154.08,0,0,0,634.61,251.72Z" transform="translate(-130.21 -112.06)" fill="#F59E0B"/>
          </svg>
        )}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "linear"
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"></div>
        </motion.div>
      </div>
      
      {/* Progress bar */}
      <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Loading... {Math.round(progress)}%
      </p>
    </motion.div>
  );
};

export default LoadingScreen; 