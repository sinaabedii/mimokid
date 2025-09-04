import { User, Artwork, Product, CartItem, Order } from '@/types';

// Safe localStorage shim for SSR/Build time
const localStorage = (typeof window !== 'undefined' && window.localStorage)
  ? window.localStorage
  : {
      getItem: (_key: string) => null as any,
      setItem: (_key: string, _value: string) => {},
      removeItem: (_key: string) => {}
    } as any;

// User Management
export const saveUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

// Artwork Management
export const saveArtwork = (artwork: Artwork): void => {
  const artworks = getArtworks();
  artworks.push(artwork);
  localStorage.setItem('artworks', JSON.stringify(artworks));
};

export const getArtworks = (): Artwork[] => {
  const artworks = localStorage.getItem('artworks');
  return artworks ? JSON.parse(artworks) : [];
};

export const getArtworkById = (id: string): Artwork | null => {
  const artworks = getArtworks();
  return artworks.find(artwork => artwork.id === id) || null;
};

// Cart Management
export const addToCart = (item: CartItem): void => {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const removeFromCart = (itemId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const updateCartItemQuantity = (itemId: string, quantity: number): void => {
  const cart = getCart();
  const updatedCart = cart.map(item =>
    item.id === itemId ? { ...item, quantity } : item
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const clearCart = (): void => {
  localStorage.removeItem('cart');
};

// Order Management
export const saveOrder = (order: Order): void => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
};

export const getOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

export const getOrderById = (id: string): Order | null => {
  const orders = getOrders();
  return orders.find(order => order.id === id) || null;
};

export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  const orders = getOrders();
  const updatedOrders = orders.map(order =>
    order.id === orderId ? { ...order, status } : order
  );
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
};

// Mock Data Initialization
export const initializeMockData = (): void => {
  // Initialize mock users if not exists
  if (!localStorage.getItem('mockUsers')) {
    const mockUsers = [
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
    localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  }

  // Initialize mock artworks if not exists
  if (!localStorage.getItem('artworks')) {
    const mockArtworks = [
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
    localStorage.setItem('artworks', JSON.stringify(mockArtworks));
  }

  // Initialize mock orders if not exists
  if (!localStorage.getItem('orders')) {
    const mockOrders = [
      {
        id: 'ORD001',
        userId: '1',
        items: [],
        totalPrice: 150000,
        status: 'delivered',
        trackingCode: 'TRK001',
        createdAt: new Date('2024-01-10'),
        shippingAddress: 'تهران، خیابان ولیعصر، پلاک 123',
        phone: '09123456789'
      },
      {
        id: 'ORD002',
        userId: '2',
        items: [],
        totalPrice: 100000,
        status: 'shipped',
        trackingCode: 'TRK002',
        createdAt: new Date('2024-01-15'),
        shippingAddress: 'اصفهان، خیابان چهارباغ، پلاک 456',
        phone: '09987654321'
      }
    ];
    localStorage.setItem('orders', JSON.stringify(mockOrders));
  }
};

// Utility Functions
export const formatPrice = (price: number): string => {
  return price.toLocaleString('fa-IR') + ' تومان';
};

export const generateTrackingCode = (): string => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const generateOrderId = (): string => {
  return 'ORD' + Date.now().toString().slice(-6);
};
