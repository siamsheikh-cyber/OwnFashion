"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useBlogPosts } from "@/lib/adminStore";

export default function PostsArchivePage() {
  const { posts: allPosts } = useBlogPosts();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedSeason, setSelectedSeason] = useState("ALL SEASONS");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically compute unique categories from store, ensuring default presets are always present
  const categories = useMemo(() => {
    const base = ["ALL", "SEASONAL COMFORT", "TRENDY WEAR"];
    const extra = allPosts
      .map((p) => (p.category || "").trim().toUpperCase())
      .filter((cat) => cat && !base.includes(cat));
    return [...base, ...Array.from(new Set(extra))];
  }, [allPosts]);

  const seasons = ["ALL SEASONS", "SPRING", "SUMMER", "FALL", "WINTER"];

  const formatDateToMeta = (dateStr?: string) => {
    if (!dateStr) return "AUG 11, 2026";
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return dateStr.toUpperCase();
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const filteredPosts = allPosts.filter((post) => {
    const postCategory = (post.category || "").trim().toUpperCase();
    const matchesCategory =
      selectedCategory === "ALL" || postCategory === selectedCategory;

    const selectedSeasonNorm = selectedSeason.trim().toUpperCase();
    const postSeasonNorm = (post.season || "").trim().toUpperCase();
    const matchesSeason =
      selectedSeasonNorm === "ALL SEASONS" ||
      selectedSeasonNorm === "ALL" ||
      postSeasonNorm === selectedSeasonNorm;

    const title = (post.title || "").toLowerCase();
    const category = (post.category || "").toLowerCase();
    const season = (post.season || "").toLowerCase();
    const excerpt = (post.excerpt || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      title.includes(query) ||
      category.includes(query) ||
      season.includes(query) ||
      excerpt.includes(query);

    return matchesCategory && matchesSeason && matchesSearch;
  });

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-[20px] md:px-[40px] pt-12 pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span
            className="text-secondary uppercase tracking-widest text-xs font-semibold block mb-3"
            style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
          >
            Editorial Collection
          </span>
          <h1
            className="text-primary italic mb-4 leading-tight"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(36px, 5vw, 54px)",
              fontWeight: 400,
            }}
          >
            Latest Posts &amp; Stories
          </h1>
          <p
            className="text-on-surface-variant text-base md:text-lg leading-relaxed"
            style={{ fontFamily: "Literata, serif" }}
          >
            Discover our complete archive of seasonal comfort essentials, trendy street style analysis, and curated shopping edits.
          </p>
        </div>

        {/* Filter Bar: Category Tabs, Season Dropdown & Search Box */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-12 pb-6 border-b border-primary/10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white"
                    : "bg-surface-container border border-primary/10 text-on-surface-variant hover:border-secondary hover:text-secondary"
                }`}
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Controls: Season Dropdown + Search Box */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Season Filter Dropdown */}
            <div className="w-full sm:w-48 relative">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 bg-surface border border-primary/15 text-xs text-primary focus:outline-none focus:border-secondary cursor-pointer uppercase tracking-wider font-semibold"
                style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
              >
                {seasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none">
                expand_more
              </span>
            </div>

            {/* Search Box */}
            <div className="w-full sm:w-64 relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface border border-primary/15 text-xs text-primary focus:outline-none focus:border-secondary pr-10"
                style={{ fontFamily: "Literata, serif" }}
              />
              <span
                className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none"
                style={{ fontVariationSettings: '"FILL" 0' }}
              >
                search
              </span>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <article
                key={post.id || post.slug}
                className="group flex flex-col bg-surface border border-primary/10 hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/posts/${post.slug}`} className="flex flex-col h-full p-5">
                  {/* Card Image */}
                  <div className="relative h-[260px] overflow-hidden bg-surface-container border border-primary/10 mb-4">
                    <div
                      className="absolute inset-0 bg-cover bg-center image-zoom"
                      style={{ backgroundImage: `url('${post.mainImage}')` }}
                    />
                  </div>

                  {/* Metadata below image: [CATEGORY] • [SEASON] • [PUBLISH DATE] */}
                  <div className="flex items-center flex-wrap gap-1.5 mb-3">
                    <span
                      className="text-secondary uppercase tracking-widest text-xs font-semibold"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.08em" }}
                    >
                      {post.category}
                    </span>
                    <span className="text-on-surface-variant/40 text-xs font-bold">•</span>
                    <span
                      className="text-secondary uppercase tracking-widest text-xs font-semibold"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.08em" }}
                    >
                      {(post.season || "ALL").toUpperCase()}
                    </span>
                    <span className="text-on-surface-variant/40 text-xs font-bold">•</span>
                    <span
                      className="text-on-surface-variant uppercase tracking-widest text-xs font-semibold"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif", letterSpacing: "0.08em" }}
                    >
                      {formatDateToMeta(post.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-primary text-2xl group-hover:text-secondary transition-colors mb-3 leading-snug"
                    style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
                  >
                    {post.title}
                  </h2>

                  {/* Description / Excerpt */}
                  <p
                    className="text-on-surface-variant text-sm line-clamp-3 mb-6 font-light"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Footer Bar */}
                  <div className="mt-auto pt-4 border-t border-primary/10 flex items-center justify-between">
                    <span
                      className="text-xs uppercase tracking-widest text-primary group-hover:text-secondary font-semibold"
                      style={{ fontFamily: "Hanken Grotesk, sans-serif" }}
                    >
                      Read Full Story &rarr;
                    </span>
                    {post.author && (
                      <span
                        className="text-xs italic text-on-surface-variant"
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        By {post.author.name}
                      </span>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface border border-primary/10">
            <h3
              className="text-primary italic text-2xl mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              No Posts Found
            </h3>
            <p
              className="text-on-surface-variant text-sm"
              style={{ fontFamily: "Literata, serif" }}
            >
              Try adjusting your search terms, category filter, or season filter.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
