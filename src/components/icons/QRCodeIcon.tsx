import React from 'react';

interface QRCodeIconProps {
  className?: string;
  color?: string;
}

const QRCodeIcon: React.FC<QRCodeIconProps> = ({ 
  className = "w-8 h-8", 
  color = "currentColor" 
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <line x1="7" y1="7" x2="7" y2="7"></line>
      <line x1="17" y1="7" x2="17" y2="7"></line>
      <line x1="7" y1="17" x2="7" y2="17"></line>
      <line x1="17" y1="17" x2="17" y2="17"></line>
    </svg>
  );
};

export default QRCodeIcon; 