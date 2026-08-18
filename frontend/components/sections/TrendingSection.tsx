"use client";

import Link from 'next/link';
import { trends } from '@/lib/data';
import { getPostBySlug } from '@/lib/postData';

export default function TrendingSection() {
  const formatDateToMeta = (dateStr?: string) => {
    if (!dateStr) return "MAY 12, 2026";
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr.toUpperCase();
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <section className="bg-surface-container-low border border-primary/5 px-[20px] md:px-[80px] py-[120px]">
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
        {trends.map((item) => {
          const post = item.slug ? getPostBySlug(item.slug) : undefined;
          const displayCategory = post?.category || item.tag;
          const displayDate = post?.publishedAt ? formatDateToMeta(post.publishedAt) : "MAY 12, 2026";
          const displayTitle = post?.title || item.title;
          const displayImage = post?.image || item.image;

          return (
            <article
              key={item.title}
              className="group cursor-pointer flex flex-col border border-primary/10 bg-surface p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/posts/${item.slug || 'embracing-the-new-pastels'}`} className="flex flex-col h-full">
                <div className="relative h-[300px] overflow-hidden mb-6 bg-surface-container">
                  <div
                    className="absolute inset-0 bg-cover bg-center image-zoom"
                    style={{ backgroundImage: `url('${displayImage}')` }}
                  />
                </div>
                <div className="text-center flex-grow flex flex-col justify-center">
                  {/* Category & Date */}
                  <div className="flex items-center justify-center flex-wrap gap-1.5 mb-2">
                    <span
                      className="text-secondary uppercase tracking-widest text-xs font-semibold"
                      style={{ fontFamily: 'Hanken Grotesk, sans-serif', letterSpacing: '0.08em' }}
                    >
                      {displayCategory}
                    </span>
                    <span className="text-on-surface-variant/40 text-xs font-bold">•</span>
                    <span
                      className="text-on-surface-variant uppercase tracking-widest text-xs font-semibold"
                      style={{ fontFamily: 'Hanken Grotesk, sans-serif', letterSpacing: '0.08em' }}
                    >
                      {displayDate}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className="text-primary group-hover:text-secondary transition-colors mb-4"
                    style={{ fontFamily: 'Georgia, serif', fontSize: '20px', lineHeight: '1.4', fontWeight: 400 }}
                  >
                    {displayTitle}
                  </h4>
                  <div
                    className="text-secondary uppercase tracking-widest text-xs font-semibold pt-4 border-t border-primary/10 mt-auto"
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif', letterSpacing: '0.08em' }}
                  >
                    Read More...
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

