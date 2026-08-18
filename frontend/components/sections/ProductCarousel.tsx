"use client";

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { carouselProducts } from '@/lib/data';

export default function ProductCarousel() {
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

  return (
    <section className="px-[20px] md:px-[80px] pb-[90px] border-primary/5 relative">
      <div className="text-center mb-[32px]">
        <h2
          className="italic mb-4 text-primary"
          style={{ fontFamily: 'Georgia, serif', fontSize: '40px', lineHeight: '1.2', fontWeight: 400 }}
        >
          Top-Rated Amazon Fashion Picks &amp; Reviews
        </h2>
        <p className="text-on-surface-variant" style={{ fontFamily: 'Literata, serif', fontSize: '16px', lineHeight: '1.6' }}>
          Our curated selection of highly-rated essentials, tested and loved by our editors.
        </p>
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
            {carouselProducts.map((product, index) => (
              <div
                key={`${product.name}-${index}`}
                className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] pl-4 md:pl-6"
              >
                <article className="h-full bg-surface border border-primary/10 p-6 flex flex-col hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-md">
                  <div className="h-[300px] bg-surface-container mb-6 overflow-hidden">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover image-zoom transition-transform duration-500 hover:scale-105"
                      src={product.image}
                      loading="lazy"
                    />
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

                  <div className="flex text-[#D4AF37] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                        star
                      </span>
                    ))}
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
                    className="w-full py-3 bg-primary-container text-on-primary text-center uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-colors block"
                    href="#"
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    View on Amazon
                  </a>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {(scrollSnaps.length > 0 ? scrollSnaps : carouselProducts).map((_, index) => {
          const isActive = selectedIndex === index;
          return (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-6 bg-primary opacity-100'
                  : 'w-2 bg-primary/25 hover:bg-primary/50 opacity-60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          );
        })}
      </div>

      <p
        className="mt-8 text-center text-on-surface-variant italic opacity-70"
        style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
      >
        As an Amazon Associate, we earn from qualifying purchases.
      </p>
    </section>
  );
}

