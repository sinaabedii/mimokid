'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background to-white">
        {/* Animated minimal background */}
        <motion.div
          className="pointer-events-none absolute -top-24 -right-20 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-primary/15 blur-3xl"
          animate={{ y: [0, 12, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-secondary/15 blur-3xl"
          animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />

        <main className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-5 sm:p-8 text-center">
              <motion.div
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              
              <motion.h1
                className="text-xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                ایمیل ارسال شد!
              </motion.h1>
              
              <motion.p
                className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                لینک بازیابی رمز عبور به ایمیل شما ارسال شد. 
                لطفاً صندوق ورودی خود را بررسی کنید.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Button
                  onClick={() => router.push('/login')}
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base py-2.5"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>بازگشت به ورود</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full text-sm sm:text-base py-2.5"
                >
                  ارسال مجدد ایمیل
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background to-white">
      {/* Animated minimal background */}
      <motion.div
        className="pointer-events-none absolute -top-24 -right-20 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-accent/15 blur-3xl"
        animate={{ y: [0, 12, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl"
        animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      <main className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-5 sm:p-8">
            <div className="text-center mb-8">
              <motion.button
                onClick={() => router.push('/')}
                aria-label="بازگشت به صفحه اصلی"
                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden mx-auto mb-4 transition"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src="/logo/logo.png"
                  alt="ميموكيد"
                  width={128}
                  height={128}
                  quality={100}
                  className="object-contain"
                  priority
                />
              </motion.button>
              
              <motion.h1
                className="text-xl sm:text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                فراموشی رمز عبور
              </motion.h1>
              
              <motion.p
                className="text-gray-600 text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                ایمیل خود را وارد کنید تا لینک بازیابی ارسال شود
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Input
                  label="ایمیل"
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  value={email}
                  onChange={setEmail}
                  required
                  startIcon={<Mail className="w-4 h-4" />}
                  error={error && !email ? 'ایمیل الزامی است' : ''}
                />
              </motion.div>

              {error && email && (
                <motion.div
                  className="bg-red-50 border border-red-200 rounded-xl p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base py-2.5"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>در حال ارسال...</span>
                    </>
                  ) : (
                    <>
                      <span>ارسال لینک بازیابی</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-gray-600 text-sm">
                رمز عبور خود را به یاد آوردید؟{' '}
                <button
                  onClick={() => router.push('/login')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  وارد شوید
                </button>
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
