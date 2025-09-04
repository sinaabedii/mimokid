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
    email: 'hadikhademi@gmail.com',
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
    image: '/images/t-shirt.png',
    description: 'تی‌شرت نخی با کیفیت بالا برای کودکان'
  },
  {
    id: '2',
    name: 'لیوان سرامیکی',
    type: 'mug',
    basePrice: 80000,
    colors: ['#FFFFFF', '#FFE4E1', '#F0F8FF', '#F5F5DC', '#FFF8DC'],
    sizes: ['350ml', '400ml'],
    image: '/images/Ceramic-mug.png',
    description: 'لیوان سرامیکی مقاوم با قابلیت شستشو در ماشین ظرفشویی'
  },
  {
    id: '3',
    name: 'کیف پارچه‌ای',
    type: 'bag',
    basePrice: 120000,
    colors: ['#FFB6C1', '#98FB98', '#F0E68C', '#DDA0DD', '#F5DEB3'],
    sizes: ['کوچک', 'متوسط', 'بزرگ'],
    image: '/images/cloth-bag.png',
    description: 'کیف پارچه‌ای مقاوم و زیبا برای استفاده روزانه'
  },
  {
    id: '4',
    name: 'پازل 100 تکه',
    type: 'puzzle',
    basePrice: 100000,
    colors: ['#FFFFFF'],
    sizes: ['100 تکه', '200 تکه', '500 تکه'],
    image: '/images/puzzle.png',
    description: 'پازل با کیفیت بالا و تصویر واضح'
  }
];

export const mockArtworks: Artwork[] = [
  {
    id: '1',
    name: 'نقاشی خانه',
    image: '/images/house-painting.png',
    childName: 'سارا',
    uploadedAt: new Date('2024-01-15'),
    userId: '1'
  },
  {
    id: '2',
    name: 'لگو قلعه',
    image: '/images/lego-piece.png',
    childName: 'علی',
    uploadedAt: new Date('2024-01-20'),
    userId: '2'
  },
  {
    id: '3',
    name: 'کاردستی گل',
    image: '/images/flower-craft.png',
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
