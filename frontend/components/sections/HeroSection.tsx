"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[55vh] md:min-h-[70vh] w-full px-0">
      {/* 9-col (desktop) / 8-col (tablet) / 12-col (mobile) Hero Image Banner */}
      <div className="h-[380px] sm:h-[480px] md:h-[600px] lg:h-[700px] relative group overflow-hidden border border-primary/10 bg-surface-container md:col-span-8 lg:col-span-9 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center image-zoom"
          style={{
            backgroundImage: "url('/images/ownfashion-hero.png')",
          }}
        />

        {/* Editorial Spotlight Card */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-10 md:left-8 lg:bottom-12 lg:left-[80px] xl:left-[152px] md:right-auto bg-secondary-container p-5 sm:p-7 md:p-8 max-w-full md:max-w-lg lg:max-w-2xl border border-primary/20 z-20 shadow-md md:shadow-none">
          <p
            className="text-on-secondary-container uppercase tracking-widest mb-1.5 sm:mb-2 text-[10px] sm:text-xs font-semibold"
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            Editorial Spotlight
          </p>
          <h1
            className="text-primary italic mb-3 sm:mb-4 text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] leading-[1.2] font-normal"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            The Art of Subtlety: Spring Collection
          </h1>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors uppercase tracking-widest text-[11px] sm:text-xs font-semibold"
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            Explore Collection{" "}
            <span className="material-symbols-outlined text-[14px] sm:text-[16px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>

      {/* 3-col (desktop) / 4-col (tablet) Promo Video/Inset */}
      <div className="md:col-span-4 lg:col-span-3 hidden md:flex items-center justify-center p-2 lg:p-4">
        <div className="relative w-full max-w-[220px] lg:max-w-[260px] h-[340px] lg:h-[400px] bg-surface-container border border-primary/20 p-[10px] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] lg:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)] group overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          >
            <source src="/videos/ownfashion-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
