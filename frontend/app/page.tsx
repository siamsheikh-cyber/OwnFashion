"use client";

import { useEffect, useRef, useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const navLinks = ['Home', 'Blog', 'Category', 'About', 'Contact'];

const featuredArticles = [
  {
    category: 'Accessories',
    title: 'Investing in Timeless Hardware',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Beauty',
    title: 'The Architecture of a Bold Lip',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
  },
  {
    category: 'Curation',
    title: 'Reading List: April Edition',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
  },
];

const picks = [
  {
    title: 'Essential Knitwear Set',
    tag: 'Under $40',
    caption: 'Everyday elegance without the markup.',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'The Structured Blazer',
    tag: 'Under $65',
    caption: 'A versatile staple for transition seasons.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Relaxed Linen Trousers',
    tag: 'Under $50',
    caption: 'Breathable comfort meets sharp tailoring.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Evening Slip Dress',
    tag: 'Under $80',
    caption: 'Understated glamour for intimate gatherings.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80',
  },
];

const trends = [
  {
    title: 'Embracing the New Pastels',
    tag: 'Spring Essentials',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Deconstructing the Canadian Tuxedo',
    tag: 'Denim Redux',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Textures of the Night',
    tag: 'Evening Wear',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=80',
  },
];

const carouselProducts = [
  {
    name: 'Classic Cashmere Blend Wrap',
    price: '$89.00',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    quote: "The softest wrap I've ever owned. It feels like a $300 piece for a fraction of the price.",
    details: ['70% Cashmere, 30% Silk', 'Oversized 80" x 30" dimensions', 'Available in 12 neutral tones'],
  },
  {
    name: 'Structured Wool-Blend Blazer',
    price: '$124.00',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
    quote: 'Perfect tailoring. It holds its shape all day and looks incredibly expensive.',
    details: ['Fully lined interior', 'Functional button cuffs', 'Modern oversized fit'],
  },
  {
    name: 'Minimalist Leather Tote',
    price: '$158.00',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    quote: 'The only bag I need for work. Fits my laptop and looks chic with everything.',
    details: ['Genuine pebble-grain leather', 'Reinforced base', 'Internal zip pocket'],
  },
  {
    name: 'Relaxed Linen Trousers',
    price: '$50.00',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    quote: 'Breathable comfort meets sharp tailoring. My go-to for summer evenings.',
    details: ['100% Organic Linen', 'High-waisted fit', 'Side seam pockets'],
  },
];

// ─── Product Carousel Component ───────────────────────────────────────────────

function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);

  return (
    <section className="px-[20px] md:px-[80px] py-[64px] border-t border-primary/5 relative">
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="bg-background text-on-background overflow-x-hidden">

      {/* ── Top Navigation Bar ─────────────────────────────────────── */}
      <nav className="bg-surface/80 backdrop-blur-md w-full top-0 sticky border-b border-primary/10 z-50 transition-all ease-in-out duration-300">
        <div className="flex items-center h-[60px] px-[20px] md:px-[80px] w-full gap-8 relative">

          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-primary italic tracking-tight"
              style={{ fontFamily: 'Georgia, serif', fontSize: '40px', lineHeight: '1.2', fontWeight: 400 }}
            >
              OwnFashion
            </a>
          </div>

          {/* Center Nav (Desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center space-x-6 uppercase tracking-widest"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
          >
            {navLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                className={
                  i === 0
                    ? 'text-secondary border-b border-secondary pb-1 transition-all ease-in-out duration-300'
                    : 'text-on-surface-variant hover:text-primary transition-all ease-in-out duration-300'
                }
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 text-primary ml-auto">
            {['photo_camera', 'share', 'dark_mode', 'search'].map((icon) => (
              <button key={icon} className="hover:text-secondary transition-colors duration-300">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>
                  {icon}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button className="text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 0' }}>
                menu
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className="mx-auto py-[64px] flex flex-col gap-[120px]">

        {/* ── Hero Section (Asymmetric 9+3 Grid) ─────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-[32px] items-center min-h-[70vh] w-full px-0 md:px-0">

          {/* 9-col Hero Image Banner */}
          <div className="h-[500px] md:h-[700px] relative group overflow-hidden border border-primary/10 bg-surface-container md:col-span-9">
            <div
              className="absolute inset-0 bg-cover bg-center image-zoom"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

            {/* Editorial Spotlight Card */}
            <div className="absolute -bottom-12 left-[32px] bg-secondary-container px-8 py-8 max-w-2xl border border-primary/20 z-20">
              <p
                className="text-on-secondary-container uppercase tracking-widest mb-2"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                Editorial Spotlight
              </p>
              <h1
                className="text-primary italic mb-4"
                style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 4vw, 40px)', lineHeight: '1.2', fontWeight: 400 }}
              >
                The Art of Subtlety: Spring Collection
              </h1>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors uppercase tracking-widest"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                Explore Collection{' '}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* 3-col Promo Video/Inset */}
          <div className="md:col-span-3 hidden md:block">
            <div className="h-full flex items-center justify-center p-4">
              <div className="relative w-full h-[400px] bg-surface-container border border-primary p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] group overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80')",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-surface/90 flex items-center justify-center text-primary hover:bg-secondary hover:text-on-secondary transition-colors border border-primary/20 backdrop-blur-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                      play_arrow
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Latest Articles Section ─────────────────────────────── */}
        <section className="px-[20px] md:px-[80px]">
          <div className="flex items-end justify-between mb-[32px] pb-4 border-b border-primary/10">
            <h2
              className="text-primary italic"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 3vw, 28px)', lineHeight: '1.3', fontWeight: 400 }}
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

        {/* ── Seasonal Comfort & Budget Picks ─────────────────────── */}
        <section className="overflow-hidden">
          {/* Section header — keep horizontal padding */}
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

          {/*
            Infinite marquee:
            - .picks-slider  → overflow:hidden + edge fade mask + pauses on :hover
            - .picks-track   → CSS animation translateX(0 → -50%) scrolls one full copy
            - Cards duplicated once so the loop is seamless
          */}
          <div className="picks-slider overflow-hidden">
            <div className="picks-track gap-[24px] py-2">
              {/* Original set + exact duplicate for seamless loop */}
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

        {/* ── Seasonal Trends & Categories ────────────────────────── */}
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

        {/* ── Product Carousel ────────────────────────────────────── */}
        <ProductCarousel />

      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="bg-surface-container-lowest border-t border-primary/10 py-[120px] px-[20px] md:px-[80px] mt-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[32px] mb-[64px]">

            {/* Brand */}
            <div className="md:col-span-5">
              <a
                href="#"
                className="text-primary italic mb-4 inline-block"
                style={{ fontFamily: 'Georgia, serif', fontSize: '40px', lineHeight: '1.2', fontWeight: 400 }}
              >
                OwnFashion
              </a>
              <p className="text-on-surface-variant max-w-sm" style={{ fontFamily: 'Literata, serif', fontSize: '16px', lineHeight: '1.6' }}>
                A digital destination for the modern minimalist. We curate the finest in high-end editorial fashion, seasonal
                trends, and timeless essentials for the discerning eye.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h5
                className="uppercase tracking-widest text-primary mb-6"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                Navigation
              </h5>
              <ul className="space-y-4 text-on-surface-variant" style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}>
                {['Latest Articles', 'Product Reviews', 'About the Editorial', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-secondary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="md:col-span-4">
              <h5
                className="uppercase tracking-widest text-primary mb-6"
                style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
              >
                Connect
              </h5>
              <div className="flex space-x-6 mb-8">
                {['photo_camera', 'share', 'public', 'play_circle'].map((icon) => (
                  <a key={icon} href="#" className="text-on-surface-variant hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined">{icon}</span>
                  </a>
                ))}
              </div>
              <p
                className="text-on-surface-variant italic opacity-70"
                style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
              >
                OwnFashion is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program
                designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
              </p>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 uppercase tracking-widest"
              style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}>
              {['Privacy Policy', 'Terms of Service', 'Newsletter'].map((item) => (
                <a key={item} href="#" className="text-on-surface-variant hover:text-secondary transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <div
              className="text-on-surface-variant italic"
              style={{ fontFamily: 'Literata, serif', fontSize: '14px', lineHeight: '1.4' }}
            >
              © 2024 OwnFashion Editorial. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
