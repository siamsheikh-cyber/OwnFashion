"use client";

import { useState } from 'react';
import { carouselProducts } from '@/lib/data';

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);

  return (
    <section className="px-[20px] md:px-[80px] py-[0px] border-primary/5 relative">
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
          onClick={prevSlide}
          className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-primary/20 flex items-center justify-center text-primary hover:bg-secondary hover:text-on-secondary transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-primary/20 flex items-center justify-center text-primary hover:bg-secondary hover:text-on-secondary transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

        {/* Carousel track */}
        <div className="overflow-hidden hide-scrollbar">
          <div
            className="flex gap-[32px] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(calc(-${currentIndex} * (100% / 3 + 32px / 3 * 2)))` }}
          >
            {carouselProducts.map((product) => (
              <article
                key={product.name}
                className="min-w-full md:min-w-[calc(33.333%-22px)] bg-surface border border-primary/10 p-6 flex flex-col hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="h-[300px] bg-surface-container mb-6 overflow-hidden">
                  <img alt={product.name} className="w-full h-full object-cover image-zoom" src={product.image} />
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="text-primary"
                    style={{ fontFamily: 'Georgia, serif', fontSize: '20px', lineHeight: '1.6', fontWeight: 400 }}
                  >
                    {product.name}
                  </h3>
                  <span
                    className="text-secondary uppercase tracking-widest"
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
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {carouselProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-primary' : 'bg-primary/20'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
