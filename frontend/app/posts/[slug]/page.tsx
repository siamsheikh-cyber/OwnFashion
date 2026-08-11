"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPostBySlug, getRelatedPosts } from "@/lib/postData";
import { ImPinterest2 } from "react-icons/im";
import { FaInstagram, FaFacebookF, FaTwitter, FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaLink, FaCheck, FaShoppingBag, FaExternalLinkAlt } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function PostDetailPage({ params }: PageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (!post) {
    // Fallback if slug not found
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // Local state for interactive features
  const [likes, setLikes] = useState(128);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Comments state
  const [comments, setComments] = useState([
    {
      id: "c1",
      name: "Victoria Sterling",
      date: "August 11, 2026",
      text: "The perspective on architectural outerwear completely changed how I look at winter layering! Great editorial selection.",
    },
    {
      id: "c2",
      name: "Julian Vance",
      date: "August 10, 2026",
      text: "I appreciated the affiliate hardware breakdown. The Cuyana tote has been on my wishlist for months!",
    },
  ]);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      name: newCommentName.trim(),
      date: "Just now",
      text: newCommentText.trim(),
    };

    setComments([newEntry, ...comments]);
    setNewCommentName("");
    setNewCommentText("");
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-[20px] md:px-[40px] pt-8 pb-16">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-xs uppercase tracking-widest text-on-surface-variant flex items-center gap-2"
          style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
        >
          <Link href="/" className="hover:text-secondary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/posts" className="hover:text-secondary transition-colors">
            Posts
          </Link>
          <span>/</span>
          <span className="text-secondary">{post.category}</span>
        </nav>

        {/* Post Header */}
        <header className="mb-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3 py-1 bg-secondary/10 text-secondary uppercase tracking-widest text-xs font-semibold"
              style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
            >
              {post.category}
            </span>
            <span className="text-on-surface-variant text-xs">•</span>
            <span
              className="text-on-surface-variant italic text-sm"
              style={{ fontFamily: "Literata, serif" }}
            >
              {post.readTime}
            </span>
          </div>

          <h1
            className="text-primary italic mb-6 leading-tight"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 400,
            }}
          >
            {post.title}
          </h1>

          {post.subtitle && (
            <p
              className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-8 font-light"
              style={{ fontFamily: "Literata, serif" }}
            >
              {post.subtitle}
            </p>
          )}

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-4 border-y border-primary/10">
            {post.author && (
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 object-cover rounded-full border border-primary/20"
                />
                <div>
                  <h4
                    className="text-primary text-base font-semibold"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {post.author.name}
                  </h4>
                  <p
                    className="text-on-surface-variant text-xs"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    {post.author.role} {post.publishedAt ? `• ${post.publishedAt}` : ""}
                  </p>
                </div>
              </div>
            )}

            {/* Social Share & Actions */}
            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-colors ${isLiked
                    ? "bg-secondary text-white border-secondary"
                    : "border-primary/20 hover:border-secondary hover:text-secondary text-primary"
                  }`}
                title="Like Post"
              >
                {isLiked ? <FaHeart className="text-red-400" /> : <FaRegHeart />}
                <span>{likes}</span>
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 border transition-colors ${isBookmarked
                    ? "bg-primary text-white border-primary"
                    : "border-primary/20 hover:border-secondary hover:text-secondary text-primary"
                  }`}
                title="Bookmark Post"
              >
                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </button>

              <button
                onClick={handleCopyLink}
                className="p-2 border border-primary/20 hover:border-secondary hover:text-secondary text-primary transition-colors relative"
                title="Copy Link"
              >
                {copied ? <FaCheck className="text-green-600" /> : <FaLink />}
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-0.5 whitespace-nowrap shadow-md">
                    Link Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Hero Image */}
        <section className="mb-12">
          <div className="relative w-full h-[380px] md:h-[580px] overflow-hidden bg-surface-container border border-primary/10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p
            className="text-xs text-on-surface-variant italic mt-2 text-right"
            style={{ fontFamily: "Literata, serif" }}
          >
            Editorial Feature Photography • OwnFashion Archives
          </p>
        </section>

        {/* Article Layout Grid (Main Content + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Body (8 cols) */}
          <article className="lg:col-span-8 flex flex-col gap-8">
            {/* Takeaways / Executive Summary Box */}
            {post.takeaways && post.takeaways.length > 0 && (
              <div className="bg-surface-container-low border-l-4 border-secondary p-6 md:p-8 border border-primary/10">
                <h3
                  className="text-secondary uppercase tracking-widest text-xs font-semibold mb-4"
                  style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                >
                  Editorial Takeaways
                </h3>
                <ul className="space-y-3">
                  {post.takeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      className="text-primary text-base leading-relaxed flex items-start gap-3"
                      style={{ fontFamily: "Literata, serif" }}
                    >
                      <span className="text-secondary font-bold text-lg leading-none">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Affiliate Disclosure Notice */}
            <div className="bg-surface-container/50 border border-primary/10 p-4 text-xs text-on-surface-variant italic flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-secondary">info</span>
                <span>
                  <strong>Affiliate Disclosure:</strong> This post contains curated placeholder affiliate links. We may receive a small commission if you purchase through these links.
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold bg-secondary/10 px-2 py-0.5">
                FTC Compliant
              </span>
            </div>

            {/* Render Content Blocks */}
            <div className="prose max-w-none text-primary space-y-6">
              {post.contentBlocks && post.contentBlocks.length > 0 ? (
                post.contentBlocks.map((block, idx) => {
                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={idx}
                        className={`text-lg md:text-xl leading-relaxed text-on-surface ${idx === 0
                            ? "first-letter:float-left first-letter:text-6xl first-letter:pr-3 first-letter:font-serif first-letter:text-primary font-serif"
                            : ""
                          }`}
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "heading") {
                    return (
                      <h2
                        key={idx}
                        className="text-2xl md:text-3xl text-primary italic pt-4 mb-2 border-b border-primary/10 pb-2"
                        style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
                      >
                        {block.heading}
                      </h2>
                    );
                  }

                  if (block.type === "blockquote") {
                    return (
                      <blockquote
                        key={idx}
                        className="border-l-2 border-secondary pl-6 py-4 my-8 bg-surface-container-low/60 italic text-xl md:text-2xl text-primary"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        “{block.text}”
                        {block.quoteAuthor && (
                          <footer
                            className="text-xs uppercase tracking-widest text-secondary mt-3 not-italic font-semibold"
                            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                          >
                            — {block.quoteAuthor}
                          </footer>
                        )}
                      </blockquote>
                    );
                  }

                  if (block.type === "image" && block.imageUrl) {
                    return (
                      <figure key={idx} className="my-8">
                        <div className="relative h-[400px] overflow-hidden border border-primary/10 bg-surface-container">
                          <img
                            src={block.imageUrl}
                            alt={block.imageCaption || "Article image"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {block.imageCaption && (
                          <figcaption
                            className="text-xs text-on-surface-variant italic mt-2 text-center"
                            style={{ fontFamily: "Literata, serif" }}
                          >
                            {block.imageCaption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  if (block.type === "products") {
                    const productsList = post.affiliateProducts || [];
                    if (productsList.length === 0) return null;

                    return (
                      <div key={idx} className="my-10 p-6 md:p-8 bg-surface-container-low border border-primary/15">
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-primary/10">
                          <h3
                            className="text-primary italic text-2xl"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            Shop the Look &amp; Featured Pieces
                          </h3>
                          <span
                            className="text-xs text-secondary uppercase tracking-widest font-semibold flex items-center gap-1"
                            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                          >
                            <FaShoppingBag className="text-xs" /> Curated Affiliate Picks
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {productsList.map((prod) => (
                            <div
                              key={prod.id}
                              className="bg-surface border border-primary/10 p-4 flex flex-col group hover:shadow-md transition-shadow"
                            >
                              <div className="relative h-[220px] overflow-hidden bg-surface-container mb-4">
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {prod.badge && (
                                  <span
                                    className="absolute top-2 left-2 bg-primary text-white text-[10px] uppercase tracking-widest px-2.5 py-1"
                                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                                  >
                                    {prod.badge}
                                  </span>
                                )}
                              </div>

                              <div className="flex-grow flex flex-col">
                                {prod.brand && (
                                  <span
                                    className="text-secondary text-xs uppercase tracking-widest font-semibold mb-1"
                                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                                  >
                                    {prod.brand}
                                  </span>
                                )}
                                <h4
                                  className="text-primary text-lg font-normal mb-2 leading-snug"
                                  style={{ fontFamily: "Georgia, serif" }}
                                >
                                  {prod.name}
                                </h4>
                                <p
                                  className="text-on-surface-variant text-xs mb-4 line-clamp-2"
                                  style={{ fontFamily: "Literata, serif" }}
                                >
                                  {prod.description}
                                </p>
                                <div className="mt-auto flex items-center justify-between pt-3 border-t border-primary/10">
                                  <span
                                    className="text-primary font-semibold text-base"
                                    style={{ fontFamily: "Georgia, serif" }}
                                  >
                                    {prod.price}
                                  </span>
                                  <a
                                    href={prod.affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 bg-primary text-white hover:bg-secondary transition-colors px-3 py-1.5 text-xs uppercase tracking-wider font-semibold"
                                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                                  >
                                    <span>Buy Now</span>
                                    <FaExternalLinkAlt className="text-[10px]" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })
              ) : (
                <p
                  className="text-lg text-on-surface leading-relaxed"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {post.description}
                </p>
              )}
            </div>

            {/* Post Tags */}
            {post.tags && (
              <div className="pt-6 border-t border-primary/10 flex flex-wrap items-center gap-2">
                <span
                  className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold mr-2"
                  style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                >
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-container border border-primary/10 text-xs text-primary hover:border-secondary hover:text-secondary transition-colors cursor-pointer"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Spotlight Bio Box */}
            {post.author && (
              <div className="bg-surface border border-primary/15 p-6 md:p-8 my-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-20 h-20 object-cover rounded-full border-2 border-secondary/30 flex-shrink-0"
                />
                <div>
                  <span
                    className="text-secondary text-xs uppercase tracking-widest font-semibold block mb-1"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    Written By
                  </span>
                  <h3
                    className="text-primary text-xl italic mb-2"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {post.author.name}
                  </h3>
                  <p
                    className="text-on-surface-variant text-sm leading-relaxed mb-4"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {post.author.bio}
                  </p>
                  <a
                    href="#"
                    className="text-xs uppercase tracking-widest text-primary border-b border-primary hover:text-secondary hover:border-secondary transition-colors font-semibold"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    View Author’s Full Archive &rarr;
                  </a>
                </div>
              </div>
            )}

            {/* Interactive Comments Section */}
            <section className="pt-8 border-t border-primary/10">
              <h3
                className="text-primary italic text-2xl mb-6"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Discussion ({comments.length})
              </h3>

              {/* Add Comment Form */}
              <form
                onSubmit={handleCommentSubmit}
                className="bg-surface-container-low border border-primary/10 p-6 mb-8 flex flex-col gap-4"
              >
                <h4
                  className="text-xs uppercase tracking-widest text-secondary font-semibold"
                  style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                >
                  Leave a Comment
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-surface border border-primary/15 text-sm text-primary focus:outline-none focus:border-secondary"
                    style={{ fontFamily: "Literata, serif" }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email (Optional)"
                    className="w-full px-4 py-2.5 bg-surface border border-primary/15 text-sm text-primary focus:outline-none focus:border-secondary"
                    style={{ fontFamily: "Literata, serif" }}
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Share your thoughts on this story..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-surface border border-primary/15 text-sm text-primary focus:outline-none focus:border-secondary"
                  style={{ fontFamily: "Literata, serif" }}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-white hover:bg-secondary transition-colors px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
                    style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-5 bg-surface border border-primary/10 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-primary font-semibold text-base"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {comment.name}
                      </span>
                      <span
                        className="text-on-surface-variant text-xs italic"
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        {comment.date}
                      </span>
                    </div>
                    <p
                      className="text-on-surface-variant text-sm leading-relaxed"
                      style={{ fontFamily: "Literata, serif" }}
                    >
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            {/* Sidebar Newsletter Widget */}
            <div className="bg-surface-container border border-primary/15 p-6 text-center">
              <h3
                className="text-primary italic text-2xl mb-3"
                style={{ fontFamily: "Georgia, serif" }}
              >
                The OwnFashion Digest
              </h3>
              <p
                className="text-on-surface-variant text-xs leading-relaxed mb-6"
                style={{ fontFamily: "Literata, serif" }}
              >
                Weekly editorial curation of timeless style, luxury shopping edits, and exclusive reviews delivered to your inbox.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 bg-surface border border-primary/20 text-xs text-primary focus:outline-none focus:border-secondary"
                  style={{ fontFamily: "Literata, serif" }}
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-secondary transition-colors py-3 text-xs uppercase tracking-widest font-semibold"
                  style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Recommended Products Sticky Bar */}
            {post.affiliateProducts && post.affiliateProducts.length > 0 && (
              <div className="border border-primary/15 bg-surface p-6">
                <h4
                  className="text-secondary uppercase tracking-widest text-xs font-semibold mb-4 border-b border-primary/10 pb-2"
                  style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                >
                  Featured In This Article
                </h4>
                <div className="space-y-4">
                  {post.affiliateProducts.map((p) => (
                    <div key={p.id} className="flex gap-3 items-center group">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover border border-primary/10"
                      />
                      <div className="flex-grow">
                        <h5
                          className="text-primary text-sm line-clamp-1 group-hover:text-secondary transition-colors"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {p.name}
                        </h5>
                        <p
                          className="text-xs text-on-surface-variant font-semibold"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {p.price}
                        </p>
                        <a
                          href={p.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] uppercase tracking-wider text-secondary font-semibold hover:underline"
                          style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                        >
                          View Affiliate Offer &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Connect Box */}
            <div className="border border-primary/15 p-6 bg-surface">
              <h4
                className="text-primary italic text-xl mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Follow Our Journal
              </h4>
              <div className="flex justify-between text-primary">
                <a
                  href="#"
                  className="p-3 border border-primary/10 hover:border-secondary hover:text-secondary transition-colors"
                >
                  <FaInstagram className="text-lg" />
                </a>
                <a
                  href="#"
                  className="p-3 border border-primary/10 hover:border-secondary hover:text-secondary transition-colors"
                >
                  <ImPinterest2 className="text-lg" />
                </a>
                <a
                  href="#"
                  className="p-3 border border-primary/10 hover:border-secondary hover:text-secondary transition-colors"
                >
                  <FaTwitter className="text-lg" />
                </a>
                <a
                  href="#"
                  className="p-3 border border-primary/10 hover:border-secondary hover:text-secondary transition-colors"
                >
                  <FaFacebookF className="text-lg" />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-primary/15">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-primary italic"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 400,
                }}
              >
                Related Stories You May Like
              </h2>
              <Link
                href="/posts"
                className="text-xs uppercase tracking-widest text-primary border-b border-primary hover:text-secondary hover:border-secondary transition-colors font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                View All Posts &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relPost) => (
                <article key={relPost.slug} className="group flex flex-col cursor-pointer">
                  <Link href={`/posts/${relPost.slug}`} className="flex flex-col h-full">
                    <div className="relative h-[240px] overflow-hidden bg-surface-container border border-primary/10 mb-4">
                      <div
                        className="absolute inset-0 bg-cover bg-center image-zoom"
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
                      className="text-primary text-xl group-hover:text-secondary transition-colors mb-2 leading-snug"
                      style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
                    >
                      {relPost.title}
                    </h3>
                    <span
                      className="text-on-surface-variant italic text-xs mt-auto pt-2"
                      style={{ fontFamily: "Literata, serif" }}
                    >
                      {relPost.readTime}
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
