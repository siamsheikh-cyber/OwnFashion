"use client";

import { featuredArticles } from '@/lib/data';

export default function LatestArticles() {
  return (
    <section className="px-[20px] md:px-[80px]">
      <div className="flex items-end justify-between mb-[32px] pb-4 border-b border-primary/10">
        <h2
          className="text-primary italic"
          style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 28px)', lineHeight: '1.3', fontWeight: 400 }}
        >
          Latest Articles
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px]">
        {/* Featured Large Article (7 cols) */}
        <article className="md:col-span-7 group cursor-pointer flex flex-col">
          <div className="relative h-[500px] overflow-hidden bg-surface-container border border-primary/10 mb-6">
            <div
              className="absolute inset-0 bg-cover bg-center image-zoom"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
          </div>
          <div className="flex flex-col flex-grow justify-center pr-8">
            <div className="flex items-center gap-4 mb-3">
              <span
                className="text-secondary uppercase tracking-widest"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                Editorial
              </span>
              <span className="w-1 h-1 bg-primary/20 rounded-full" />
              <span
                className="text-on-surface-variant italic"
                style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
              >
                8 min read
              </span>
            </div>
            <h3
              className="text-primary group-hover:text-secondary transition-colors mb-4"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 28px)', lineHeight: '1.3', fontWeight: 400 }}
            >
              The Return to Maximalist Outerwear in a Minimalist Era
            </h3>
            <p
              className="text-on-surface-variant mb-6 line-clamp-3"
              style={{ fontFamily: 'Literata, serif', fontSize: '16px', lineHeight: '1.6' }}
            >
              In a season dominated by quiet luxury, a bold counter-movement emerges on the streets of Paris. We explore how
              voluminous silhouettes and striking textures are challenging the status quo.
            </p>
            <div className="mt-auto">
              <span
                className="inline-block border-b border-primary pb-1 uppercase tracking-widest text-primary group-hover:border-secondary group-hover:text-secondary transition-colors"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                Read Full Story
              </span>
            </div>
          </div>
        </article>

        {/* Stacked Smaller Articles (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-8">
          {featuredArticles.map((article, i) => (
            <div key={article.title}>
              {i > 0 && <hr className="border-t border-primary/10 mb-8" />}
              <article className="group cursor-pointer grid grid-cols-5 gap-6 items-center">
                <div className="col-span-2 relative h-[160px] overflow-hidden bg-surface-container border border-primary/10">
                  <div
                    className="absolute inset-0 bg-cover bg-center image-zoom"
                    style={{ backgroundImage: `url('${article.image}')` }}
                  />
                </div>
                <div className="col-span-3 flex flex-col">
                  <span
                    className="text-secondary uppercase tracking-widest mb-2"
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    {article.category}
                  </span>
                  <h4
                    className="text-primary group-hover:text-secondary transition-colors mb-2"
                    style={{ fontFamily: 'Georgia, serif', fontSize: '20px', lineHeight: '1.6', fontWeight: 400 }}
                  >
                    {article.title}
                  </h4>
                  <span
                    className="text-on-surface-variant italic"
                    style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
                  >
                    {article.readTime}
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
