"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface GeometricPatternProps {
  className?: string;
  pattern?: 'star8' | 'arabesque';
  animate?: boolean;
  color?: string;
}

const GeometricPattern: React.FC<GeometricPatternProps> = ({
  className = '',
  pattern = 'star8',
  animate = true,
  color = 'currentColor',
}) => {
  // SVG patterns
  const patterns = {
    star8: (
      <pattern
        id="star8Pattern"
        x="0"
        y="0"
        width="100"
        height="100"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M50 0l12.5 37.5L100 50l-37.5 12.5L50 100l-12.5-37.5L0 50l37.5-12.5z"
          fill={color}
          fillOpacity="0.1"
        />
      </pattern>
    ),
    arabesque: (
      <pattern
        id="arabesquePattern"
        x="0"
        y="0"
        width="120"
        height="120"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M60 0c33.137 0 60 26.863 60 60s-26.863 60-60 60S0 93.137 0 60 26.863 0 60 0zm0 10c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50z"
          fill={color}
          fillOpacity="0.1"
        />
      </pattern>
    ),
  };

  // Animation variants
  const containerVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 60,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      animate={animate ? 'animate' : undefined}
      variants={containerVariants}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>{patterns[pattern]}</defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${pattern}Pattern)`}
        />
      </svg>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background opacity-50" />
    </motion.div>
  );
};

export default GeometricPattern;
