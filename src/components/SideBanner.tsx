'use client';

import React, { useEffect, useRef } from 'react';

interface SideBannerProps {
  position: 'left' | 'right';
  className?: string;
}

// Custom hook to inject ad scripts
function useAdScript(containerRef: React.RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';
    
    // Create and append the configuration script
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key' : '6a209abd4de3c48844b48237dcb10858',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;
    containerRef.current.appendChild(configScript);
    
    // Create and append the invoke script
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/6a209abd4de3c48844b48237dcb10858/invoke.js';
    containerRef.current.appendChild(invokeScript);
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [containerRef]);
}

const SideBanner: React.FC<SideBannerProps> = ({ position, className = '' }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  
  // Use the custom hook to inject ad scripts
  useAdScript(adContainerRef);

  return (
    <div 
      className={`side-banner hidden lg:block ${className}`}
      style={{ 
        height: '600px', 
        width: '160px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)',
        borderRadius: '8px',
        padding: '4px'
      }}
    >
      <div ref={adContainerRef} className="w-full h-full" />
    </div>
  );
};

export default SideBanner; 