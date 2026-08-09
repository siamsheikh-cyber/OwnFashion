"use client";

import { trends } from '@/lib/data';

export default function TrendingSection() {
  return (
    <section className="bg-surface-container-low border border-primary/5 px-[20px] md:px-[80px] py-[80px]">
      <div className="text-center mb-[64px] max-w-2xl mx-auto">
        <h2
          className="text-primary italic mb-4"
          style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 4vw, 40px)', lineHeight: '1.2', fontWeight: 400 }}
        >
          Seasonal Trends &amp; Categories
        </h2>
        <p className="text-on-surface-variant" style={{ fontFamily: 'Literata, serif', fontSize: '16px', lineHeight: '1.6' }}>
          Curated perspectives on the silhouettes and palettes defining the current moment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
        {trends.map((item) => (
          <article
            key={item.title}
            className="group cursor-pointer flex flex-col border border-primary/10 bg-surface p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-[300px] overflow-hidden mb-6">
              <div
                className="absolute inset-0 bg-cover bg-center image-zoom"
                style={{ backgroundImage: `url('${item.image}')` }}
              />
            </div>
            <div className="text-center flex-grow flex flex-col">
              <h3
                className="text-secondary uppercase tracking-widest mb-2"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                {item.tag}{' '}
                <span className="text-on-surface-variant mx-1 normal-case">•</span>{' '}
                <span
                  className="normal-case italic"
                  style={{ fontFamily: 'Literata, serif', fontSize: '14px', fontWeight: 400 }}
                >
                  {item.readTime}
                </span>
              </h3>
              <h4
                className="text-primary group-hover:text-secondary transition-colors mb-4"
                style={{ fontFamily: 'Georgia, serif', fontSize: '20px', lineHeight: '1.6', fontWeight: 400 }}
              >
                {item.title}
              </h4>
              <p
                className="text-on-surface-variant italic mt-auto pt-4 border-t border-primary/10"
                style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
              >
                By OwnFashion Team
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
