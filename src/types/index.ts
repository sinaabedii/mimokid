export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Artwork {
  id: string;
  name: string;
  image: string;
  childName?: string;
  uploadedAt: Date;
  userId: string;
}

export interface Product {
  id: string;
  name: string;
  type: 'tshirt' | 'mug' | 'bag' | 'puzzle';
  basePrice: number;
  colors: string[];
  sizes: string[];
  image: string;
  description: string;
}

export interface CartItem {
  id: string;
  artwork: Artwork;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingCode: string;
  createdAt: Date;
  shippingAddress: string;
  phone: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}
