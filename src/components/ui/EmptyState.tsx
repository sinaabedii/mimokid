'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Upload, Search } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon?: 'package' | 'cart' | 'upload' | 'search';
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon = 'package',
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  const getIcon = () => {
    const iconClass = "w-16 h-16 text-gray-300 mx-auto mb-4";
    
    switch (icon) {
      case 'cart':
        return <ShoppingCart className={iconClass} />;
      case 'upload':
        return <Upload className={iconClass} />;
      case 'search':
        return <Search className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  return (
    <motion.div
      className={`text-center py-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {getIcon()}
      
      <motion.h3
        className="text-lg font-semibold text-gray-600 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {title}
      </motion.h3>
      
      <motion.p
        className="text-gray-500 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {description}
      </motion.p>
      
      {actionText && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button onClick={onAction}>
            {actionText}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
