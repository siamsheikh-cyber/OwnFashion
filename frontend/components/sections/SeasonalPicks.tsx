"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useBlogPosts, getPostsByCategory, sortPostsByDateDesc } from "@/lib/adminStore";

export default function SeasonalPicks() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const isPausedRef = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const { posts } = useBlogPosts();

  // Filter posts for "SEASONAL COMFORT" (case-insensitive), sorted by date descending, max 6
  let seasonalPosts = getPostsByCategory(posts, "SEASONAL COMFORT", 6);

  // Graceful fallback: If no seasonal comfort posts found, use top 6 newest posts
  if (seasonalPosts.length === 0) {
    seasonalPosts = sortPostsByDateDesc(posts).slice(0, 6);
  }

  // Duplicate items sufficiently to ensure seamless continuous looping across all screen widths
  const repeatCount = seasonalPosts.length > 0 ? Math.max(2, Math.ceil(12 / seasonalPosts.length)) : 0;
  const pickList = Array(repeatCount).fill(seasonalPosts).flat();

  // Auto-scroll loop
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || pickList.length === 0) return;

    let animationFrameId: number;
    let lastTime: number | null = null;
    const speedPxPerSec = 5; // Smooth continuous scroll speed

    const step = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPausedRef.current && !isDown.current && slider) {
        slider.scrollLeft += speedPxPerSec * delta;

        const halfWidth = slider.scrollWidth / 2;
        if (halfWidth > 0 && slider.scrollLeft >= halfWidth) {
          slider.scrollLeft -= halfWidth;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pickList.length]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDown.current = true;
    isPausedRef.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    if (Math.abs(walk) > 4) {
      if (!isDragging) setIsDragging(true);
      hasMoved.current = true;
    }

    let nextScroll = scrollLeftStart.current - walk;
    const halfWidth = sliderRef.current.scrollWidth / 2;

    if (halfWidth > 0) {
      if (nextScroll >= halfWidth) {
        nextScroll -= halfWidth;
        scrollLeftStart.current -= halfWidth;
      } else if (nextScroll < 0) {
        nextScroll += halfWidth;
        scrollLeftStart.current += halfWidth;
      }
    }

    sliderRef.current.scrollLeft = nextScroll;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    setIsDragging(false);
    isPausedRef.current = false;
  };

  const handleTouchStart = () => {
    isPausedRef.current = true;
  };

  const handleTouchEnd = () => {
    isPausedRef.current = false;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (pickList.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden w-full">
      {/* Section Header */}
      <div className="px-5 sm:px-8 md:px-[60px] lg:px-[80px] flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-primary/10">
        <div>
          <span
            className="text-secondary text-[11px] uppercase tracking-[0.2em] font-semibold block mb-1"
            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
          >
            Curated Wardrobe
          </span>
          <h2
            className="text-primary italic text-[26px] sm:text-[30px] md:text-[34px] leading-tight"
            style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
          >
            Seasonal Essentials &amp; Comfort Fits
          </h2>
        </div>

        {/* Right side: View All Link */}
        <div className="flex items-center self-end sm:self-auto">
          <Link
            href="/posts"
            className="text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest text-xs font-semibold"
            style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.1em" }}
          >
            View All
          </Link>
        </div>
      </div>

      {/* Auto-scrolling & Draggable Track */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClickCapture={handleClickCapture}
        className={`picks-slider overflow-x-auto hide-scrollbar select-none py-2 px-5 sm:px-8 md:px-[60px] lg:px-[80px] ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="picks-track gap-[24px] select-none">
          {pickList.map((item, idx) => (
            <article
              key={`${item.id || item.slug}-${idx}`}
              className={`group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
            >

              {/* Product Image Frame */}
              <div className="relative h-[380px] md:h-[400px] overflow-hidden bg-surface-container mb-4 border border-primary/10 select-none">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform pointer-events-none select-none"
                  style={{ backgroundImage: `url('${item.mainImage}')` }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-primary group-hover:text-secondary transition-colors mb-1.5 text-lg sm:text-xl font-normal leading-snug"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.title}
              </h3>

              {/* Caption / Excerpt */}
              <p
                className="text-on-surface-variant italic mb-4 text-sm leading-relaxed line-clamp-2"
                style={{ fontFamily: "Literata, serif" }}
              >
                {item.excerpt}
              </p>

              {/* Read More Button */}
              <Link href={`/posts/${item.slug}`} className="block select-none hover:bg-secondary-container hover:border-secondary hover:text-on-secondary-container">
                <div
                  className="w-full py-3 border border-primary text-primary uppercase tracking-widest text-xs font-semibold transition-colors duration-200 text-center"
                  style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.1em" }}
                >
                  Read More
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
