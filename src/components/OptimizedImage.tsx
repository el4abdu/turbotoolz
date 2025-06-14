"use client";

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  showLoadingEffect?: boolean;
  className?: string;
  imgClassName?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
  showLoadingEffect = true,
  priority = false,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showLoadingEffect && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover ${imgClassName}`}
          onLoadingComplete={() => setIsLoaded(true)}
          priority={priority}
          {...rest}
        />
      </motion.div>
    </div>
  );
};

export default OptimizedImage; 