'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

const Error: React.FC<ErrorProps> = ({ 
  title = 'خطایی رخ داده است',
  message = 'لطفاً دوباره تلاش کنید',
  onRetry,
  retryText = 'تلاش مجدد',
  className = ''
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center text-center p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <AlertCircle className="w-8 h-8 text-red-600" />
      </motion.div>
      
      <motion.h2
        className="text-xl font-semibold text-gray-800 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      
      <motion.p
        className="text-gray-600 mb-6 max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {message}
      </motion.p>
      
      {onRetry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
          >
            <RefreshCw size={16} />
            <span>{retryText}</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Error;
