"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePostBySlug, getRelatedPostsFromList } from "@/lib/adminStore";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function PostDetailPage({ params }: PageProps) {
  const { slug } = params;
  const { post, posts, isLoaded, notFound } = usePostBySlug(slug);

  if (notFound) {
    return (
      <div className="bg-background text-on-background min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-24">
          <span className="text-secondary text-xs uppercase tracking-widest font-semibold mb-2 block">
            404 — Story Not Found
          </span>
          <h1
            className="text-primary italic text-3xl md:text-4xl mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Story Not Found
          </h1>
          <p
            className="text-on-surface-variant max-w-md mb-8 text-base"
            style={{ fontFamily: "Literata, serif" }}
          >
            The editorial story you are looking for may have been updated, relocated, or removed.
          </p>
          <Link
            href="/posts"
            className="px-6 py-3 bg-primary text-white text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-colors"
            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
          >
            ← Return to Editorial Archive
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post && !isLoaded) {
    return (
      <div className="bg-background text-on-background min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow w-full max-w-[860px] mx-auto px-[20px] md:px-[40px] pt-16 pb-20 animate-pulse">
          <div className="h-4 bg-surface-container w-48 mb-4"></div>
          <div className="h-10 bg-surface-container w-3/4 mb-6"></div>
          <div className="h-[360px] bg-surface-container w-full mb-8"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const relatedPosts = getRelatedPostsFromList(posts, post.slug, 3);

  /* ─── helpers ─────────────────────────────────────────────────── */
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /* ─── Build structured content or render HTML content ───────── */
  const contentBlocks = post.contentBlocks ?? [];
  const affiliateProducts = post.affiliateProducts ?? [];

  type Section = { heading: string; text: string; product?: (typeof affiliateProducts)[0] };
  const sections: Section[] = [];
  let paraIndex = 0;

  if (contentBlocks.length > 0) {
    for (let i = 0; i < contentBlocks.length && sections.length < 3; i++) {
      const block = contentBlocks[i];
      if (block.type === "heading") {
        const nextPara = contentBlocks.slice(i + 1).find((b) => b.type === "paragraph");
        sections.push({
          heading: block.heading ?? "",
          text: nextPara?.text ?? "",
          product: affiliateProducts[paraIndex] ?? undefined,
        });
        paraIndex++;
      }
    }
  }

  const openingBlock = contentBlocks.find((b) => b.type === "paragraph");
  const openingText = openingBlock?.text ?? post.excerpt ?? "";
  const hasStructuredSections = sections.length > 0;
  const hasHtmlContent = Boolean(post.content && !hasStructuredSections);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow w-full max-w-[860px] mx-auto px-[20px] md:px-[40px] pt-10 pb-20">

        {/* ── Affiliate Disclosure ─────────────────────────────────── */}
        <div
          className="mb-8 px-4 py-3 bg-surface-container/60 text-xs text-on-surface-variant italic flex items-center gap-2"
          style={{ fontFamily: "Literata, serif" }}
        >
          <span className="material-symbols-outlined text-sm text-secondary not-italic">info</span>
          <span>
            <strong className="not-italic font-semibold text-primary">Affiliate Disclosure:</strong>{" "}
            This post contains affiliate links. We may earn a small commission at no extra cost to you.
          </span>
        </div>

        {/* ── Header Meta ──────────────────────────────────────────── */}
        <header className="mb-8">
          <div
            className="flex items-center flex-wrap gap-2 mb-4 text-xs uppercase tracking-widest"
            style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.1em" }}
          >
            <span className="text-secondary font-semibold">{post.category}</span>
            <span className="text-on-surface-variant/40 font-bold">•</span>
            <span className="text-secondary font-semibold">{(post.season || "ALL").toUpperCase()}</span>
            <span className="text-on-surface-variant/40 font-bold">•</span>
            <span className="text-on-surface-variant">{formatDate(post.date)}</span>
          </div>

          <h1
            className="text-primary italic leading-tight mb-4"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 400,
            }}
          >
            {post.title}
          </h1>

          {post.subtitle && (
            <p
              className="text-on-surface-variant text-lg leading-relaxed font-light"
              style={{ fontFamily: "Literata, serif" }}
            >
              {post.subtitle}
            </p>
          )}
        </header>

        {/* ── Hero Image ───────────────────────────────────────────── */}
        <section className="mb-12">
          <div className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 50vw, 560px)" }}>
            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ── Editorial Content ─────────────────────────────────────── */}
        <article className="mb-14">
          {/* Opening paragraph */}
          {openingText && (
            <p
              className="text-lg md:text-xl leading-relaxed text-on-surface mb-10 first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-serif first-letter:text-primary"
              style={{ fontFamily: "Literata, serif" }}
            >
              {openingText}
            </p>
          )}

          {/* Structured Sections (if available from contentBlocks) */}
          {hasStructuredSections &&
            sections.map((section, idx) => (
              <div key={idx} className="mb-10">
                <h2
                  className="text-primary italic mb-4"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    fontWeight: 400,
                  }}
                >
                  {section.heading}
                </h2>
                {section.text && (
                  <p
                    className="text-lg leading-relaxed text-on-surface"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {section.text}{" "}
                    {section.product && (
                      <a
                        href={section.product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary font-semibold underline-offset-2 underline hover:text-primary transition-colors"
                        style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: "0.85em" }}
                      >
                        See Price →
                      </a>
                    )}
                  </p>
                )}
              </div>
            ))}

          {/* Custom HTML/Markdown Content from Admin */}
          {hasHtmlContent && (
            <div
              className="editorial-html-body text-lg leading-relaxed text-on-surface space-y-6"
              style={{ fontFamily: "Literata, serif" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </article>

        {/* ── Shop the Look / Affiliate Products ────────────────────── */}
        {affiliateProducts.length > 0 ? (
          <section className="mb-14">
            <h2
              className="text-primary italic mb-6"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 400,
              }}
            >
              Shop the Look
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {affiliateProducts.map((prod) => (
                <a
                  key={prod.id}
                  href={prod.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden bg-surface-container"
                  style={{ aspectRatio: "3/4" }}
                  aria-label={`See Price on Amazon: ${prod.name}`}
                >
                  {/* Product Image */}
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badge */}
                  {prod.badge && (
                    <span
                      className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase tracking-widest px-2 py-1 z-10"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                    >
                      {prod.badge}
                    </span>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span
                      className="text-white text-xs uppercase tracking-widest font-semibold mb-1"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                    >
                      See Price on Amazon
                    </span>
                    <span
                      className="material-symbols-outlined text-white text-2xl"
                      style={{ fontVariationSettings: '"FILL" 0' }}
                    >
                      open_in_new
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : post.amazonAffiliateUrl ? (
          <section className="mb-14 p-6 bg-surface border border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span
                className="text-secondary text-xs uppercase tracking-widest font-semibold block mb-1"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                Featured Affiliate Pick
              </span>
              <h3
                className="text-primary italic text-xl mb-1"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Shop Featured Products from This Edit
              </h3>
              <p className="text-on-surface-variant text-sm" style={{ fontFamily: "Literata, serif" }}>
                Explore the curated collection on Amazon with verified merchant pricing and delivery.
              </p>
            </div>
            <a
              href={post.amazonAffiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary text-white hover:bg-secondary transition-colors text-xs uppercase tracking-widest font-semibold whitespace-nowrap inline-flex items-center gap-2"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              See on Amazon <span className="text-sm">↗</span>
            </a>
          </section>
        ) : null}

        {/* ── Author Info ───────────────────────────────────────────── */}
        <div className="mb-14 pt-8 border-t border-primary/10">
          <span
            className="text-secondary text-xs uppercase tracking-widest font-semibold block mb-1"
            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
          >
            Written By
          </span>
          <h3
            className="text-primary italic text-xl"
            style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
          >
            {post.author?.name || "OwnFashion Editorial"}
          </h3>
          <p
            className="text-on-surface-variant text-sm mt-0.5"
            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
          >
            {post.author?.role || "Curated Fashion & Lifestyle Editorial"}
          </p>
        </div>

        {/* ── Related Posts ─────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="pt-10 border-t border-primary/10">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-primary italic"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(20px, 3vw, 28px)",
                  fontWeight: 400,
                }}
              >
                You May Also Like
              </h2>
              <Link
                href="/posts"
                className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                All Posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <article key={relPost.slug || relPost.id} className="group">
                  <Link href={`/posts/${relPost.slug}`} className="flex flex-col h-full">
                    <div
                      className="relative overflow-hidden mb-4 bg-surface-container"
                      style={{ height: "200px" }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${relPost.mainImage}')` }}
                      />
                    </div>
                    <span
                      className="text-secondary text-xs uppercase tracking-widest font-semibold mb-2"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                    >
                      {relPost.category}
                    </span>
                    <h3
                      className="text-primary text-lg group-hover:text-secondary transition-colors leading-snug"
                      style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
                    >
                      {relPost.title}
                    </h3>
                    {relPost.date && (
                      <span
                        className="text-on-surface-variant text-xs mt-2"
                        style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                      >
                        {formatDate(relPost.date)}
                      </span>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
