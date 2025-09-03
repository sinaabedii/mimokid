'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Copy, Home, Package, Truck, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Order } from '@/types';

const OrderConfirmationPage: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get order ID from URL
    const orderId = searchParams.get('orderId');

    if (orderId) {
      try {
        // Load order from localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const foundOrder = orders.find((o: Order) => o.id === orderId);
        setOrder(foundOrder);
      } catch (error) {
        console.error('Error loading order:', error);
      }
    }
    setIsLoading(false);
  }, [searchParams]);

  const copyTrackingCode = useCallback(async () => {
    if (order) {
      try {
        await navigator.clipboard.writeText(order.trackingCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  }, [order]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'processing':
        return <Package className="w-6 h-6 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-green-500" />;
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'در انتظار پردازش';
      case 'processing':
        return 'در حال چاپ';
      case 'shipped':
        return 'ارسال شده';
      case 'delivered':
        return 'تحویل داده شده';
      default:
        return 'نامشخص';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            سفارش یافت نشد
          </h1>
          <Button onClick={() => router.push('/')}>
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Success Animation */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              سفارش شما ثبت شد! 🎉
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              سفارش شما با موفقیت ثبت شد و در حال پردازش است
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="p-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  جزئیات سفارش
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">شماره سفارش:</span>
                    <span className="font-semibold">#{order.id}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">تاریخ سفارش:</span>
                    <span className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">وضعیت:</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusIcon(order.status)}
                      <span className="font-semibold">{getStatusText(order.status)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">مجموع:</span>
                    <span className="font-semibold text-primary">
                      {order.totalPrice.toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Tracking Code */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Card className="p-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  کد رهگیری
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2">کد رهگیری سفارش شما:</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-between break-words">
                      <code className="text-xl sm:text-2xl font-bold text-primary select-all break-all">
                        {order.trackingCode}
                      </code>
                      <div className="flex sm:justify-end">
                        <button
                          onClick={copyTrackingCode}
                          className="w-full sm:w-auto px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                          <span className="inline-flex items-center gap-2"><Copy size={18} /> کپی</span>
                        </button>
                      </div>
                    </div>
                    {copied && (
                      <motion.p
                        className="text-sm text-green-600 mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        کد رهگیری کپی شد!
                      </motion.p>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    با این کد می‌توانید وضعیت سفارش خود را پیگیری کنید
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Order Items */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                محصولات سفارش
              </h2>
              
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    className="flex items-center space-x-4 space-x-reverse p-4 border border-gray-200 rounded-xl"
                  >
                    <img
                      src={item.artwork.image}
                      alt={item.artwork.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.artwork.name}
                        {item.artwork.childName && ` - اثر ${item.artwork.childName}`}
                      </p>
                      <p className="text-gray-600 text-sm">
                        رنگ: <span style={{ color: item.selectedColor }}>●</span> | سایز: {item.selectedSize} | تعداد: {item.quantity}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        {(item.price * item.quantity).toLocaleString()} تومان
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Shipping Info */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                اطلاعات ارسال
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">آدرس تحویل:</h3>
                  <p className="text-gray-600">{order.shippingAddress}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">شماره تماس:</h3>
                  <p className="text-gray-600">{order.phone}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 space-x-reverse"
                size="lg"
              >
                <Home size={20} />
                <span>بازگشت به صفحه اصلی</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => router.push('/track')}
                className="flex items-center space-x-2 space-x-reverse"
                size="lg"
              >
                <Package size={20} />
                <span>پیگیری سفارش</span>
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
  );
};

const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function OrderConfirmationWrapper() {
  return (
    <Suspense fallback={<PageFallback />}>
      <OrderConfirmationPage />
    </Suspense>
  );
}
