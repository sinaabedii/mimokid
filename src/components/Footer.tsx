'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, MessageCircle, Twitter } from 'lucide-react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'تماس با ما', href: '#contact' },
      { name: 'قوانین و مقررات', href: '#terms' },
      { name: 'حریم خصوصی', href: '#privacy' }
    ],
    products: [
      { name: 'تی‌شرت', href: '#tshirt' },
      { name: 'لیوان', href: '#mug' },
      { name: 'کیف', href: '#bag' },
      { name: 'پازل', href: '#puzzle' }
    ],
    support: [
      { name: 'راهنمای استفاده', href: '#guide' },
      { name: 'سوالات متداول', href: '#faq' },
      { name: 'پشتیبانی', href: '#support' },
      { name: 'وضعیت سفارش', href: '#track' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'اینستاگرام' },
    { icon: MessageCircle, href: '#', label: 'تلگرام' },
    { icon: Twitter, href: '#', label: 'توییتر' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              
              <span className="text-xl font-bold brand-signature">میموکید</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              پلتفرمی برای تبدیل آثار هنری کودکان به محصولات واقعی و منحصر به فرد.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">شرکت</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">محصولات</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">تماس با ما</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-gray-400">info@memokid.ir</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-gray-400">021-12345678</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-gray-400">تهران، ایران</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} میموکید. تمامی حقوق محفوظ است.
          </p>
          <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
            {footerLinks.support.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
