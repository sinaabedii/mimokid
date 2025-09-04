'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { getOrderById, getOrders } from '@/lib/storage';
import { Order } from '@/types';

const TrackPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if tracking code is provided in URL
    const code = searchParams.get('code');
    if (code) {
      setTrackingCode(code);
      handleSearch(code);
    }
  }, [searchParams]);

  const handleSearch = useCallback(async (code?: string) => {
    const searchCode = code || trackingCode;
    
    if (!searchCode.trim()) {
      setError('لطفاً کد رهگیری را وارد کنید');
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundOrder = getOrderById(searchCode);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('سفارشی با این کد رهگیری یافت نشد');
        setOrder(null);
      }
    } catch (error) {
      console.error('Error searching order:', error);
      setError('خطایی در جستجو رخ داده است');
    } finally {
      setIsSearching(false);
    }
  }, [trackingCode]);

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

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'pending':
        return 'سفارش شما دریافت شده و در انتظار پردازش است';
      case 'processing':
        return 'سفارش شما در حال چاپ و آماده‌سازی است';
      case 'shipped':
        return 'سفارش شما ارسال شده و در راه است';
      case 'delivered':
        return 'سفارش شما با موفقیت تحویل داده شده است';
      default:
        return 'وضعیت سفارش نامشخص است';
    }
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'processing':
        return 50;
      case 'shipped':
        return 75;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  const getTimelineSteps = (ord: Order) => {
    const baseDate = new Date((ord as any).createdAt);
    return [
      { status: 'pending', label: 'دریافت سفارش', date: baseDate as Date | null },
      { status: 'processing', label: 'در حال چاپ', date: ord.status === 'processing' || ord.status === 'shipped' || ord.status === 'delivered' ? new Date(baseDate.getTime() + 24 * 60 * 60 * 1000) : null },
      { status: 'shipped', label: 'ارسال شده', date: ord.status === 'shipped' || ord.status === 'delivered' ? new Date(baseDate.getTime() + 48 * 60 * 60 * 1000) : null },
      { status: 'delivered', label: 'تحویل داده شده', date: ord.status === 'delivered' ? new Date(baseDate.getTime() + 72 * 60 * 60 * 1000) : null }
    ];
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            پیگیری سفارش
          </h1>
          <p className="text-base md:text-xl text-gray-600">
            با کد رهگیری سفارش خود را پیگیری کنید
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-5 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col  gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <Input
                    label="کد رهگیری"
                    placeholder="کد رهگیری سفارش خود را وارد کنید"
                    value={trackingCode}
                    onChange={setTrackingCode}
                    error={error}
                    startIcon={<Search className="w-4 h-4" />}
                    dir="rtl"
                  />
                </div>
                <div className="flex items-end sm:items-center">
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base py-2.5"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>جستجو...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>جستجو</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Order Details */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              {/* Order Status */}
              <Card className="p-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  وضعیت سفارش
                </h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      {getStatusIcon(order.status)}
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {getStatusText(order.status)}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {getStatusDescription(order.status)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">شماره سفارش</p>
                      <p className="font-semibold">#{order.id}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>پیشرفت سفارش</span>
                      <span>{getProgressPercentage(order.status)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage(order.status)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Order Timeline */}
              <Card className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  مراحل سفارش
                </h2>
                
                <div className="space-y-4">
                  {getTimelineSteps(order).map((step, index) => {
                    const isCompleted = order.status === step.status || 
                      (step.status === 'pending') ||
                      (step.status === 'processing' && ['processing', 'shipped', 'delivered'].includes(order.status)) ||
                      (step.status === 'shipped' && ['shipped', 'delivered'].includes(order.status)) ||
                      (step.status === 'delivered' && order.status === 'delivered');

                    return (
                      <motion.div
                        key={step.status}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        className="flex items-center space-x-4 space-x-reverse"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {isCompleted ? <CheckCircle size={16} /> : <div className="w-3 h-3 rounded-full bg-current" />}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>
                            {step.label}
                          </h3>
                          {step.date && (
                            <p className="text-sm text-gray-600">
                              {new Date(step.date as any).toLocaleDateString('fa-IR')}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>

              {/* Order Items */}
              <Card className="p-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  محصولات سفارش
                </h2>
                
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl flex-wrap sm:flex-nowrap"
                    >
                      <img
                        src={item.artwork.image}
                        alt={item.artwork.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
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
                      
                      <div className="text-right sm:text-left">
                        <p className="font-semibold text-gray-800">
                          {(item.price * item.quantity).toLocaleString()} تومان
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Shipping Info */}
              <Card className="p-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  اطلاعات ارسال
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">آدرس تحویل:</h3>
                      <p className="text-gray-600">{order.shippingAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">شماره تماس:</h3>
                      <p className="text-gray-600">{order.phone}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Recent Orders */}
        {!order && !error && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                سفارشات اخیر
              </h2>
              
              <div className="space-y-4">
                {getOrders().slice(0, 3).map((recentOrder, index) => (
                  <motion.div
                    key={recentOrder.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setTrackingCode(recentOrder.trackingCode);
                      setOrder(recentOrder);
                    }}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      {getStatusIcon(recentOrder.status)}
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          سفارش #{recentOrder.id}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {getStatusText(recentOrder.status)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {recentOrder.totalPrice.toLocaleString()} تومان
                      </p>
                      <p className="text-gray-600 text-sm">
                        {recentOrder.trackingCode}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
};

const PageFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function TrackPageWrapper() {
  return (
    <Suspense fallback={<PageFallback />}>
      <TrackPage />
    </Suspense>
  );
}
