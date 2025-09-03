import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "میموکید - تبدیل آثار هنری کودکان به محصولات واقعی",
  description: "آثار هنری کودکانت رو به محصولات چاپی شخصی‌سازی‌شده تبدیل کن. تی‌شرت، لیوان، کیف و پازل با طرح‌های منحصر به فرد کودکت.",
  keywords: "چاپ نقاشی کودک، تی‌شرت کودک، لیوان کودک، کیف کودک، پازل کودک",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
