import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import LatestArticles from '@/components/sections/LatestArticles';
import SeasonalPicks from '@/components/sections/SeasonalPicks';
import TrendingSection from '@/components/sections/TrendingSection';
import ProductCarousel from '@/components/sections/ProductCarousel';

export default function HomePage() {
  return (
    <div className="bg-background text-on-background overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto py-[64px] flex flex-col gap-[120px]">
        <HeroSection />
        <LatestArticles />
        <SeasonalPicks />
        <TrendingSection />
        <ProductCarousel />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
