'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = 'آیا مطمئن هستید؟',
  description = 'با تأیید، عملیات ادامه می‌یابد.',
  confirmText = 'تأیید',
  cancelText = 'انصراف',
  onConfirm,
  onCancel,
}) => {
  // Portal to body to avoid transformed ancestors (e.g., animated header) affecting centering
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/35" onClick={onCancel} />
          <motion.div
            className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6"
            initial={{ scale: 0.96, y: 0, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            style={{ transform: 'translateZ(0)' }}
          >
            <h3 id="confirm-title" className="text-lg font-semibold text-gray-800 mb-2 text-right">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mb-5 text-right">
              {description}
            </p>
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-red-600 text-white px-4 py-2.5 text-sm hover:bg-red-500"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmDialog;


