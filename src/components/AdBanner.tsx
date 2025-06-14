'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '', style = {} }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create script elements
    const scriptConfig = document.createElement('script');
    scriptConfig.type = 'text/javascript';
    scriptConfig.text = `
      atOptions = {
        'key' : '74ebfa02738f9b6a62b2fbc2765571e2',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    const scriptInvoke = document.createElement('script');
    scriptInvoke.type = 'text/javascript';
    scriptInvoke.src = '//www.highperformanceformat.com/74ebfa02738f9b6a62b2fbc2765571e2/invoke.js';
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
      className={`ad-container flex justify-center items-center my-4 mx-auto ${className}`}
      style={{ minHeight: '60px', ...style }}
      data-ad-slot="true"
    />
  );
};

export default AdBanner; 