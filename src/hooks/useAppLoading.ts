import { useState, useEffect } from 'react';

interface UseAppLoadingReturn {
  isLoading: boolean;
  progress: number;
  message: string;
}

/**
 * Custom hook to handle application loading state
 * @param initialMessage Initial loading message
 * @param minLoadTime Minimum loading time in milliseconds
 * @returns Loading state object
 */
export default function useAppLoading(
  initialMessage: string = 'Loading...',
  minLoadTime: number = 800
): UseAppLoadingReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    let startTime = Date.now();
    let progressInterval: NodeJS.Timeout;
    let loadTimeout: NodeJS.Timeout;

    // Start progress animation
    progressInterval = setInterval(() => {
      // Calculate elapsed time as a percentage of minLoadTime
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min((elapsed / minLoadTime) * 100, 99);
      
      setProgress(calculatedProgress);
      
      // If we're at 99%, we're waiting for the page to be ready
      if (calculatedProgress >= 99) {
        setMessage('Almost ready...');
        clearInterval(progressInterval);
      }
    }, 100);

    // Function to check if the page is fully loaded
    const checkPageLoaded = () => {
      const elapsed = Date.now() - startTime;
      
      // Ensure minimum loading time has passed
      if (elapsed < minLoadTime) {
        loadTimeout = setTimeout(() => {
          setProgress(100);
          setMessage('Ready!');
          setTimeout(() => setIsLoading(false), 200);
        }, minLoadTime - elapsed);
      } else {
        setProgress(100);
        setMessage('Ready!');
        setTimeout(() => setIsLoading(false), 200);
      }
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      checkPageLoaded();
    } else {
      // Wait for the page to load
      window.addEventListener('load', checkPageLoaded);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadTimeout);
      window.removeEventListener('load', checkPageLoaded);
    };
  }, [minLoadTime, initialMessage]);

  return { isLoading, progress, message };
} 