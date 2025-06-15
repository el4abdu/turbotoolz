'use client';

import React, { useEffect, useRef } from 'react';

interface SideBannerProps {
  position: 'left' | 'right';
  className?: string;
}

const SideBanner: React.FC<SideBannerProps> = ({ position, className = '' }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create script elements
    const scriptConfig = document.createElement('script');
    scriptConfig.type = 'text/javascript';
    scriptConfig.text = `
      atOptions = {
        'key' : '6a209abd4de3c48844b48237dcb10858',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;

    const scriptInvoke = document.createElement('script');
    scriptInvoke.type = 'text/javascript';
    scriptInvoke.src = '//www.highperformanceformat.com/6a209abd4de3c48844b48237dcb10858/invoke.js';
    scriptInvoke.async = true;

    // Append scripts to the container
    if (adContainerRef.current) {
      adContainerRef.current.appendChild(scriptConfig);
      adContainerRef.current.appendChild(scriptInvoke);
    }

    // Cleanup function
    return () => {
      if (adContainerRef.current) {
        if (scriptConfig.parentNode === adContainerRef.current) {
          adContainerRef.current.removeChild(scriptConfig);
        }
        if (scriptInvoke.parentNode === adContainerRef.current) {
          adContainerRef.current.removeChild(scriptInvoke);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={adContainerRef} 
      className={`side-banner fixed ${position === 'left' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 z-20 hidden lg:flex items-center justify-center ${className}`}
      style={{ 
        minHeight: '600px', 
        width: '160px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)',
        borderRadius: '8px',
        padding: '4px'
      }}
      data-ad-slot="true"
    />
  );
};

export default SideBanner; 