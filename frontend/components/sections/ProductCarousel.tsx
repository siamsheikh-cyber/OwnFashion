"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { carouselProducts } from '@/lib/data';

type FilterTab = 'All' | 'Best Sellers' | 'Top Rated';

function FractionalStar({
  fillPercentage,
  gradId,
}: {
  fillPercentage: number;
  gradId: string;
}) {
  if (fillPercentage >= 100) {
    return (
      <svg className="w-[18px] h-[18px] shrink-0 text-[#F59E0B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    );
  }

  if (fillPercentage <= 0) {
    return (
      <svg className="w-[18px] h-[18px] shrink-0 text-[#D1D5DB]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    );
  }

  return (
    <svg className="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${fillPercentage}%`} stopColor="#F59E0B" />
          <stop offset={`${fillPercentage}%`} stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}

export default function ProductCarousel() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const tabs: FilterTab[] = ['All', 'Best Sellers', 'Top Rated'];

  const filteredProducts = useMemo(() => {
    if (activeTab === 'Best Sellers') {
      return carouselProducts.filter((p) => p.badge === 'Best Seller');
    }
    if (activeTab === 'Top Rated') {
      return carouselProducts.filter((p) => p.badge === 'Top Rated');
    }
    return carouselProducts;
  }, [activeTab]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', (api) => {
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
    });

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0);
  }, [emblaApi, filteredProducts]);

  return (
    <section className="px-[20px] md:px-[80px] pb-[90px] border-primary/5 relative">
      {/* Section Header with Right-Side Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-primary/10">
        <div>
          <h2
            className="italic mb-2 text-primary text-[28px] sm:text-[34px] md:text-[40px] leading-[1.2]"
            style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
          >
            Best Sellers &amp; Top-Rated
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'Literata, serif' }}>
            Discover customer-favorite fashion finds, highly-rated essentials, and top-selling trends verified by authentic reviews.
          </p>
        </div>

        {/* Right-Side Filter Tabs */}
        <div className="flex items-center gap-2 self-start md:self-end shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200 border ${isActive
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface text-on-surface-variant border-primary/15 hover:border-secondary hover:text-secondary hover:bg-surface-container"
                  }`}
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        {/* Prev button */}
        <button
          onClick={scrollPrev}
          aria-label="Previous product"
          className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-primary/20 flex items-center justify-center text-primary hover:bg-secondary hover:text-on-secondary transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </button>

        {/* Next button */}
        <button
          onClick={scrollNext}
          aria-label="Next product"
          className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-primary/20 flex items-center justify-center text-primary hover:bg-secondary hover:text-on-secondary transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
        >
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>

        {/* Carousel viewport */}
        <div className="overflow-hidden py-2" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-6 select-none touch-pan-y">
            {filteredProducts.map((product, index) => (
              <div
                key={`${product.name}-${index}`}
                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] pl-4 md:pl-6"
              >
                <article className="h-full bg-surface border border-primary/10 p-6 flex flex-col hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-md">
                  <div className="relative h-[300px] bg-surface-container mb-6 overflow-hidden">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover image-zoom transition-transform duration-500 hover:scale-105"
                      src={product.image}
                      loading="lazy"
                    />

                    {/* Overlay Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-surface/95 backdrop-blur-sm px-3 py-1 border border-primary/10 shadow-sm flex items-center gap-1.5 z-10 pointer-events-none select-none">
                        <span className="text-[12px] leading-none">
                          {product.badge === 'Best Seller' ? '🔥' : '⭐'}
                        </span>
                        <span
                          className="text-primary font-semibold text-[11px] tracking-wider uppercase leading-none"
                          style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                        >
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="text-primary"
                      style={{ fontFamily: 'Georgia, serif', fontSize: '20px', lineHeight: '1.6', fontWeight: 400 }}
                    >
                      {product.name}
                    </h3>
                    <span
                      className="text-secondary uppercase tracking-widest shrink-0 ml-2"
                      style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                    >
                      {product.price}
                    </span>
                  </div>

                  {/* Star Rating with Fractional Coloring & Review Count */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((starIndex) => {
                        const ratingVal = product.rating || 4.5;
                        const fillPercentage = Math.max(0, Math.min(100, (ratingVal - (starIndex - 1)) * 100));
                        const gradId = `star-grad-${product.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${index}-${starIndex}`;
                        return (
                          <FractionalStar
                            key={starIndex}
                            fillPercentage={fillPercentage}
                            gradId={gradId}
                          />
                        );
                      })}
                    </div>
                    <span
                      className="text-on-surface-variant/70 text-xs font-normal"
                      style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
                    >
                      {product.reviews || '(2.5k reviews)'}
                    </span>
                  </div>

                  <p
                    className="text-on-surface-variant italic mb-4"
                    style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
                  >
                    &ldquo;{product.quote}&rdquo;
                  </p>

                  <ul
                    className="text-on-surface-variant space-y-1 mb-6 flex-grow"
                    style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
                  >
                    {product.details.map((detail, idx) => (
                      <li key={idx}>• {detail}</li>
                    ))}
                  </ul>

                  <a
                    className="w-full py-3 bg-primary-container text-on-primary text-center uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors inline-flex items-center justify-center gap-1.5"
                    href={product.link || "#"}
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    <span>View on Amazon</span>
                    <span className="text-[13px] leading-none">↗</span>
                  </a>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {(scrollSnaps.length > 0 ? scrollSnaps : filteredProducts).map((_, index) => {
          const isActive = selectedIndex === index;
          return (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${isActive
                  ? 'w-6 bg-primary opacity-100'
                  : 'w-2 bg-primary/25 hover:bg-primary/50 opacity-60'
                }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>

      {/* Bottom Disclaimer */}
      <div className="mt-8 text-center space-y-1.5 max-w-5xl mx-auto">
        <p
          className="text-on-surface-variant italic opacity-70"
          style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
        >
          As an Amazon Associate, we earn from qualifying purchases.
        </p>
        <p
          className="text-on-surface-variant/60 text-xs leading-relaxed"
          style={{ fontFamily: 'Literata, serif' }}
        >
          Prices and ratings are accurate at the time of curation and are subject to change. Final price and availability will be displayed on Amazon upon redirection.
        </p>
      </div>
    </section>
  );
}




