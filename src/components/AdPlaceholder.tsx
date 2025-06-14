'use client';

import { useEffect, useRef } from 'react';

interface AdPlaceholderProps {
  className?: string;
  width?: string;
  height?: string;
}

const AdPlaceholder = ({ 
  className = '', 
  width = '300px', 
  height = '250px' 
}: AdPlaceholderProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is just a placeholder for demonstration
    // In a real implementation, you would initialize your ad code here
    if (adRef.current) {
      // Add classes that ad blockers typically target
      adRef.current.className += ' ad-unit ad-zone adsbox ad-placement';
    }
  }, []);

  return (
    <div 
      ref={adRef}
      className={`bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md flex items-center justify-center ${className}`}
      style={{ width, height }}
      data-ad-client="ca-pub-example"
      data-ad-slot="example"
    >
      <div className="text-center p-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">Advertisement Placeholder</p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
          This is where an ad would normally appear
        </p>
      </div>
    </div>
  );
};

export default AdPlaceholder; 