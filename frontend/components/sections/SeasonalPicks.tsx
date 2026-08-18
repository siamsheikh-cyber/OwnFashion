"use client";

import { useRef } from "react";
import Link from "next/link";
import { picks } from "@/lib/data";

export default function SeasonalPicks() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Repeat picks enough times to guarantee zero blank gaps even on 4K displays
  const infinitePicks = [...picks, ...picks, ...picks, ...picks, ...picks, ...picks, ...picks, ...picks];

  const handleScroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 360;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

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
            Seasonal Comfort &amp; Budget Picks
          </h2>
        </div>

        {/* Right side: Navigation Controls & View All */}
        <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-auto">
          {/* Unique White & Blue-Green Gradient Arrow Navigation Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="relative group p-[2px] rounded-full bg-gradient-to-r from-[#06b6d4] via-[#10b981] to-[#3b82f6] shadow-md hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
              aria-label="Previous picks"
            >
              <span className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[20px] sm:text-[22px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0d9488] to-[#2563eb] group-hover:from-[#06b6d4] group-hover:to-[#3b82f6] transition-all duration-300">
                  chevron_left
                </span>
              </span>
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="relative group p-[2px] rounded-full bg-gradient-to-r from-[#3b82f6] via-[#10b981] to-[#06b6d4] shadow-md hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
              aria-label="Next picks"
            >
              <span className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[20px] sm:text-[22px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#0d9488] group-hover:from-[#3b82f6] group-hover:to-[#06b6d4] transition-all duration-300">
                  chevron_right
                </span>
              </span>
            </button>
          </div>

          <Link
            href="/posts"
            className="text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest text-xs font-semibold"
            style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.1em" }}
          >
            View All
          </Link>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div
        ref={sliderRef}
        className="picks-slider overflow-x-auto hide-scrollbar scroll-smooth py-2"
      >
        <div className="picks-track gap-[24px]">
          {infinitePicks.map((item, idx) => (
            <article
              key={`${item.title}-${idx}`}
              className="group cursor-pointer flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px]"
            >
              {/* Product Image Frame */}
              <div className="relative h-[380px] md:h-[400px] overflow-hidden bg-surface-container mb-4 border border-primary/10">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute top-4 left-4 bg-surface/95 backdrop-blur-sm px-3 py-1 border border-primary/10 shadow-sm">
                  <span
                    className="text-primary font-semibold text-xs tracking-wider uppercase"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-primary group-hover:text-secondary transition-colors mb-1.5 text-lg sm:text-xl font-normal leading-snug"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.title}
              </h3>

              {/* Caption */}
              <p
                className="text-on-surface-variant italic mb-4 text-sm leading-relaxed"
                style={{ fontFamily: "Literata, serif" }}
              >
                {item.caption}
              </p>

              {/* Shop Look Button */}
              <button
                type="button"
                className="w-full py-3 border border-primary text-primary uppercase tracking-widest text-xs font-semibold hover:bg-secondary-container hover:border-secondary hover:text-on-secondary-container transition-colors duration-200"
                style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.1em" }}
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
