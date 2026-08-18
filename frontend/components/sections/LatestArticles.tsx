"use client";

import Link from 'next/link';
import { getAllPosts } from '@/lib/postData';

export default function LatestArticles() {
  const allPosts = getAllPosts();
  const featuredPost = allPosts[0];
  const sidePosts = allPosts.slice(1, 4);

  const formatDateToMeta = (dateStr?: string) => {
    if (!dateStr) return "AUG 10, 2026";
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr.toUpperCase();
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <section className="px-[20px] md:px-[80px]">
      <div className="flex items-end justify-between mb-[32px] pb-4 border-b border-primary/10">
        <h2
          className="text-primary italic"
          style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 28px)', lineHeight: '1.3', fontWeight: 400 }}
        >
          Latest Posts
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px]">
        {/* Featured Large Article (7 cols) */}
        {featuredPost && (
          <article className="md:col-span-7 group flex flex-col cursor-pointer">
            <Link href={`/posts/${featuredPost.slug}`} className="flex flex-col h-full">
              <div className="relative h-[500px] overflow-hidden bg-surface-container border border-primary/10 mb-6">
                <div
                  className="absolute inset-0 bg-cover bg-center image-zoom"
                  style={{
                    backgroundImage: `url('${featuredPost.image}')`,
                  }}
                />
              </div>
              <div className="flex flex-col flex-grow justify-center pr-8">
                {/* 1. Category Badge & Date */}
                <div className="flex items-center flex-wrap gap-1.5 mb-3">
                  <span
                    className="text-secondary uppercase tracking-widest text-xs font-semibold"
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif', letterSpacing: '0.08em' }}
                  >
                    {featuredPost.category}
                  </span>
                  <span className="text-on-surface-variant/40 text-xs font-bold">•</span>
                  <span
                    className="text-on-surface-variant uppercase tracking-widest text-xs font-semibold"
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif', letterSpacing: '0.08em' }}
                  >
                    {formatDateToMeta(featuredPost.publishedAt)}
                  </span>
                </div>

                {/* 2. Blog Title */}
                <h3
                  className="text-primary group-hover:text-secondary transition-colors mb-4"
                  style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 28px)', lineHeight: '1.3', fontWeight: 400 }}
                >
                  {featuredPost.title}
                </h3>

                {/* 3. Description / Excerpt */}
                <p
                  className="text-on-surface-variant mb-6 line-clamp-3 font-light"
                  style={{ fontFamily: 'Literata, serif', fontSize: '16px', lineHeight: '1.6' }}
                >
                  {featuredPost.description}
                </p>

                <div className="mt-auto">
                  <span
                    className="inline-block border-b border-primary pb-1 uppercase tracking-widest text-primary group-hover:border-secondary group-hover:text-secondary transition-colors"
                    style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
                  >
                    Read Full Story &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Stacked Smaller Articles (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-8">
          {sidePosts.map((article, i) => (
            <div key={article.slug || article.title}>
              {i > 0 && <hr className="border-t border-primary/10 mb-8" />}
              <article className="group cursor-pointer">
                <Link href={`/posts/${article.slug}`} className="grid grid-cols-5 gap-6 items-center">
                  <div className="col-span-2 relative h-[160px] overflow-hidden bg-surface-container border border-primary/10">
                    <div
                      className="absolute inset-0 bg-cover bg-center image-zoom"
                      style={{ backgroundImage: `url('${article.image}')` }}
                    />
                  </div>
                  <div className="col-span-3 flex flex-col justify-center">
                    {/* 1. Category Badge & Date */}
                    <div className="flex items-center flex-wrap gap-1.5 mb-2">
                      <span
                        className="text-secondary uppercase tracking-widest text-xs font-semibold"
                        style={{ fontFamily: 'Hanken Grotesk, sans-serif', letterSpacing: '0.08em' }}
                      >
                        {article.category}
                      </span>
                      <span className="text-on-surface-variant/40 text-xs font-bold">•</span>
                      <span
                        className="text-on-surface-variant uppercase tracking-widest text-[11px] font-semibold"
                        style={{ fontFamily: 'Hanken Grotesk, sans-serif', letterSpacing: '0.08em' }}
                      >
                        {formatDateToMeta(article.publishedAt)}
                      </span>
                    </div>

                    {/* 2. Blog Title */}
                    <h4
                      className="text-primary group-hover:text-secondary transition-colors leading-snug line-clamp-3"
                      style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 400 }}
                    >
                      {article.title}
                    </h4>
                  </div>
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center py-[50px]">
        <Link
          href="/posts"
          className="text-primary px-[20px] py-[10px] bg-surface-container border border-primary hover:border-secondary hover:text-secondary hover:bg-white inline-block transition-colors font-semibold uppercase tracking-widest text-xs"
          style={{ fontFamily: 'Hanken Grotesk, sans-serif' }}
        >
          View All Posts
        </Link>
      </div>
    </section>
  );
}

