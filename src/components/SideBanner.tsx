'use client';

import React from 'react';

interface SideBannerProps {
  position: 'left' | 'right';
  className?: string;
}

const SideBanner: React.FC<SideBannerProps> = ({ position, className = '' }) => {
  // Ad script as a string
  const adScript = `
    <script type="text/javascript">
      atOptions = {
        'key' : '6a209abd4de3c48844b48237dcb10858',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="//www.highperformanceformat.com/6a209abd4de3c48844b48237dcb10858/invoke.js"></script>
  `;

  return (
    <div 
      className={`side-banner fixed ${position === 'left' ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 z-20 hidden lg:block ${className}`}
      style={{ 
        height: '600px', 
        width: '160px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '4px'
      }}
      dangerouslySetInnerHTML={{ __html: adScript }}
    />
  );
};

export default SideBanner; 