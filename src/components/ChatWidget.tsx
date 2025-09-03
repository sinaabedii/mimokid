'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Smile, Trash2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const starterHints = [
  'چطور اثر رو آپلود کنم؟',
  'چه محصولاتی دارین؟',
  'هزینه چاپ چقدره؟',
  'زمان ارسال چقدره؟'
];

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('memokid_chat');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('memokid_chat', JSON.stringify(messages));
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const mockReply = (text: string) => {
    // very simple heuristic for demo
    const t = text.toLowerCase();
    if (t.includes('آپلود') || t.includes('upload')) {
      return 'برای آپلود به صفحه "آپلود اثر" برو و تصویرت رو بکش و بنداز داخل کادر. حجم حداکثر ۵ مگابایت و فرمت JPG/PNG.';
    }
    if (t.includes('محصول')) {
      return 'در حال حاضر تی‌شرت، لیوان سرامیکی، کیف پارچه‌ای و پازل داریم. به زودی محصولات بیشتری اضافه می‌شود.';
    }
    if (t.includes('قیمت') || t.includes('هزینه')) {
      return 'قیمت پایه تی‌شرت از ۴۹۰ هزار تومان، لیوان از ۲۲۰ هزار تومان و کیف از ۳۵۰ هزار تومان شروع می‌شود.';
    }
    if (t.includes('ارسال') || t.includes('زمان')) {
      return 'زمان آماده‌سازی و ارسال معمولاً ۳ تا ۵ روز کاری است. کد رهگیری بعد از ثبت سفارش ارائه می‌شود.';
    }
    return 'سؤال خوبی بود! برای راهنمایی بیشتر می‌توانی به بخش نحوه کار مراجعه کنی یا دقیق‌تر بپرسی تا راهنمایی‌ات کنم.';
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = { id: Date.now() + '_u', role: 'user', content: text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const reply: ChatMessage = { id: Date.now() + '_a', role: 'assistant', content: mockReply(text), timestamp: Date.now() };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 700);
  };

  const emojis = ['😀','😁','😂','🤣','😊','😍','😘','🤩','🤗','🤔','😎','😇','😅','🙌','👍','👎','👏','🫶','✨','💡','❤️','💛','💙','🔥','🎉','✅','❓','❗','🧩','👕','☕','👜','🖼️'];

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative mb-3 w-[90vw] max-w-sm sm:max-w-md bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* animated minimal background */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-10 -left-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl"
              animate={{ x: [0, 8, -6, 0], y: [0, -6, 4, 0], opacity: [0.6, 0.8, 0.7, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-16 w-56 h-56 rounded-full bg-secondary/10 blur-3xl"
              animate={{ x: [0, -10, 6, 0], y: [0, 6, -4, 0], opacity: [0.5, 0.75, 0.65, 0.5] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="font-semibold text-gray-800">دستیار <span className="brand-signature">میموکید</span></div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button aria-label="پاک کردن گفتگو" onClick={() => setMessages([])} className="text-gray-500 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                )}
                <button aria-label="بستن" onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700"><X size={18} /></button>
              </div>
            </div>
            <div className="h-64 sm:h-72 overflow-y-auto px-4 py-3 space-y-2">
              {messages.length === 0 && (
                <div className="text-sm text-gray-600">
                  سلام! من اینجام تا راهنماییت کنم. می‌تونی یکی از این موارد رو انتخاب کنی:
                  <div className="mt-2 flex flex-wrap gap-2">
                    {starterHints.map((h) => (
                      <button key={h} onClick={() => setInput(h)} className="text-xs px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">{h}</button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 shadow-sm ${m.role === 'user' ? 'bg-primary text-white rounded-br-sm' : 'bg-white/80 backdrop-blur border border-gray-100 text-gray-800 rounded-bl-sm'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-2xl px-3 py-2 text-sm leading-6 bg-white/80 backdrop-blur border border-gray-100 text-gray-800 rounded-bl-sm">
                    <span className="inline-flex items-center gap-1">
                      در حال نوشتن
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                      </span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
            <div className="border-t border-gray-100 p-3 bg-white/70 backdrop-blur">
              <div className="relative flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="سؤال خودت را بنویس..."
                  className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white/90"
                />
                <div className="relative">
                  <button aria-label="ایموجی" onClick={() => setShowEmoji((v) => !v)} className="rounded-xl p-2 text-gray-600 hover:bg-gray-100">
                    <Smile size={18} />
                  </button>
                  <AnimatePresence>
                    {showEmoji && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-10 left-0 z-10 w-56 sm:w-64 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg p-2 grid grid-cols-8 gap-1"
                        role="menu"
                      >
                        {emojis.map((e) => (
                          <button
                            key={e}
                            onClick={() => { setInput((prev) => prev + e); setShowEmoji(false); }}
                            className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100 text-lg"
                            aria-label={`emoji ${e}`}
                          >
                            {e}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button onClick={sendMessage} className="rounded-xl bg-primary text-white p-2 hover:bg-primary/90 shadow-md shadow-primary/20"><Send size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 blur-2xl rounded-full bg-primary/20 scale-0 group-hover:scale-100 transition-transform" />
        <button onClick={() => setOpen((v) => !v)} className="group rounded-full bg-primary text-white p-3 shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40">
          {open ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;


