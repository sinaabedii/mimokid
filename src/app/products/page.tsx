'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { mockProducts } from '@/data/mockData';
import { Product, Artwork } from '@/types';

const ProductsPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    // Load artwork from localStorage
    const savedArtwork = localStorage.getItem('currentArtwork');
    if (savedArtwork) {
      try {
        const artworkData = JSON.parse(savedArtwork);
        setArtwork(artworkData);
      } catch (error) {
        console.error('Error parsing artwork data:', error);
        router.push('/upload');
      }
    } else {
      router.push('/upload');
    }
  }, [router]);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!selectedProduct || !artwork) return;
    
    setIsLoading(true);
    
    try {
      const cartItem = {
        id: Date.now().toString(),
        artwork,
        product: selectedProduct,
        selectedColor,
        selectedSize,
        quantity: 1,
        price: selectedProduct.basePrice
      };

      // Save to localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      existingCart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(existingCart));

      // Navigate to cart
      router.push('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedProduct, artwork, selectedColor, selectedSize, router]);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Progress Steps at top (step 2 active) */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm">
            <div className="flex items-center gap-2 text-primary">
              <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
              <span>آپلود اثر</span>
            </div>
            <div className="hidden sm:block w-24 h-0.5 bg-primary/40 rounded-full" />
            <div className="flex items-center gap-2 text-primary">
              <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
              <span className="text-primary">انتخاب محصول</span>
            </div>
            <div className="hidden sm:block w-24 h-0.5 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-7 h-7 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <span>پرداخت</span>
            </div>
          </div>
        </div>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            انتخاب محصول
          </h1>
          <p className="text-xl text-gray-600">
            محصول مورد نظرت رو برای چاپ اثر هنری انتخاب کن
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Artwork Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                اثر هنری شما
              </h2>
              <div className="space-y-4">
                <img
                  src={artwork.image}
                  alt={artwork.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{artwork.name}</h3>
                  {artwork.childName && (
                    <p className="text-gray-600">اثر {artwork.childName}</p>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => router.push('/upload')}
                  className="w-full"
                >
                  تغییر اثر
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Product Selection */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {mockProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card
                    hover
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      selectedProduct?.id === product.id
                        ? 'ring-2 ring-primary bg-primary/5'
                        : ''
                    }`}
                    onClick={() => handleProductSelect(product)}
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-xl mb-4"
                      />
                      {selectedProduct?.id === product.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center">
                          <Check size={16} />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {product.basePrice.toLocaleString()} تومان
                      </span>
                      <Button
                        variant={selectedProduct?.id === product.id ? 'primary' : 'outline'}
                        size="sm"
                      >
                        {selectedProduct?.id === product.id ? 'انتخاب شده' : 'انتخاب'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Customization */}
        {selectedProduct && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                سفارشی‌سازی محصول
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Color Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    انتخاب رنگ
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                          selectedColor === color
                            ? 'border-primary scale-110'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    انتخاب سایز
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  پیش‌نمایش سفارش
                </h3>
                <div className="flex items-center space-x-6 space-x-reverse">
                  <img
                    src={artwork.image}
                    alt="اثر هنری"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {selectedProduct.name}
                    </h4>
                    <p className="text-gray-600">
                      رنگ: <span style={{ color: selectedColor }}>●</span> | سایز: {selectedSize}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {selectedProduct.basePrice.toLocaleString()} تومان
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => router.push('/upload')}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <ArrowLeft size={20} />
                  <span>بازگشت</span>
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="flex items-center space-x-2 space-x-reverse"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>در حال افزودن...</span>
                    </>
                  ) : (
                    <>
                      <span>افزودن به سبد خرید</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        
      </main>
    </div>
  );
};

export default ProductsPage;
