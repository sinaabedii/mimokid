'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, CreditCard, MapPin, Phone, User } from 'lucide-react';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { CartItem } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCartItems([]);
      }
    }
    
    // Pre-fill user info if logged in
    if (user) {
      setUserInfo(prev => ({
        ...prev,
        name: user.name,
        phone: user.phone
      }));
    }
  }, [user]);

  const removeItem = useCallback((itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }, [cartItems]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }, [cartItems, removeItem]);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = useCallback(async () => {
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }

    if (cartItems.length === 0) {
      alert('سبد خرید شما خالی است');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderId = Date.now().toString();
      const trackingCode = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      const order = {
        id: orderId,
        userId: user?.id || 'guest',
        items: cartItems,
        totalPrice,
        status: 'pending',
        trackingCode,
        createdAt: new Date(),
        shippingAddress: userInfo.address,
        phone: userInfo.phone,
        userInfo
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart
      localStorage.removeItem('cart');
      localStorage.removeItem('currentArtwork');

      // Navigate to confirmation
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error('Error processing order:', error);
      alert('خطایی در پردازش سفارش رخ داده است');
    } finally {
      setIsProcessing(false);
    }
  }, [userInfo, cartItems, totalPrice, user?.id, router]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Progress Steps at top (step 3 active) */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span>آپلود اثر</span>
              </div>
              <div className="hidden sm:block w-24 h-0.5 bg-primary/40 rounded-full" />
              <div className="flex items-center gap-2 text-primary">
                <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
                <span className="text-primary">انتخاب محصول</span>
              </div>
              <div className="hidden sm:block w-24 h-0.5 bg-primary/40 rounded-full" />
              <div className="flex items-center gap-2 text-primary">
                <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                <span className="text-primary">پرداخت</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              سبد خرید خالی است
            </h1>
            <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">
              ابتدا محصولی را به سبد خرید اضافه کنید
            </p>
            <Button onClick={() => router.push('/products')}>
              انتخاب محصول
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Progress Steps at top (step 3 active) */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 sm:gap-10 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-primary">
              <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
              <span>آپلود اثر</span>
            </div>
            <div className="hidden sm:block w-24 h-0.5 bg-primary/40 rounded-full" />
            <div className="flex items-center gap-2 text-primary">
              <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
              <span className="text-primary">انتخاب محصول</span>
            </div>
            <div className="hidden sm:block w-24 h-0.5 bg-primary/40 rounded-full" />
            <div className="flex items-center gap-2 text-primary">
              <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <span className="text-primary">پرداخت</span>
            </div>
          </div>
        </div>
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            سبد خرید و پرداخت
          </h1>
          <p className="text-base md:text-xl text-gray-600">
            اطلاعات سفارش و پرداخت را تکمیل کن
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                سفارشات شما
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3 sm:space-x-4 space-x-reverse p-3 sm:p-4 border border-gray-200 rounded-xl"
                  >
                    <img
                      src={item.artwork.image}
                      alt={item.artwork.name}
                      className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {item.artwork.name}
                        {item.artwork.childName && ` - اثر ${item.artwork.childName}`}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        رنگ: <span style={{ color: item.selectedColor }}>●</span> | سایز: {item.selectedSize}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-sm"
                      >
                        -
                      </button>
                      <span className="w-6 sm:w-8 text-center font-semibold text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {(item.price * item.quantity).toLocaleString()} تومان
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* User Info */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-base sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  اطلاعات تحویل
                </h2>
                
                <div className="space-y-4">
                  <Input
                    label="نام و نام خانوادگی"
                    placeholder="نام کامل خود را وارد کنید"
                    value={userInfo.name}
                    onChange={(value) => setUserInfo({ ...userInfo, name: value })}
                    required
                    startIcon={<User className="w-4 h-4" />}
                  />
                  
                  <Input
                    label="شماره تماس"
                    placeholder="09123456789"
                    value={userInfo.phone}
                    onChange={(value) => setUserInfo({ ...userInfo, phone: value })}
                    type="tel"
                    required
                    startIcon={<Phone className="w-4 h-4" />}
                    dir="rtl"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      آدرس تحویل <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={userInfo.address}
                      onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                      placeholder="آدرس کامل تحویل را وارد کنید"
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Order Summary */}
              <Card className="p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  خلاصه سفارش
                </h2>
                
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {(item.price * item.quantity).toLocaleString()} تومان
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-sm sm:text-lg font-bold">
                      <span>مجموع:</span>
                      <span className="text-primary">
                        {totalPrice.toLocaleString()} تومان
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Button */}
              <Button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base py-2.5"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>در حال پردازش...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>پرداخت و ثبت سفارش</span>
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
