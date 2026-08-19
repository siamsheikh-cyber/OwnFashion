'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/adminStore';
import { AdminBlogPost } from '@/types/admin';
import { useToast } from '@/components/admin/ToastProvider';
import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSubmitting(true);
    try {
      const newPost = createPost(data);
      showToast(`"${newPost.title}" published successfully!`, 'success');
      router.push('/admin/blogs');
    } catch {
      showToast('Failed to create post. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
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
          Create New Post
        </h1>
        <p
          style={{
            margin: 0,
            color: '#8b949e',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          }}
        >
          Fill in the details below and click &ldquo;Publish Post&rdquo; when ready.
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderBottom: '1px solid #21262d', marginBottom: '28px' }} />

      <BlogForm mode="create" onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
