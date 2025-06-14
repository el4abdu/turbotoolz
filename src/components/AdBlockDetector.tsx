'use client';

import { useState, useEffect } from 'react';
import AdBlockModal from './AdBlockModal';

// Extend Window interface to include our custom property
declare global {
  interface Window {
    adBlockDetected?: boolean;
    adBlockChecked?: boolean;
  }
}

const AdBlockDetector = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Check if localStorage is available
    const hasLocalStorage = typeof window !== 'undefined' && window.localStorage;
    
    // Check if user has previously dismissed the message
    if (hasLocalStorage && localStorage.getItem('adBlockDismissed')) {
      return;
    }

    // Load the external detector script
    const script = document.createElement('script');
    script.src = '/adblock-detector.js';
    script.async = true;
    document.body.appendChild(script);

    // Listen for the custom event from the detector script
    const handleDetection = () => {
      if (window.adBlockDetected && window.adBlockChecked) {
        setAdBlockDetected(true);
        setShowModal(true);
        setHasChecked(true);
      }
    };
    
    const handleNoDetection = () => {
      if (!window.adBlockDetected && window.adBlockChecked) {
        setAdBlockDetected(false);
        setHasChecked(true);
      }
    };

    // Check after script has had time to run
    const timer = setTimeout(() => {
      handleDetection();
    }, 1000);

    // Also listen for custom events
    window.addEventListener('adBlockDetected', handleDetection);
    window.addEventListener('adBlockNotDetected', handleNoDetection);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('adBlockDetected', handleDetection);
      window.removeEventListener('adBlockNotDetected', handleNoDetection);
      // Clean up script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('adBlockDismissed', 'true');
    }
  };

  return <AdBlockModal isOpen={showModal} onClose={handleCloseModal} />;
};

export default AdBlockDetector; 