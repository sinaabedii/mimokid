'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

const UploadPage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [artworkName, setArtworkName] = useState('');
  const [childName, setChildName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const removeFile = useCallback(() => {
    setUploadedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
  }, [previewUrl]);

  const handleContinue = useCallback(async () => {
    if (!uploadedFile) return;
    
    setIsLoading(true);
    
    try {
      // Save to localStorage
      const artworkData = {
        id: Date.now().toString(),
        name: artworkName || 'اثر هنری',
        image: previewUrl,
        childName: childName || undefined,
        uploadedAt: new Date(),
        userId: user?.id || 'guest'
      };
      
      localStorage.setItem('currentArtwork', JSON.stringify(artworkData));
      
      // Navigate to product selection
      router.push('/products');
    } catch (error) {
      console.error('Error saving artwork:', error);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedFile, artworkName, childName, previewUrl, user?.id, router]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Progress Steps moved to top */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm">
            <div className="flex items-center gap-2 text-primary">
              <div className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">✓</div>
              <span>آپلود اثر</span>
            </div>
            <div className="hidden sm:block w-24 h-0.5 bg-primary/40 rounded-full" />
            <div className="flex items-center gap-2 text-primary">
              <div className="w-7 h-7 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-semibold">2</div>
              <span className="text-primary">انتخاب محصول</span>
            </div>
            <div className="hidden sm:block w-24 h-0.5 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-7 h-7 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
              <span>پرداخت</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            آپلود اثر هنری کودکت
          </h1>
          <p className="text-xl text-gray-600">
            تصویر نقاشی، لگو یا کاردستی کودکت رو آپلود کن
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                انتخاب تصویر
              </h2>
              
              {!uploadedFile ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        {isDragActive ? 'فایل رو اینجا رها کن' : 'فایل رو اینجا بکش یا کلیک کن'}
                      </p>
                      <p className="text-gray-600">
                        فرمت‌های مجاز: JPG, PNG (حداکثر 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="پیش‌نمایش"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      onClick={removeFile}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                    <ImageIcon size={16} />
                    <span>{uploadedFile.name}</span>
                    <span>•</span>
                    <span>{(uploadedFile.size / 1024 / 1024).toFixed(1)} MB</span>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                اطلاعات اثر
              </h2>
              
              <div className="space-y-6">
                <Input
                  label="نام اثر (اختیاری)"
                  placeholder="مثل: نقاشی خانه، لگو قلعه"
                  value={artworkName}
                  onChange={setArtworkName}
                />
                
                <Input
                  label="نام کودک (اختیاری)"
                  placeholder="نام کودکت رو بنویس"
                  value={childName}
                  onChange={setChildName}
                />
                
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <h3 className="font-semibold text-primary mb-2">نکات مهم:</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• تصویر باید واضح و با کیفیت باشد</li>
                    <li>• پس‌زمینه سفید یا روشن بهتر است</li>
                    <li>• فرمت JPG یا PNG قابل قبول است</li>
                    <li>• حداکثر حجم فایل 5 مگابایت</li>
                  </ul>
                </div>
                
                <Button
                  onClick={handleContinue}
                  disabled={!uploadedFile || isLoading}
                  className="w-full flex items-center justify-center space-x-2 space-x-reverse"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>در حال پردازش...</span>
                    </>
                  ) : (
                    <>
                      <span>ادامه و انتخاب محصول</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        
      </main>
    </div>
  );
};

export default UploadPage;
