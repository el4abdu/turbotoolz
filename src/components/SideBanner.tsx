'use client';

import React from 'react';

export interface SideBannerProps {
  position?: 'left' | 'right';
  className?: string;
}

const SideBanner: React.FC<SideBannerProps> = ({ position = 'left', className = '' }) => {
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
    <div className={`sticky top-24 h-[calc(100vh-96px)] p-2 ${className}`}>
      <div className="w-full h-full bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2 flex flex-col items-center justify-center">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">Advertisement</div>
        <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-xs">Ad Space</span>
        </div>
      </div>
    </div>
  );
};

export default SideBanner; 