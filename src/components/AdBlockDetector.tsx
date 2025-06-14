'use client';

import { useState, useEffect } from 'react';
import AdBlockModal from './AdBlockModal';

// Extend Window interface to include our custom property
declare global {
  interface Window {
    adBlockDetected?: boolean;
  }
}

const AdBlockDetector = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    // Load the external detector script
    const script = document.createElement('script');
    script.src = '/adblock-detector.js';
    script.async = true;
    document.body.appendChild(script);

    // Listen for the custom event from the detector script
    const handleDetection = () => {
      if (window.adBlockDetected) {
        setAdBlockDetected(true);
      }
    };

    // Check after script has had time to run
    const timer = setTimeout(() => {
      handleDetection();
    }, 500);

    // Also listen for custom event
    window.addEventListener('adBlockDetected', handleDetection);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('adBlockDetected', handleDetection);
      // Clean up script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // No longer need to handle close or dismissal
  // The modal will block the site until ad blocker is disabled

  return <AdBlockModal isOpen={adBlockDetected} />;
};

export default AdBlockDetector; 