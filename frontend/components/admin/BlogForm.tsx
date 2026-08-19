'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AdminBlogPost } from '@/types/admin';
import { slugify } from '@/lib/adminStore';

interface BlogFormProps {
  mode: 'create' | 'edit';
  initialData?: AdminBlogPost;
  onSubmit: (data: Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isSubmitting?: boolean;
}

const CATEGORIES = ['SEASONAL COMFORT', 'TRENDY WEAR', 'EDITORIAL', 'STYLE GUIDE', 'SHOPPING EDIT'];
const SEASONS = ['SPRING', 'SUMMER', 'FALL', 'WINTER'];

interface FormData {
  title: string;
  slug: string;
  category: string;
  season: string;
  date: string;
  excerpt: string;
  content: string;
  mainImage: string;
  amazonAffiliateUrl: string;
  featured: boolean;
}

interface FormErrors {
  title?: string;
  slug?: string;
  category?: string;
  season?: string;
  date?: string;
  excerpt?: string;
  content?: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: '6px',
  color: '#e6edf3',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.15s',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  color: '#8b949e',
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const errorStyle: React.CSSProperties = {
  marginTop: '5px',
  color: '#ef4444',
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
};

export default function BlogForm({ mode, initialData, onSubmit, isSubmitting }: BlogFormProps) {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<FormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || CATEGORIES[0],
    season: (initialData?.season || 'FALL').toUpperCase(),
    date: initialData?.date || today,
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    mainImage: initialData?.mainImage || '',
    amazonAffiliateUrl: initialData?.amazonAffiliateUrl || '',
    featured: initialData?.featured ?? false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === 'edit');
  const [imagePreview, setImagePreview] = useState(initialData?.mainImage || '');

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && form.title) {
      setForm((prev) => ({ ...prev, slug: slugify(form.title) }));
    }
  }, [form.title, slugManuallyEdited]);

  const set = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = 'Title is required.';
    if (!form.slug.trim()) e.slug = 'Slug is required.';
    if (!form.category) e.category = 'Category is required.';
    if (!form.season) e.season = 'Season is required.';
    if (!form.date) e.date = 'Date is required.';
    if (!form.excerpt.trim()) e.excerpt = 'Excerpt is required.';
    if (!form.content.trim()) e.content = 'Content is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form });
  };

  const fieldFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = '#3b82f6';
    (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)';
  };
  const fieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    (e.target as HTMLElement).style.borderColor = '#30363d';
    (e.target as HTMLElement).style.boxShadow = 'none';
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

        {/* ── Left column — main fields ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Title */}
          <div>
            <label style={labelStyle} htmlFor="bf-title">Title *</label>
            <input
              id="bf-title"
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              placeholder="Enter a compelling post title…"
              style={{ ...inputStyle, fontSize: '16px', padding: '12px 14px', borderColor: errors.title ? '#ef4444' : '#30363d' }}
            />
            {errors.title && <p style={errorStyle}>{errors.title}</p>}
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle} htmlFor="bf-slug">
              Slug * &nbsp;<span style={{ textTransform: 'none', fontWeight: 400, color: '#484f58' }}>— auto-generated from title</span>
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: '#484f58', fontFamily: 'Inter, monospace', fontSize: '13px', whiteSpace: 'nowrap' }}>
                /posts/
              </span>
              <input
                id="bf-slug"
                type="text"
                value={form.slug}
                onChange={(e) => { setSlugManuallyEdited(true); set('slug', e.target.value); }}
                onFocus={fieldFocus}
                onBlur={fieldBlur}
                placeholder="url-friendly-slug"
                style={{ ...inputStyle, fontFamily: 'monospace', borderColor: errors.slug ? '#ef4444' : '#30363d' }}
              />
            </div>
            {errors.slug && <p style={errorStyle}>{errors.slug}</p>}
          </div>

          {/* Excerpt */}
          <div>
            <label style={labelStyle} htmlFor="bf-excerpt">
              Excerpt * &nbsp;<span style={{ textTransform: 'none', fontWeight: 400, color: '#484f58' }}>— short summary for cards</span>
            </label>
            <textarea
              id="bf-excerpt"
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              placeholder="Write a 1–2 sentence excerpt that will appear on blog listing cards…"
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, borderColor: errors.excerpt ? '#ef4444' : '#30363d' }}
            />
            {errors.excerpt && <p style={errorStyle}>{errors.excerpt}</p>}
          </div>

          {/* Content */}
          <div>
            <label style={labelStyle} htmlFor="bf-content">
              Content * &nbsp;<span style={{ textTransform: 'none', fontWeight: 400, color: '#484f58' }}>— HTML or Markdown accepted</span>
            </label>
            <textarea
              id="bf-content"
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              placeholder={'<h2>Introduction</h2>\n<p>Your full post content goes here…</p>'}
              rows={18}
              style={{
                ...inputStyle,
                resize: 'vertical',
                lineHeight: 1.7,
                fontFamily: '"Fira Code", "Cascadia Code", monospace',
                fontSize: '13px',
                borderColor: errors.content ? '#ef4444' : '#30363d',
              }}
            />
            {errors.content && <p style={errorStyle}>{errors.content}</p>}
          </div>
        </div>

        {/* ── Right column — meta & settings ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Publish / Status panel */}
          <div
            style={{
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 16px', color: '#e6edf3', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600 }}>
              Publish
            </h3>

            {/* Category */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle} htmlFor="bf-category">Category *</label>
              <div style={{ position: 'relative' }}>
                <select
                  id="bf-category"
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  onFocus={fieldFocus}
                  onBlur={fieldBlur}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    cursor: 'pointer',
                    borderColor: errors.category ? '#ef4444' : '#30363d',
                  }}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  <option value="OTHER">OTHER</option>
                </select>
                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8b949e', pointerEvents: 'none', fontSize: '12px' }}>▾</span>
              </div>
              {errors.category && <p style={errorStyle}>{errors.category}</p>}
            </div>

            {/* Season */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle} htmlFor="bf-season">Season *</label>
              <div style={{ position: 'relative' }}>
                <select
                  id="bf-season"
                  value={form.season}
                  onChange={(e) => set('season', e.target.value)}
                  onFocus={fieldFocus}
                  onBlur={fieldBlur}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    cursor: 'pointer',
                    borderColor: errors.season ? '#ef4444' : '#30363d',
                  }}
                >
                  {SEASONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8b949e', pointerEvents: 'none', fontSize: '12px' }}>▾</span>
              </div>
              {errors.season && <p style={errorStyle}>{errors.season}</p>}
            </div>

            {/* Date */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle} htmlFor="bf-date">Publish Date *</label>
              <input
                id="bf-date"
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                onFocus={fieldFocus}
                onBlur={fieldBlur}
                style={{ ...inputStyle, colorScheme: 'dark', borderColor: errors.date ? '#ef4444' : '#30363d' }}
              />
              {errors.date && <p style={errorStyle}>{errors.date}</p>}
            </div>

            {/* Featured toggle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderTop: '1px solid #21262d',
              }}
            >
              <div>
                <div style={{ color: '#c9d1d9', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500 }}>Featured Post</div>
                <div style={{ color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '12px', marginTop: '2px' }}>Show on homepage</div>
              </div>
              <button
                type="button"
                id="bf-featured"
                onClick={() => set('featured', !form.featured)}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: form.featured ? '#3b82f6' : '#30363d',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
                aria-pressed={form.featured}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: form.featured ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  }}
                />
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div
            style={{
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 16px', color: '#e6edf3', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600 }}>
              Main Image
            </h3>
            <label style={labelStyle} htmlFor="bf-image">Image URL</label>
            <input
              id="bf-image"
              type="url"
              value={form.mainImage}
              onChange={(e) => { set('mainImage', e.target.value); setImagePreview(e.target.value); }}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              placeholder="https://images.unsplash.com/…"
              style={{ ...inputStyle }}
            />
            {imagePreview && (
              <div
                style={{
                  marginTop: '12px',
                  height: '160px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: '#0d1117',
                  border: '1px solid #30363d',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setImagePreview('')}
                />
              </div>
            )}
          </div>

          {/* Amazon Affiliate */}
          <div
            style={{
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 4px', color: '#e6edf3', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600 }}>
              Amazon Affiliate
            </h3>
            <p style={{ margin: '0 0 16px', color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>
              Primary product link for this post
            </p>
            <label style={labelStyle} htmlFor="bf-amazon">Affiliate URL</label>
            <input
              id="bf-amazon"
              type="url"
              value={form.amazonAffiliateUrl}
              onChange={(e) => set('amazonAffiliateUrl', e.target.value)}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              placeholder="https://www.amazon.com/dp/…?tag=…"
              style={{ ...inputStyle }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px',
                background: isSubmitting ? '#1f6feb' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                border: '1px solid #2563eb',
                borderRadius: '6px',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.15s',
                opacity: isSubmitting ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>⟳</span>
                  Saving…
                </>
              ) : (
                mode === 'create' ? '✓ Publish Post' : '✓ Save Changes'
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push('/admin/blogs')}
              style={{
                width: '100%',
                padding: '11px',
                background: 'transparent',
                border: '1px solid #30363d',
                borderRadius: '6px',
                color: '#8b949e',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
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
              Cancel
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
