"use client";

import React, { useState, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import useAppLoading from '@/hooks/useAppLoading';

const LoadingScreen: React.FC = () => {
  // Check if this is the first visit or a return visit
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  // Array of loading messages to display for first-time visitors
  const loadingMessages = [
    'Initializing application...',
    'Loading resources...',
    'Preparing tools...',
    'Setting up workspace...',
    'Almost ready...'
  ];
  
  // Use our custom loading hook with appropriate settings
  const { isLoading, progress, message: hookMessage } = useAppLoading(
    'Initializing application...',
    isFirstVisit ? 3000 : 1000 // Longer loading time for first visit
  );
  
  // State for custom loading message sequence
  const [customMessage, setCustomMessage] = useState(loadingMessages[0]);
  
  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      // For first-time visitors, mark as visited
      sessionStorage.setItem('hasVisited', 'true');
      
      // Show custom message sequence for first-time visitors
      loadingMessages.forEach((message, index) => {
        setTimeout(() => {
          setCustomMessage(message);
        }, index * 600);
      });
    }
  }, []);
  
  // Hide the loading screen after it's no longer needed
  if (!isLoading) return null;
  
  // Use custom message sequence for first visit, or hook message for returning visitors
  const displayMessage = isFirstVisit ? customMessage : hookMessage;
  
  return <LoadingPage message={displayMessage} progress={progress} />;
};

export default LoadingScreen; 