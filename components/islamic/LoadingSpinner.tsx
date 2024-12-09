"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  const starPoints = [
    'M50,0 L61,35 L97,35 L68,57 L79,91 L50,70 L21,91 L32,57 L3,35 L39,35 Z',
  ];

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      {/* Outer rotating star */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 text-primary"
        variants={spinnerVariants}
        animate="animate"
      >
        <path d={starPoints[0]} fill="currentColor" opacity="0.2" />
      </motion.svg>

      {/* Inner counter-rotating star */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 scale-75 text-secondary"
        variants={spinnerVariants}
        animate="animate"
        style={{ rotate: 45 }}
      >
        <path d={starPoints[0]} fill="currentColor" opacity="0.4" />
      </motion.svg>

      {/* Center star */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 scale-50 text-primary"
        initial={{ scale: 0.5 }}
        animate={{
          scale: [0.5, 0.6, 0.5],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <path d={starPoints[0]} fill="currentColor" />
      </motion.svg>
    </div>
  );
};

export default LoadingSpinner;
