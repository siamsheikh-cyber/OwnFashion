'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPostById, updatePost } from '@/lib/adminStore';
import { AdminBlogPost } from '@/types/admin';
import { useToast } from '@/components/admin/ToastProvider';
import BlogForm from '@/components/admin/BlogForm';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  const id = params.id as string;

  const [post, setPost] = useState<AdminBlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const found = getPostById(id);
    if (found) {
      setPost(found);
    } else {
      setNotFound(true);
    }
    setMounted(true);
  }, [id]);

  const handleSubmit = async (data: Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSubmitting(true);
    try {
      const updated = updatePost(id, data);
      if (updated) {
        showToast(`"${updated.title}" updated successfully!`, 'success');
        router.push('/admin/blogs');
      } else {
        showToast('Post not found. It may have been deleted.', 'error');
        setIsSubmitting(false);
      }
    } catch {
      showToast('Failed to save changes. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (notFound) {
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
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.4 }}>🔍</div>
        <h2
          style={{
            margin: '0 0 8px',
            color: '#e6edf3',
            fontFamily: 'Inter, sans-serif',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Post Not Found
        </h2>
        <p
          style={{
            margin: '0 0 24px',
            color: '#8b949e',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          }}
        >
          The post with ID &ldquo;{id}&rdquo; could not be found. It may have been deleted.
        </p>
        <button
          onClick={() => router.push('/admin/blogs')}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            border: '1px solid #2563eb',
            borderRadius: '6px',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ← Back to All Blogs
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <button
            onClick={() => router.push('/admin/blogs')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              background: 'transparent',
              border: '1px solid #30363d',
              borderRadius: '5px',
              color: '#8b949e',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#e6edf3';
              (e.currentTarget as HTMLElement).style.borderColor = '#8b949e';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#8b949e';
              (e.currentTarget as HTMLElement).style.borderColor = '#30363d';
            }}
          >
            ← Back
          </button>
          <h1
            style={{
              margin: 0,
              color: '#e6edf3',
              fontFamily: 'Inter, sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Edit Post
          </h1>
        </div>
        {post && (
          <p
            style={{
              margin: 0,
              color: '#484f58',
              fontFamily: 'monospace',
              fontSize: '12px',
            }}
          >
            ID: {post.id}
          </p>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderBottom: '1px solid #21262d', marginBottom: '28px' }} />

      {post && (
        <BlogForm
          mode="edit"
          initialData={post}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
