'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, User, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('ایمیل یا رمز عبور اشتباه است');
      }
    } catch (err) {
      setError('خطایی رخ داده است. لطفاً دوباره تلاش کنید');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background to-white">
      {/* Animated minimal background */}
      <motion.div
        className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-primary/15 blur-3xl"
        animate={{ y: [0, 10, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-10 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-secondary/15 blur-3xl"
        animate={{ y: [0, -12, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity, delay: 1 }}
      />

      <main className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <motion.button
                onClick={() => router.push('/')}
                aria-label="بازگشت به صفحه اصلی"
                className="relative w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 transition"
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
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                ورود به حساب کاربری
              </motion.h1>
              
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                خوش آمدید! وارد حساب کاربری خود شوید
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  error={error && !email ? 'ایمیل الزامی است' : ''}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    رمز عبور <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="رمز عبور خود را وارد کنید"
                      required
                      className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ${
                        error && !password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {error && !password && (
                    <p className="text-red-500 text-sm">رمز عبور الزامی است</p>
                  )}
                </div>
              </motion.div>

              {error && email && password && (
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
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <button
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  فراموشی رمز عبور؟
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>در حال ورود...</span>
                    </>
                  ) : (
                    <>
                      <span>ورود</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className="text-gray-600 text-sm">
                حساب کاربری ندارید؟{' '}
                <button
                  onClick={() => router.push('/register')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  ثبت نام کنید
                </button>
              </p>
            </motion.div>

            {/* Demo Credentials */}
            <motion.div
              className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h3 className="font-semibold text-primary mb-2 text-sm">اطلاعات تست:</h3>
              <div className="text-xs text-gray-700 space-y-1">
                <p><strong>ایمیل:</strong> ali@example.com</p>
                <p><strong>رمز عبور:</strong> 123456</p>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;
