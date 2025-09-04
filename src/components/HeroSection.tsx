'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Palette, Truck } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

const HeroSection: React.FC = () => {
  const steps = [
    {
      icon: Upload,
      title: 'آپلود اثر',
      description: 'اثر هنری کودکت رو آپلود کن'
    },
    {
      icon: Palette,
      title: 'انتخاب محصول',
      description: 'محصول مورد نظرت رو انتخاب کن'
    },
    {
      icon: Truck,
      title: 'چاپ و تحویل',
      description: 'محصولت چاپ و برات ارسال میشه'
    }
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-background to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            className="space-y-6 lg:space-y-8 text-center lg:text-right"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              <motion.h1
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                از دست‌های کوچک برای{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  دنیای بزرگ
                </span>
              </motion.h1>
              <motion.p
                className="text-sm sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                آثار هنری کودکانت رو به محصولات واقعی تبدیل کن. 
                تی‌شرت، لیوان، کیف و پازل با طرح‌های منحصر به فرد کودکت.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                onClick={() => window.location.href = '/upload'}
                size="lg" 
                className="text-sm sm:text-lg px-5 sm:px-8 py-2.5 sm:py-4 w-full sm:w-auto"
              >
                <span className="hidden sm:inline">شروع کن | آپلود اثر</span>
                <span className="sm:hidden">شروع کن</span>
              </Button>
              <Button 
                onClick={() => window.location.href = '#products'}
                variant="outline" 
                size="lg" 
                className="text-sm sm:text-lg px-5 sm:px-8 py-2.5 sm:py-4 w-full sm:w-auto"
              >
                <span className="hidden sm:inline">ببین چطور کار می‌کنه</span>
                <span className="sm:hidden">نحوه کار</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative order-first lg:order-last"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <img
                src="/images/hero.jpg"
                alt="کودک در حال نقاشی"
                className="w-full h-56 sm:h-80 lg:h-96 object-cover rounded-2xl lg:rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl lg:rounded-3xl"></div>
            </div>
            
            {/* Floating Cards */}
            <motion.div
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Card className="p-2.5 sm:p-4 bg-white shadow-lg">
                <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
                  <div className="w-7 h-7 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Palette className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-xs sm:text-base">نقاشی سارا</p>
                    <p className="text-[11px] sm:text-sm text-gray-600">روی تی‌شرت</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Card className="p-2.5 sm:p-4 bg-white shadow-lg">
                <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
                  <div className="w-7 h-7 sm:w-12 sm:h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 sm:w-6 sm:h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-xs sm:text-base">ارسال شد</p>
                    <p className="text-[11px] sm:text-sm text-gray-600">کد رهگیری: 12345</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Steps */}
        <motion.div
          className="mt-10 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
