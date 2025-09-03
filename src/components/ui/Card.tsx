'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick
}) => {
  const baseClasses = 'bg-white rounded-2xl shadow-md border border-gray-100';
  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
