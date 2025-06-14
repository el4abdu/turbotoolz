import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'neomorphic' | 'solid';
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'glass',
  hoverEffect = true,
}) => {
  // Base styles
  const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300';
  
  // Variant styles
  const variantStyles = {
    glass: 'bg-white/70 dark:bg-dark/70 backdrop-blur-md border border-white/20 dark:border-white/10',
    neomorphic: 'bg-light dark:bg-dark shadow-[8px_8px_16px_#d1d1d1,_-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0d1117,_-8px_-8px_16px_#313b4b]',
    solid: 'bg-white dark:bg-dark shadow-lg',
  };
  
  // Hover effect
  const hoverStyles = hoverEffect 
    ? 'hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]' 
    : '';
  
  // Combined styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`;
  
  return (
    <div className={combinedStyles}>
      {children}
    </div>
  );
};

export default Card; 