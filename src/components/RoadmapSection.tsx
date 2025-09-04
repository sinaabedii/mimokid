'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Palette, ShoppingCart, CreditCard, Package } from 'lucide-react';

const steps = [
  { icon: Upload, title: 'آپلود اثر', desc: 'تصویر نقاشی یا کاردستی کودکت رو آپلود کن.' },
  { icon: Palette, title: 'سفارشی‌سازی', desc: 'محصول، رنگ و سایز رو انتخاب کن و پیش‌نمایش ببین.' },
  { icon: ShoppingCart, title: 'سبد خرید', desc: 'محصول رو به سبد اضافه کن و مشخصات تحویل رو وارد کن.' },
  { icon: CreditCard, title: 'پرداخت', desc: 'پرداخت ایمن انجام بده و کد رهگیری دریافت کن.' },
  { icon: Package, title: 'چاپ و تحویل', desc: 'سفارش چاپ میشه و به آدرس شما ارسال میشه.' }
];

const RoadmapSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-background relative overflow-hidden" id="roadmap">
      {/* soft background decorations */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-secondary/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          نقشه راه سفارش شما
        </motion.h2>

        {/* timeline line */}
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* connector dot on large screens */}
                <div className="hidden lg:block absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_0_6px_rgba(59,130,246,0.15)]" />
                </div>

                <div className="h-full rounded-2xl bg-white/70 backdrop-blur border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                        <s.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="absolute -bottom-2 -left-2 text-xs px-2 py-0.5 rounded-full bg-primary text-white shadow-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800">{s.title}</h3>
                      <p className="text-gray-600 text-sm leading-6 mt-1">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;


