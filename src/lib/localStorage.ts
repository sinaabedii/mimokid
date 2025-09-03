// LocalStorage utilities with error handling

export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      if (typeof window === 'undefined') return defaultValue || null;
      
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue || null;
      
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage key "${key}":`, error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  exists: (key: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking localStorage key "${key}":`, error);
      return false;
    }
  }
};

// Specific storage functions for the app
export const userStorage = {
  get: () => storage.get('user'),
  set: (user: any) => storage.set('user', user),
  remove: () => storage.remove('user'),
  exists: () => storage.exists('user')
};

export const cartStorage = {
  get: () => storage.get('cart', []),
  set: (cart: any[]) => storage.set('cart', cart),
  remove: () => storage.remove('cart'),
  exists: () => storage.exists('cart')
};

export const ordersStorage = {
  get: () => storage.get('orders', []),
  set: (orders: any[]) => storage.set('orders', orders),
  remove: () => storage.remove('orders'),
  exists: () => storage.exists('orders')
};

export const artworkStorage = {
  get: () => storage.get('currentArtwork'),
  set: (artwork: any) => storage.set('currentArtwork', artwork),
  remove: () => storage.remove('currentArtwork'),
  exists: () => storage.exists('currentArtwork')
};
