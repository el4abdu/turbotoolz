import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  as?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  disabled = false,
  type = 'button',
  as: Component,
}) => {
  // Base styles
  const baseStyles = 'relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary/90 text-white focus:ring-primary/50 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40',
    secondary: 'bg-secondary hover:bg-secondary/90 text-white focus:ring-secondary/50 shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40',
    accent: 'bg-accent hover:bg-accent/90 text-white focus:ring-accent/50 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:ring-gray-400',
    custom: '', // Empty string for custom styling via className
  };
  
  // Disabled styles
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : '';
  
  // Full width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combined styles
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variant !== 'custom' ? variantStyles[variant] : ''} ${widthStyle} ${disabledStyles} ${className}`;
  
  // Render with custom component if provided
  if (Component) {
    return (
      <Component
        href={href}
        className={combinedStyles}
        onClick={onClick}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 rounded-xl overflow-hidden">
          <span className="absolute inset-0 transform translate-y-full bg-white/10 transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
        </span>
      </Component>
    );
  }
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link 
        href={href} 
        className={combinedStyles}
        onClick={onClick}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 rounded-xl overflow-hidden">
          <span className="absolute inset-0 transform translate-y-full bg-white/10 transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
        </span>
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button 
      type={type} 
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 rounded-xl overflow-hidden">
        <span className="absolute inset-0 transform translate-y-full bg-white/10 transition-transform duration-300 ease-in-out hover:translate-y-0"></span>
      </span>
    </button>
  );
};

export default Button; 