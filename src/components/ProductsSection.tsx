'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { mockProducts } from '@/data/mockData';
import Card from './ui/Card';
import Button from './ui/Button';

const ProductsSection: React.FC = () => {
  return (
    <section id="products" className="py-10 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2.5 sm:mb-4">
            محصولات ما
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            آثار هنری کودکت رو روی محصولات مختلف چاپ می‌کنیم
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {mockProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 sm:h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">
                      {product.basePrice.toLocaleString()} تومان
                    </span>
                  </div>
                </div>
                
                <div className="p-3.5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-base sm:text-xl font-semibold text-gray-800 mb-1.5">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm flex-1">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {product.colors.slice(0, 4).map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-600">
                          +{product.colors.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => window.location.href = '/upload'}
                    className="w-full text-sm sm:text-base py-2.5"
                  >
                    انتخاب کن
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button variant="outline" size="lg">
            مشاهده همه محصولات
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
