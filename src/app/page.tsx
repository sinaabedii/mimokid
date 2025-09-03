import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductsSection from '@/components/ProductsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
// import InnovationsSection from '@/components/InnovationsSection';
import RoadmapSection from '@/components/RoadmapSection';
import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        {/* <InnovationsSection /> */}
        <RoadmapSection />
        <ProductsSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
