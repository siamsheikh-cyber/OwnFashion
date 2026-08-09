"use client";

import { picks } from '@/lib/data';

export default function SeasonalPicks() {
  return (
    <section className="overflow-hidden">
      <div className="px-[20px] md:px-[80px] flex items-end justify-between mb-[32px] pb-4 border-b border-primary/10">
        <h2
          className="text-primary italic"
          style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 28px)', lineHeight: '1.3', fontWeight: 400 }}
        >
          Seasonal Comfort &amp; Budget Picks
        </h2>
        <a
          href="#"
          className="hidden md:inline-block text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
          style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
        >
          View All
        </a>
      </div>

      <div className="picks-slider overflow-hidden">
        <div className="picks-track gap-[24px] py-2">
          {[...picks, ...picks].map((item, idx) => (
            <article
              key={`${item.title}-${idx}`}
              className="group cursor-pointer flex-shrink-0 w-[300px] md:w-[340px]"
            >
              <div className="relative h-[400px] overflow-hidden bg-surface-container mb-4 border border-primary/10">
                <div
                  className="absolute inset-0 bg-cover bg-center image-zoom"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute top-4 left-4 bg-surface px-3 py-1 border border-primary/10">
                  <span
                    className="text-primary"
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
              <h3
                className="text-primary group-hover:text-secondary transition-colors mb-2"
                style={{ fontFamily: 'Georgia, serif', fontSize: '20px', lineHeight: '1.6', fontWeight: 400 }}
              >
                {item.title}
              </h3>
              <p
                className="text-on-surface-variant italic mb-4"
                style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
              >
                {item.caption}
              </p>
              <button
                className="w-full py-3 border border-primary text-primary uppercase tracking-widest hover:bg-secondary-container hover:border-secondary hover:text-on-secondary-container transition-colors"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                Shop Look
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
