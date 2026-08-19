'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { AdminBlogPost } from '@/types/admin';
import DeleteModal from './DeleteModal';

interface BlogTableProps {
  posts: AdminBlogPost[];
  onDelete: (id: string) => void;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '…' : str;
}

export default function BlogTable({ posts, onDelete }: BlogTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<AdminBlogPost | null>(null);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  }, [deleteTarget, onDelete]);

  if (posts.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: '#1c2128',
          border: '1px solid #30363d',
          borderRadius: '10px',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.4 }}>📝</div>
        <h3
          style={{
            margin: '0 0 8px',
            color: '#e6edf3',
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          No blog posts yet
        </h3>
        <p
          style={{
            margin: '0 0 24px',
            color: '#8b949e',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          }}
        >
          Get started by creating your first post.
        </p>
        <Link
          href="/admin/blogs/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            border: '1px solid #2563eb',
            borderRadius: '6px',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          + Create First Post
        </Link>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          background: '#1c2128',
          border: '1px solid #30363d',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '64px 1fr 180px 130px 90px 120px',
            gap: '0',
            padding: '0 20px',
            borderBottom: '1px solid #30363d',
            background: '#161b22',
          }}
        >
          {['', 'Title', 'Category', 'Date', 'Status', 'Actions'].map((h) => (
            <div
              key={h}
              style={{
                padding: '12px 8px',
                color: '#8b949e',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {posts.map((post, idx) => (
          <div
            key={post.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '64px 1fr 180px 130px 90px 120px',
              gap: '0',
              padding: '0 20px',
              borderBottom: idx < posts.length - 1 ? '1px solid #21262d' : 'none',
              alignItems: 'center',
              transition: 'background 0.12s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#21262d'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            {/* Thumbnail */}
            <div style={{ padding: '12px 8px 12px 0' }}>
              <div
                style={{
                  width: '48px',
                  height: '36px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  background: '#0d1117',
                  border: '1px solid #30363d',
                  flexShrink: 0,
                }}
              >
                {post.mainImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.mainImage}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', opacity: 0.3 }}>🖼</div>
                )}
              </div>
            </div>

            {/* Title */}
            <div style={{ padding: '12px 8px', overflow: 'hidden' }}>
              <div
                style={{
                  color: '#e6edf3',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  lineHeight: 1.4,
                  marginBottom: '3px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={post.title}
              >
                {post.title}
              </div>
              <div
                style={{
                  color: '#484f58',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={`/posts/${post.slug}`}
              >
                /posts/{post.slug}
              </div>
            </div>

            {/* Category & Season */}
            <div style={{ padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: '#21262d',
                  border: '1px solid #30363d',
                  color: '#8b949e',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '160px',
                }}
                title={post.category}
              >
                {truncate(post.category, 16)}
              </span>
              {post.season && (
                <span
                  style={{
                    color: '#8b949e',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    opacity: 0.8,
                  }}
                >
                  {post.season}
                </span>
              )}
            </div>

            {/* Date */}
            <div style={{ padding: '12px 8px' }}>
              <span
                style={{
                  color: '#8b949e',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                }}
              >
                {formatDate(post.date)}
              </span>
            </div>

            {/* Status */}
            <div style={{ padding: '12px 8px' }}>
              {post.featured ? (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(59,130,246,0.12)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    color: '#60a5fa',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  ★ Featured
                </span>
              ) : (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.25)',
                    color: '#4ade80',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                >
                  ● Published
                </span>
              )}
            </div>

            {/* Actions */}
            <div style={{ padding: '12px 8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Link
                href={`/admin/blogs/edit/${post.id}`}
                title="Edit post"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: '#21262d',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                  color: '#8b949e',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'all 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#e6edf3';
                  (e.currentTarget as HTMLElement).style.borderColor = '#3b82f6';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#8b949e';
                  (e.currentTarget as HTMLElement).style.borderColor = '#30363d';
                  (e.currentTarget as HTMLElement).style.background = '#21262d';
                }}
              >
                ✎
              </Link>
              <button
                title="Delete post"
                onClick={() => setDeleteTarget(post)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  background: '#21262d',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                  color: '#8b949e',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#ef4444';
                  (e.currentTarget as HTMLElement).style.borderColor = '#ef4444';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#8b949e';
                  (e.currentTarget as HTMLElement).style.borderColor = '#30363d';
                  (e.currentTarget as HTMLElement).style.background = '#21262d';
                }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteTarget && (
        <DeleteModal
          postTitle={deleteTarget.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
