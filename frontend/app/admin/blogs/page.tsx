'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { AdminBlogPost } from '@/types/admin';
import { loadPosts, deletePost } from '@/lib/adminStore';
import { useToast } from '@/components/admin/ToastProvider';
import BlogTable from '@/components/admin/BlogTable';

export default function AdminBlogsPage() {
  const { showToast } = useToast();
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPosts(loadPosts());
    setMounted(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    const post = posts.find((p) => p.id === id);
    deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast(`"${post?.title || 'Post'}" deleted successfully.`, 'success');
  }, [posts, showToast]);

  // Collect unique categories from posts
  const categories = ['ALL', ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((p) => {
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    const q = search.toLowerCase();
    const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <div>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1
            style={{
              margin: '0 0 6px',
              color: '#e6edf3',
              fontFamily: 'Inter, sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            All Blog Posts
          </h1>
          <p style={{ margin: 0, color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            {posts.length} post{posts.length !== 1 ? 's' : ''} total
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            border: '1px solid #2563eb',
            borderRadius: '6px',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(59,130,246,0.25)',
            transition: 'opacity 0.15s, transform 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.9';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          <span style={{ fontSize: '18px', lineHeight: 1, fontWeight: 300 }}>+</span>
          Create New Blog
        </Link>
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        {[
          { label: 'Total Posts', value: posts.length, color: '#3b82f6' },
          { label: 'Featured', value: posts.filter((p) => p.featured).length, color: '#f59e0b' },
          { label: 'With Affiliate', value: posts.filter((p) => p.amazonAffiliateUrl).length, color: '#22c55e' },
          { label: 'Categories', value: categories.length - 1, color: '#8b5cf6' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '8px',
              padding: '16px 20px',
            }}
          >
            <div style={{ color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
              {stat.label}
            </div>
            <div style={{ color: stat.color, fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '340px' }}>
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#484f58',
              fontSize: '14px',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts…"
            style={{
              width: '100%',
              padding: '9px 14px 9px 36px',
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '6px',
              color: '#e6edf3',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; }}
            onBlur={(e) => { e.target.style.borderColor = '#30363d'; }}
          />
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '7px 14px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: categoryFilter === cat ? '#3b82f6' : '#30363d',
                background: categoryFilter === cat ? 'rgba(59,130,246,0.12)' : 'transparent',
                color: categoryFilter === cat ? '#60a5fa' : '#8b949e',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result count */}
        {(search || categoryFilter !== 'ALL') && (
          <span style={{ color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '12px', marginLeft: 'auto' }}>
            {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Table */}
      <BlogTable posts={filteredPosts} onDelete={handleDelete} />
    </div>
  );
}
