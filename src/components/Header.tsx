'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Menu, X, User, ShoppingCart, LogOut, HelpCircle, ShoppingBag, Info, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { useClickOutside } from '@/hooks/useClickOutside';
import ConfirmDialog from './ui/ConfirmDialog';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useClickOutside<HTMLDivElement>(() => setIsUserMenuOpen(false));
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { name: 'چطور کار می‌کنه؟', href: '#how-it-works' },
    { name: 'محصولات', href: '#products' },
    { name: 'درباره ما', href: '#about' },
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 w-full">
        <div className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm border border-gray-100 rounded-xl lg:rounded-2xl px-3 sm:px-4">
          <div className="grid grid-cols-12 items-center h-16 md:h-18 gap-3">
          {/* Logo */}
          <motion.button
            onClick={() => router.push('/')}
            className="col-span-6 md:col-span-3 flex items-center  group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="لوگو میموکید"
          >
            <div className="relative w-20 h-20 flex items-center transition-all">
              <Image
                src="/logo/logo.png"
                alt="ميموكيد"
                width={96}
                height={96}
                quality={100}
                className="object-contain"
                priority
              />
            </div>
            <motion.span className="text-lg sm:text-2xl font-bold leading-none brand-signature py-3">میموکید</motion.span>
          </motion.button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex md:col-span-6 items-center justify-center gap-6 xl:gap-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors duration-300 text-sm xl:text-base"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:col-span-3 items-center justify-end gap-3 xl:gap-4">
          <motion.button
              onClick={() => router.push('/cart')}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 text-sm xl:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={18} className="xl:w-5 xl:h-5" />
              <span className="hidden xl:inline">سبد خرید</span>
            </motion.button>
            {isAuthenticated ? (
              <>
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors duration-300 text-sm xl:text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-haspopup="menu"
                    aria-expanded={isUserMenuOpen}
                  >
                    <User size={18} className="xl:w-5 xl:h-5" />
                    <span className="hidden sm:inline font-medium max-w-[10rem] truncate">{user?.name}</span>
                  </motion.button>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50"
                      role="menu"
                    >
                      <button
                        onClick={() => { setIsUserMenuOpen(false); router.push('/dashboard'); }}
                        className="w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                        role="menuitem"
                      >
                        <User size={16} /> داشبورد
                      </button>
                      <button
                        onClick={() => { setIsUserMenuOpen(false); setShowLogoutConfirm(true); }}
                        className="w-full text-right px-4 py-2.5 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                        role="menuitem"
                      >
                        <LogOut size={16} /> خروج
                      </button>
                    </motion.div>
                  )}
                </div>
                <ConfirmDialog
                  open={showLogoutConfirm}
                  title="خروج از حساب"
                  description="آیا مطمئن هستید که می‌خواهید خارج شوید؟"
                  confirmText="خروج"
                  cancelText="انصراف"
                  onConfirm={() => { setShowLogoutConfirm(false); logout(); }}
                  onCancel={() => setShowLogoutConfirm(false)}
                />
              </>
            ) : (
              <motion.button
                onClick={() => router.push('/login')}
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 text-sm xl:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={18} className="xl:w-5 xl:h-5" />
                <span className="hidden xl:inline">ورود</span>
              </motion.button>
            )}
           
          </div>

          {/* Mobile Menu Button */}
          <button
            className="col-span-6 md:hidden justify-self-end p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="mt-3 rounded-2xl border border-gray-100 bg-white/90 backdrop-blur p-3 shadow-sm">
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2 text-gray-700">
                      {item.name === 'چطور کار می‌کنه؟' && <HelpCircle size={18} className="text-primary" />}
                      {item.name === 'محصولات' && <ShoppingBag size={18} className="text-primary" />}
                      {item.name === 'درباره ما' && <Info size={18} className="text-primary" />}
                      <span className="text-sm font-medium">{item.name}</span>
                    </span>
                    <ChevronLeft size={18} className="text-gray-400" />
                  </a>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => router.push('/dashboard')}
                      className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-gray-50 active:bg-gray-100"
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <User size={18} className="text-primary" />
                        <span className="text-sm font-medium">داشبورد</span>
                      </span>
                      <ChevronLeft size={18} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={() => router.push('/cart')}
                      className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-gray-50 active:bg-gray-100"
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ShoppingCart size={18} className="text-primary" />
                        <span className="text-sm font-medium">سبد خرید</span>
                      </span>
                      <ChevronLeft size={18} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={logout}
                      className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-red-50 active:bg-red-100"
                    >
                      <span className="flex items-center gap-2 text-red-600">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">خروج</span>
                      </span>
                      <ChevronLeft size={18} className="text-red-300" />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => router.push('/login')}
                      className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-gray-50 active:bg-gray-100"
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <User size={18} className="text-primary" />
                        <span className="text-sm font-medium">ورود</span>
                      </span>
                      <ChevronLeft size={18} className="text-gray-400" />
                    </button>
                    <button 
                      onClick={() => router.push('/cart')}
                      className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-gray-50 active:bg-gray-100"
                    >
                      <span className="flex items-center gap-2 text-gray-700">
                        <ShoppingCart size={18} className="text-primary" />
                        <span className="text-sm font-medium">سبد خرید</span>
                      </span>
                      <ChevronLeft size={18} className="text-gray-400" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </header>
    {/* Spacer to prevent layout shift due to fixed header */}
    <div className="h-20 md:h-24" />
    </>
  );
};

export default Header;
