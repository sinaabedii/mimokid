'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  createdAt: number;
}

interface ReviewsModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitted: (r: Review) => void;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ open, onClose, onSubmitted }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        name: name.trim(),
        text: text.trim(),
        rating,
        createdAt: Date.now()
      };
      // store mock
      const existing = JSON.parse(localStorage.getItem('reviews') || '[]');
      existing.unshift(review);
      localStorage.setItem('reviews', JSON.stringify(existing));
      onSubmitted(review);
      setSubmitting(false);
      onClose();
      setName(''); setText(''); setRating(5);
    }, 600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/35" onClick={onClose} />
          <motion.div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6" initial={{ scale: 0.96, y: 0, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.96, y: 0, opacity: 0 }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-right">ثبت نظر</h3>
            <div className="space-y-3">
              <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="نام شما" className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="نظر شما (بدون تصویر)" rows={4} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">امتیاز:</label>
                <select value={rating} onChange={(e)=>setRating(Number(e.target.value))} className="rounded-lg border border-gray-200 px-2 py-1 text-sm">
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">انصراف</button>
                <button onClick={submit} disabled={submitting} className="flex-1 rounded-xl bg-primary text-white px-4 py-2 text-sm hover:bg-primary/90 disabled:opacity-70">
                  {submitting ? 'در حال ثبت...' : 'ثبت نظر'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewsModal;


