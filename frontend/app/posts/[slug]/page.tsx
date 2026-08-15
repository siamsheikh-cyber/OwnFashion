"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPostBySlug, getRelatedPosts } from "@/lib/postData";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function PostDetailPage({ params }: PageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

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

  /* ─── Build structured content: up to 3 headings + paragraphs ── */
  const contentBlocks = post.contentBlocks ?? [];
  const affiliateProducts = post.affiliateProducts ?? [];

  // Pair each heading with the paragraph that follows it (max 3 pairs)
  type Section = { heading: string; text: string; product?: (typeof affiliateProducts)[0] };
  const sections: Section[] = [];
  let paraIndex = 0; // tracks which affiliate product index to use

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

  // Opening paragraph (first paragraph before any heading)
  const openingBlock = contentBlocks.find((b) => b.type === "paragraph");
  const openingText = openingBlock?.text ?? post.description ?? "";

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
            className="flex items-center gap-2 mb-4 text-xs uppercase tracking-widest"
            style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.1em" }}
          >
            <span className="text-secondary font-semibold">{post.category}</span>
            <span className="text-on-surface-variant/40 font-bold">•</span>
            <span className="text-secondary font-semibold">{post.season?.toUpperCase()}</span>
            <span className="text-on-surface-variant/40 font-bold">•</span>
            <span className="text-on-surface-variant">{formatDate(post.publishedAt)}</span>
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
              src={post.image}
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

          {/* Up to 3 sub-heading sections with inline "See Price" links */}
          {sections.map((section, idx) => (
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
        </article>

        {/* ── Shop the Look ─────────────────────────────────────────── */}
        {affiliateProducts.length > 0 && (
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
        )}

        {/* ── Author Info ───────────────────────────────────────────── */}
        {post.author && (
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
              {post.author.name}
            </h3>
            <p
              className="text-on-surface-variant text-sm mt-0.5"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              {post.author.role}
            </p>
          </div>
        )}

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
                <article key={relPost.slug} className="group">
                  <Link href={`/posts/${relPost.slug}`} className="flex flex-col h-full">
                    <div
                      className="relative overflow-hidden mb-4"
                      style={{ height: "200px" }}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${relPost.image}')` }}
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
                    {relPost.publishedAt && (
                      <span
                        className="text-on-surface-variant text-xs mt-2"
                        style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                      >
                        {relPost.publishedAt}
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
