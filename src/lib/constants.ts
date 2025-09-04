// Application constants

export const APP_CONFIG = {
  name: 'میموکید',
  description: 'تبدیل آثار هنری کودکان به محصولات واقعی',
  version: '1.0.0',
  author: 'Memokid Team',
  url: 'https://memokid.ir',
  email: 'info@memokid.ir',
  phone: '021-12345678'
};

export const COLORS = {
  primary: '#4FD1C7',
  secondary: '#B794F6',
  accent: '#F6AD55',
  background: '#F7FAFC',
  foreground: '#2D3748',
  success: '#48BB78',
  warning: '#ED8936',
  error: '#F56565',
  info: '#4299E1'
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8
};

export const FILE_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png'],
  allowedExtensions: ['.jpg', '.jpeg', '.png']
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'در انتظار پردازش',
  [ORDER_STATUS.PROCESSING]: 'در حال چاپ',
  [ORDER_STATUS.SHIPPED]: 'ارسال شده',
  [ORDER_STATUS.DELIVERED]: 'تحویل داده شده',
  [ORDER_STATUS.CANCELLED]: 'لغو شده'
} as const;

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'text-yellow-600 bg-yellow-100',
  [ORDER_STATUS.PROCESSING]: 'text-blue-600 bg-blue-100',
  [ORDER_STATUS.SHIPPED]: 'text-green-600 bg-green-100',
  [ORDER_STATUS.DELIVERED]: 'text-green-600 bg-green-100',
  [ORDER_STATUS.CANCELLED]: 'text-red-600 bg-red-100'
} as const;

export const STORAGE_KEYS = {
  USER: 'user',
  CART: 'cart',
  ORDERS: 'orders',
  CURRENT_ARTWORK: 'currentArtwork',
  THEME: 'theme',
  LANGUAGE: 'language'
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  UPLOAD: '/upload',
  PRODUCTS: '/products',
  CART: '/cart',
  ORDER_CONFIRMATION: '/order-confirmation',
  TRACK: '/track',
  FORGOT_PASSWORD: '/forgot-password'
} as const;

export const MOCK_USERS = [
  {
    id: '1',
    name: 'هادی خادمی',
    email: 'hadikhademi@gmail.com',
    phone: '09123456789',
    password: '123456',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'مریم رضایی',
    email: 'maryam@example.com',
    phone: '09987654321',
    password: '123456',
    createdAt: new Date('2024-01-15')
  }
] as const;
