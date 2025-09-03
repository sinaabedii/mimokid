'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Package, 
  ShoppingCart, 
  Heart, 
  Settings, 
  Plus,
  Eye,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit3,
  LogOut
} from 'lucide-react';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { getOrders } from '@/lib/storage';
import { Order } from '@/types';

const DashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.id) {
      // Load user orders
      const userOrders = getOrders().filter(order => order.userId === user.id);
      setOrders(userOrders);
    }
  }, [isAuthenticated, user?.id, isLoading, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-green-600 bg-green-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'در انتظار پردازش';
      case 'processing': return 'در حال چاپ';
      case 'shipped': return 'ارسال شده';
      case 'delivered': return 'تحویل داده شده';
      default: return 'نامشخص';
    }
  };

  // Show loading only if we're still checking authentication
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

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return null; // This will trigger the redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                سلام {user.name}! 👋
              </h1>
              <p className="text-gray-600">
                به داشبورد شخصی خود خوش آمدید
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                onClick={() => router.push('/upload')}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <Plus size={20} />
                <span>سفارش جدید</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">کل سفارشات</p>
                <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">در حال پردازش</p>
                <p className="text-2xl font-bold text-gray-800">
                  {orders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">ارسال شده</p>
                <p className="text-2xl font-bold text-gray-800">
                  {orders.filter(o => o.status === 'shipped').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">تحویل داده شده</p>
                <p className="text-2xl font-bold text-gray-800">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 text-sm">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 text-sm">
                    عضو از {new Date(user.createdAt).toLocaleDateString('fa-IR')}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <Edit3 size={16} />
                  <span>ویرایش پروفایل</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  <span>خروج از حساب</span>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Orders Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">سفارشات اخیر</h2>
                <Button
                  variant="outline"
                  onClick={() => router.push('/track')}
                  className="text-sm"
                >
                  مشاهده همه
                </Button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">هنوز سفارشی ندارید</h3>
                  <p className="text-gray-500 mb-6">اولین سفارش خود را ایجاد کنید</p>
                  <Button onClick={() => router.push('/upload')}>
                    شروع سفارش
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">سفارش #{order.id}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.totalPrice.toLocaleString()} تومان
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/track?code=${order.trackingCode}`)}
                      >
                        <Eye size={16} />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
