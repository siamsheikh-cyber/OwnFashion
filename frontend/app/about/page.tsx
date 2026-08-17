import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us | Own Fashion",
  description:
    "Curating timeless style, seasonal comfort, and modern fashion insights for every wardrobe. Discover the mission and values behind Own Fashion.",
};

export default function AboutPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full">
        {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
        <section
          id="about-hero"
          className="relative w-full border-b border-primary/10 bg-[#ECE7DC] py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
        >
          {/* Subtle Background Pattern & Light Radial Glow */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#775a19_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

          <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 border border-primary/20 bg-background/80 backdrop-blur-sm shadow-sm">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              <span
                className="text-primary text-[11px] uppercase tracking-[0.2em] font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                The Editorial Atelier
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight mb-6 leading-[1.15]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              About <span className="italic font-normal">Own Fashion</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-on-surface-variant text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-normal leading-relaxed text-balance"
              style={{ fontFamily: "Literata, Georgia, serif" }}
            >
              Curating timeless style, seasonal comfort, and modern fashion insights for every wardrobe.
            </p>
          </div>
        </section>

        {/* ── 2. BRAND STORY / MISSION SECTION ───────────────────────────────── */}
        <section
          id="brand-story"
          className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-20 py-20 md:py-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Story & Narrative */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                <span
                  className="text-secondary text-xs uppercase tracking-[0.18em] font-semibold"
                  style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                >
                  Our Purpose & Philosophy
                </span>
                <span className="h-[1px] w-10 bg-secondary/40" />
              </div>

              <h2
                className="text-primary text-3xl sm:text-4xl md:text-[42px] leading-[1.2] font-normal"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Style is not about excess—it’s about{" "}
                <span className="italic">intentional choices</span> that endure.
              </h2>

              <div
                className="space-y-4 text-on-surface-variant text-base sm:text-lg leading-relaxed pt-2"
                style={{ fontFamily: "Literata, Georgia, serif" }}
              >
                <p>
                  At <strong className="text-primary font-semibold">Own Fashion</strong>, we believe dressing well should never feel complicated or overwhelming. In a world inundated with fleeting micro-trends and disposable fast fashion, we exist to bring calm clarity to your daily wardrobe.
                </p>
                <p>
                  Our passion lies in simplifying style choices, thoroughly reviewing high-quality apparel, and guiding readers toward effortless fashion choices that harmonize everyday comfort with timeless sophistication.
                </p>
                <p>
                  Whether we are evaluating the drape of sustainable knitwear, decoding seasonal runway cues for real-world wear, or discovering affordable gems that rival luxury standards, our standard remains uncompromising: thoughtful design, lasting longevity, and authentic versatility.
                </p>
              </div>

              {/* Editorial Highlights Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-primary/10">
                <div className="p-4 bg-surface-container/60 border border-primary/10">
                  <span
                    className="block text-2xl sm:text-3xl font-normal text-primary mb-1"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    100%
                  </span>
                  <span
                    className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    Editorial Autonomy
                  </span>
                </div>

                <div className="p-4 bg-surface-container/60 border border-primary/10">
                  <span
                    className="block text-2xl sm:text-3xl font-normal text-primary mb-1"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    4+
                  </span>
                  <span
                    className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    Seasonal Lookbooks
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1 p-4 bg-surface-container/60 border border-primary/10">
                  <span
                    className="block text-2xl sm:text-3xl font-normal text-primary mb-1"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Zero
                  </span>
                  <span
                    className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    Fast-Fashion Fluff
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Image Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Editorial Image Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-primary/20 bg-surface-container shadow-[16px_16px_0px_0px_rgba(27,28,28,0.06)] group">
                  <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
                    alt="Own Fashion Editorial Lookbook and Styling"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-80 z-10" />

                  {/* Floating Caption Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-background/95 backdrop-blur-md border border-primary/15 z-20">
                    <p
                      className="text-secondary text-[11px] uppercase tracking-widest font-semibold mb-1"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                    >
                      The Core Collection
                    </p>
                    <p
                      className="text-primary text-sm italic font-serif leading-snug"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      “Elegance is refusal. Selecting only the essentials that truly speak to your lifestyle.”
                    </p>
                  </div>
                </div>

                {/* Decorative Accent Tag */}
                <div className="absolute -top-3 -right-3 hidden sm:flex items-center justify-center w-20 h-20 bg-secondary-container text-on-secondary-container border border-primary/20 rotate-6 shadow-sm z-30">
                  <span
                    className="text-[10px] uppercase font-bold tracking-widest text-center leading-tight"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    Curated
                    <br />
                    Living
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. CORE VALUES / WHAT WE OFFER (3-COLUMN CARDS GRID) ────────────── */}
        <section
          id="what-we-offer"
          className="w-full bg-[#f6f4f1] border-y border-primary/10 py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-20"
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span
                className="text-secondary text-xs uppercase tracking-[0.2em] font-semibold block mb-3"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                What We Offer
              </span>
              <h2
                className="text-primary text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Our Core <span className="italic font-normal">Pillars</span>
              </h2>
              <p
                className="text-on-surface-variant text-base sm:text-lg leading-relaxed"
                style={{ fontFamily: "Literata, Georgia, serif" }}
              >
                Rooted in authenticity and refined aesthetics, our three guiding commitments empower your personal style journey.
              </p>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Curated Style Guides */}
              <div
                id="pillar-style-guides"
                className="group relative bg-background border border-primary/15 p-8 sm:p-10 flex flex-col justify-between hover:border-secondary/60 hover:shadow-[8px_8px_0px_0px_rgba(119,90,25,0.12)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-primary/10">
                    <span
                      className="text-secondary text-sm font-semibold tracking-widest"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                    >
                      01 / ESSENTIALS
                    </span>
                    <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors duration-300 text-2xl">
                      auto_awesome
                    </span>
                  </div>

                  <h3
                    className="text-primary text-2xl sm:text-[26px] font-normal mb-4 leading-tight group-hover:text-secondary transition-colors duration-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Curated Style Guides
                  </h3>

                  <p
                    className="text-on-surface-variant text-base leading-relaxed mb-6"
                    style={{ fontFamily: "Literata, Georgia, serif" }}
                  >
                    Expert advice on seasonal fashion, capsule building, and wardrobe essentials designed to maximize versatility and minimize clutter.
                  </p>
                </div>

                <div className="pt-4 border-t border-primary/10 mt-4">
                  <span
                    className="text-xs uppercase tracking-wider text-secondary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    Capsule Formulas & Lookbooks
                    <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                  </span>
                </div>
              </div>

              {/* Card 2: Honest Recommendations */}
              <div
                id="pillar-honest-recommendations"
                className="group relative bg-background border border-primary/15 p-8 sm:p-10 flex flex-col justify-between hover:border-secondary/60 hover:shadow-[8px_8px_0px_0px_rgba(119,90,25,0.12)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-primary/10">
                    <span
                      className="text-secondary text-sm font-semibold tracking-widest"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                    >
                      02 / INTEGRITY
                    </span>
                    <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors duration-300 text-2xl">
                      verified
                    </span>
                  </div>

                  <h3
                    className="text-primary text-2xl sm:text-[26px] font-normal mb-4 leading-tight group-hover:text-secondary transition-colors duration-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Honest Recommendations
                  </h3>

                  <p
                    className="text-on-surface-variant text-base leading-relaxed mb-6"
                    style={{ fontFamily: "Literata, Georgia, serif" }}
                  >
                    Unbiased reviews, fabric breakdown analyses, and carefully selected affiliate products we genuinely wear, test, and trust.
                  </p>
                </div>

                <div className="pt-4 border-t border-primary/10 mt-4">
                  <span
                    className="text-xs uppercase tracking-wider text-secondary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    Tested Quality & Direct Value
                    <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                  </span>
                </div>
              </div>

              {/* Card 3: Trend Analysis */}
              <div
                id="pillar-trend-analysis"
                className="group relative bg-background border border-primary/15 p-8 sm:p-10 flex flex-col justify-between hover:border-secondary/60 hover:shadow-[8px_8px_0px_0px_rgba(119,90,25,0.12)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-primary/10">
                    <span
                      className="text-secondary text-sm font-semibold tracking-widest"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                    >
                      03 / FORECAST
                    </span>
                    <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors duration-300 text-2xl">
                      trending_up
                    </span>
                  </div>

                  <h3
                    className="text-primary text-2xl sm:text-[26px] font-normal mb-4 leading-tight group-hover:text-secondary transition-colors duration-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Trend Analysis
                  </h3>

                  <p
                    className="text-on-surface-variant text-base leading-relaxed mb-6"
                    style={{ fontFamily: "Literata, Georgia, serif" }}
                  >
                    Staying ahead with the latest seasonal & aesthetic trends, filtering the noise to bring you wearable, high-taste inspirations.
                  </p>
                </div>

                <div className="pt-4 border-t border-primary/10 mt-4">
                  <span
                    className="text-xs uppercase tracking-wider text-secondary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    Runway Insights to Real Wear
                    <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. EDITORIAL ETHOS / COMMITMENT BANNER ──────────────────────────── */}
        <section
          id="editorial-ethos"
          className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-20 py-16 md:py-20"
        >
          <div className="border border-primary/15 bg-background p-8 md:p-14 text-center relative">
            <span
              className="text-secondary text-xs uppercase tracking-[0.2em] font-semibold block mb-4"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              The Own Fashion Standard
            </span>

            <blockquote
              className="text-primary text-xl sm:text-2xl md:text-3xl font-normal italic max-w-3xl mx-auto leading-relaxed mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              “We believe great style is an intimate expression of self-respect—never an exercise in keeping up.”
            </blockquote>

            <p
              className="text-on-surface-variant text-sm sm:text-base max-w-xl mx-auto"
              style={{ fontFamily: "Literata, Georgia, serif" }}
            >
              Every recommendation published on Own Fashion adheres to strict editorial neutrality and a dedicated passion for elevated living.
            </p>
          </div>
        </section>

        {/* ── 5. CLEAN CTA SECTION (BOTTOM) ───────────────────────────────────── */}
        <section
          id="about-cta"
          className="w-full bg-[#ECE7DC] border-t border-primary/10 py-20 md:py-28 px-5 sm:px-8 md:px-16 lg:px-24"
        >
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Section Tag */}
            <span
              className="text-secondary text-xs uppercase tracking-[0.2em] font-semibold block mb-3"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              Let’s Connect
            </span>

            {/* Title */}
            <h2
              className="text-primary text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-5 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Have Questions or Collaboration Ideas?
            </h2>

            {/* Description */}
            <p
              className="text-on-surface-variant text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "Literata, Georgia, serif" }}
            >
              Whether you are an aspiring stylist, a conscious fashion brand looking to partner, or a reader seeking personalized wardrobe guidance, we’d love to hear from you.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                id="about-cta-get-in-touch"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-on-primary hover:bg-secondary transition-all duration-300 shadow-sm uppercase tracking-widest text-xs font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                <span>Get in Touch</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>

              <Link
                href="/posts"
                id="about-cta-explore-articles"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-primary text-primary hover:bg-primary/5 transition-all duration-300 uppercase tracking-widest text-xs font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                <span>Explore Articles</span>
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
