import { Product, User, Artwork } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'مریم احمدی',
    email: 'maria@example.com',
    phone: '09123456789',
    address: 'تهران، خیابان ولیعصر، پلاک 123'
  },
  {
    id: '2',
    name: 'علی رضایی',
    email: 'ali@example.com',
    phone: '09987654321',
    address: 'اصفهان، خیابان چهارباغ، پلاک 456'
  },
  {
    id: '3',
    name: 'فاطمه محمدی',
    email: 'fateme@example.com',
    phone: '09111111111',
    address: 'شیراز، خیابان زند، پلاک 789'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'تی‌شرت کودک',
    type: 'tshirt',
    basePrice: 150000,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    description: 'تی‌شرت نخی با کیفیت بالا برای کودکان'
  },
  {
    id: '2',
    name: 'لیوان سرامیکی',
    type: 'mug',
    basePrice: 80000,
    colors: ['#FFFFFF', '#FFE4E1', '#F0F8FF', '#F5F5DC', '#FFF8DC'],
    sizes: ['350ml', '400ml'],
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400',
    description: 'لیوان سرامیکی مقاوم با قابلیت شستشو در ماشین ظرفشویی'
  },
  {
    id: '3',
    name: 'کیف پارچه‌ای',
    type: 'bag',
    basePrice: 120000,
    colors: ['#FFB6C1', '#98FB98', '#F0E68C', '#DDA0DD', '#F5DEB3'],
    sizes: ['کوچک', 'متوسط', 'بزرگ'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    description: 'کیف پارچه‌ای مقاوم و زیبا برای استفاده روزانه'
  },
  {
    id: '4',
    name: 'پازل 100 تکه',
    type: 'puzzle',
    basePrice: 100000,
    colors: ['#FFFFFF'],
    sizes: ['100 تکه', '200 تکه', '500 تکه'],
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
    description: 'پازل با کیفیت بالا و تصویر واضح'
  }
];

export const mockArtworks: Artwork[] = [
  {
    id: '1',
    name: 'نقاشی خانه',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    childName: 'سارا',
    uploadedAt: new Date('2024-01-15'),
    userId: '1'
  },
  {
    id: '2',
    name: 'لگو قلعه',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    childName: 'علی',
    uploadedAt: new Date('2024-01-20'),
    userId: '2'
  },
  {
    id: '3',
    name: 'کاردستی گل',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
    childName: 'زهرا',
    uploadedAt: new Date('2024-01-25'),
    userId: '3'
  }
];

export const steps = [
  {
    id: 1,
    title: 'آپلود اثر',
    description: 'اثر هنری کودکت رو آپلود کن',
    icon: 'upload',
    completed: false
  },
  {
    id: 2,
    title: 'انتخاب محصول',
    description: 'محصول مورد نظرت رو انتخاب کن',
    icon: 'shopping-bag',
    completed: false
  },
  {
    id: 3,
    title: 'چاپ و تحویل',
    description: 'محصولت چاپ و برات ارسال میشه',
    icon: 'truck',
    completed: false
  }
];
