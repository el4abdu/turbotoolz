import React from 'react';

interface PasswordIconProps {
  className?: string;
  color?: string;
}

const PasswordIcon: React.FC<PasswordIconProps> = ({ 
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
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      <circle cx="12" cy="16" r="1"></circle>
    </svg>
  );
};

export default PasswordIcon; 