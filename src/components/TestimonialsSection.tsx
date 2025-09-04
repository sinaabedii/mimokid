'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './ui/Card';
import ReviewsModal from './ReviewsModal';

const TestimonialsSection: React.FC = () => {
  const defaultTestimonials = [
    {
      id: 1,
      name: 'مریم احمدی',
      role: 'مادر سارا',
      content: 'نقاشی دخترم رو روی تی‌شرت چاپ کردیم. کیفیت فوق‌العاده بود و سارا خیلی خوشحال شد!',
      rating: 5,
      image: '/logo/logo.png',
      productImage: '/logo/logo.png'
    },
    {
      id: 2,
      name: 'علی رضایی',
      role: 'پدر علی',
      content: 'لگو‌سازی پسرم رو روی پازل چاپ کردیم. واقعاً زیبا شد و حالا توی اتاقش نگهش می‌داره.',
      rating: 5,
      image: '/logo/logo.png',
      productImage: '/logo/logo.png'
    },
    {
      id: 3,
      name: 'فاطمه محمدی',
      role: 'مادر زهرا',
      content: 'کاردستی گل دخترم رو روی لیوان چاپ کردیم. هر روز صبح با این لیوان چای می‌خوریم.',
      rating: 5,
      image: '/logo/logo.png',
      productImage: '/logo/logo.png'
    }
  ];

  const [open, setOpen] = useState(false);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const extra = JSON.parse(localStorage.getItem('reviews') || '[]');
    if (extra.length) {
      const mapped = extra.map((r: any) => ({
        id: r.id,
        name: r.name,
        role: 'کاربر میموکید',
        content: r.text,
        rating: r.rating,
        image: '/logo/logo.png',
        productImage: '/logo/logo.png'
      }));
      setTestimonials((prev: any) => [...mapped, ...prev]);
    }
  }, []);

  const onSubmitted = (r: any) => {
    setTestimonials((prev: any) => [
      {
        id: r.id,
        name: r.name,
        role: 'کاربر میموکید',
        content: r.text,
        rating: r.rating,
        image: '/logo/logo.png',
        productImage: '/logo/logo.png'
      },
      ...prev
    ]);
  };

  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-gradient-to-br from-background to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            نظر مشتریان ما
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            والدین و کودکان از تجربه کار با میموکید راضی هستند
          </p>
        </motion.div>

        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div></div>
          <button onClick={() => setOpen(true)} className="rounded-xl bg-primary text-white px-4 py-2 text-sm hover:bg-primary/90">
            ثبت نظر
          </button>
        </div>

        {/* Horizontal slider */}
        <div className="relative">
          <button
            aria-label="prev"
            onClick={() => scrollerRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
            className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow border border-gray-200 items-center justify-center hover:shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-3.5 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-1.5 sm:pb-2 no-scrollbar"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[82%] sm:min-w-[360px] snap-start"
              >
                <Card className="p-4 sm:p-6 h-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div className="mr-3">
                      <h4 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <div className="relative mb-1">
                    <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-primary/20 absolute -top-2 -right-2" />
                    <p className="text-gray-700 leading-relaxed pr-5 sm:pr-6 text-sm sm:text-base">
                      {testimonial.content}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <button
            aria-label="next"
            onClick={() => scrollerRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
            className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow border border-gray-200 items-center justify-center hover:shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <ReviewsModal open={open} onClose={() => setOpen(false)} onSubmitted={onSubmitted} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
