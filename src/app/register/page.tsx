'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, UserPlus, User, Mail, Phone, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        setError('نام الزامی است');
        return false;
      }
      if (!formData.email.trim()) {
        setError('ایمیل الزامی است');
        return false;
      }
      if (!formData.phone.trim()) {
        setError('شماره تماس الزامی است');
        return false;
      }
      return true;
    }
    if (currentStep === 2) {
      if (formData.password.length < 6) {
        setError('رمز عبور باید حداقل 6 کاراکتر باشد');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('رمز عبور و تکرار آن یکسان نیستند');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(1) || !validateStep(2)) return;
    
    setError('');
    setIsLoading(true);

    try {
      const success = await register(formData.name, formData.email, formData.phone, formData.password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('خطایی در ثبت نام رخ داده است');
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
        className="pointer-events-none absolute -top-24 -right-20 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-secondary/15 blur-3xl"
        animate={{ y: [0, 14, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent/15 blur-3xl"
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
                ایجاد حساب کاربری
              </motion.h1>
              
              <motion.p
                className="text-gray-600 text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                حساب کاربری جدید ایجاد کنید
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4.5 sm:space-y-5">
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-3 mb-2 text-sm">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>1</div>
                <div className="w-10 h-0.5 bg-gray-300" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}>2</div>
              </div>

              {step === 1 && (
                <>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <Input label="نام و نام خانوادگی" placeholder="نام کامل خود را وارد کنید" value={formData.name} onChange={(v) => handleInputChange('name', v)} required startIcon={<User className="w-4 h-4" />} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
                    <Input label="ایمیل" type="email" placeholder="ایمیل خود را وارد کنید" value={formData.email} onChange={(v) => handleInputChange('email', v)} required startIcon={<Mail className="w-4 h-4" />} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                    <Input label="شماره تماس" type="tel" placeholder="09123456789" value={formData.phone} onChange={(v) => handleInputChange('phone', v)} required startIcon={<Phone className="w-4 h-4" />} dir="rtl" />
                  </motion.div>
                  <div className="pt-2">
                    <Button type="button" onClick={() => { if (validateStep(1)) { setStep(2); } }} className="w-full">ادامه</Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">رمز عبور <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} placeholder="رمز عبور خود را وارد کنید" required className="w-full px-3.5 py-2.5 pr-11 sm:px-4 sm:py-3 sm:pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">تکرار رمز عبور <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} placeholder="رمز عبور را مجدداً وارد کنید" required className="w-full px-3.5 py-2.5 pr-11 sm:px-4 sm:py-3 sm:pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex gap-2.5 pt-2">
                    <Button type="button" variant="outline" className="w-1/3 py-2.5" onClick={() => setStep(1)}>قبلی</Button>
                    <Button type="submit" disabled={isLoading} className="w-2/3 py-2.5 text-sm sm:text-base">{isLoading ? 'در حال ثبت نام...' : 'ایجاد حساب'}</Button>
                  </div>
                </>
              )}

              {error && (
                <motion.div
                  className="bg-red-50 border border-red-200 rounded-xl p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </motion.div>
              )}
            </form>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <p className="text-gray-600 text-sm">
                قبلاً حساب کاربری دارید؟{' '}
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

export default RegisterPage;
