'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ProductItem, ProductItemDraft, BadgeType } from '@/types/product';

interface ProductFormProps {
  mode: 'create' | 'edit';
  initialData?: ProductItem;
  onSubmit: (data: ProductItemDraft) => void;
  isSubmitting?: boolean;
}

interface FormErrors {
  title?: string;
  priceText?: string;
  badgeType?: string;
  rating?: string;
  reviewCount?: string;
  reviewQuote?: string;
  image?: string;
  amazonUrl?: string;
  features?: string;
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

export default function ProductForm({ mode, initialData, onSubmit, isSubmitting }: ProductFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<ProductItemDraft>({
    title: initialData?.title || '',
    priceText: initialData?.priceText || '',
    badgeType: initialData?.badgeType || 'BEST SELLER',
    rating: initialData?.rating ?? 4.8,
    reviewCount: initialData?.reviewCount || '(2.5k reviews)',
    reviewQuote: initialData?.reviewQuote || '',
    features: initialData?.features && initialData.features.length > 0 ? [...initialData.features] : [''],
    image: initialData?.image || '',
    amazonUrl: initialData?.amazonUrl || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');

  const set = useCallback(<K extends keyof ProductItemDraft>(key: K, value: ProductItemDraft[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...form.features];
    updated[index] = val;
    set('features', updated);
  };

  const handleAddFeature = () => {
    set('features', [...form.features, '']);
  };

  const handleRemoveFeature = (index: number) => {
    if (form.features.length <= 1) {
      set('features', ['']);
      return;
    }
    const updated = form.features.filter((_, i) => i !== index);
    set('features', updated);
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = 'Product title is required.';
    if (!form.priceText.trim()) e.priceText = 'Price text is required (e.g. $160 Under).';
    if (!form.image.trim()) e.image = 'Product image URL is required.';
    if (!form.amazonUrl.trim()) e.amazonUrl = 'Amazon product URL is required.';
    if (form.rating < 1 || form.rating > 5) e.rating = 'Rating must be between 1.0 and 5.0';
    if (!form.reviewQuote.trim()) e.reviewQuote = 'Customer review quote is required.';
    
    const validFeatures = form.features.filter((f) => f.trim().length > 0);
    if (validFeatures.length === 0) e.features = 'Please add at least 1 feature bullet point.';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const cleanFeatures = form.features.filter((f) => f.trim().length > 0);
    onSubmit({
      ...form,
      features: cleanFeatures.length > 0 ? cleanFeatures : ['Quality craftsmanship', 'Verified Amazon choice'],
    });
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

        {/* ── Left column — Main details ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Title */}
          <div>
            <label style={labelStyle} htmlFor="pf-title">Product Title *</label>
            <input
              id="pf-title"
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              placeholder="e.g. Structured Wool-Blend Blazer"
              style={{ ...inputStyle, fontSize: '15px', padding: '12px 14px', borderColor: errors.title ? '#ef4444' : '#30363d' }}
            />
            {errors.title && <p style={errorStyle}>{errors.title}</p>}
          </div>

          {/* Price Text & Amazon Link in 2-col row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
            <div>
              <label style={labelStyle} htmlFor="pf-price">Price Display *</label>
              <input
                id="pf-price"
                type="text"
                value={form.priceText}
                onChange={(e) => set('priceText', e.target.value)}
                onFocus={fieldFocus}
                onBlur={fieldBlur}
                placeholder="e.g. $130 Under"
                style={{ ...inputStyle, borderColor: errors.priceText ? '#ef4444' : '#30363d' }}
              />
              {errors.priceText && <p style={errorStyle}>{errors.priceText}</p>}
            </div>

            <div>
              <label style={labelStyle} htmlFor="pf-url">Amazon Product Link *</label>
              <input
                id="pf-url"
                type="url"
                value={form.amazonUrl}
                onChange={(e) => set('amazonUrl', e.target.value)}
                onFocus={fieldFocus}
                onBlur={fieldBlur}
                placeholder="https://www.amazon.com/dp/…?tag=ownfashion-20"
                style={{ ...inputStyle, borderColor: errors.amazonUrl ? '#ef4444' : '#30363d' }}
              />
              {errors.amazonUrl && <p style={errorStyle}>{errors.amazonUrl}</p>}
            </div>
          </div>

          {/* Customer Review Quote */}
          <div>
            <label style={labelStyle} htmlFor="pf-quote">
              Customer Review Quote * &nbsp;<span style={{ textTransform: 'none', fontWeight: 400, color: '#484f58' }}>— displayed in italics</span>
            </label>
            <textarea
              id="pf-quote"
              value={form.reviewQuote}
              onChange={(e) => set('reviewQuote', e.target.value)}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              placeholder="e.g. Perfect tailoring. It holds its shape all day and looks incredibly expensive."
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5, borderColor: errors.reviewQuote ? '#ef4444' : '#30363d' }}
            />
            {errors.reviewQuote && <p style={errorStyle}>{errors.reviewQuote}</p>}
          </div>

          {/* Features / Bullet Points */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ ...labelStyle, margin: 0 }}>
                Features &amp; Specifications &nbsp;<span style={{ textTransform: 'none', fontWeight: 400, color: '#484f58' }}>— bullet points</span>
              </label>
              <button
                type="button"
                onClick={handleAddFeature}
                style={{
                  background: 'transparent',
                  border: '1px solid #30363d',
                  color: '#3b82f6',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                + Add Bullet
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {form.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: '#8b949e', fontSize: '13px' }}>•</span>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    onFocus={fieldFocus}
                    onBlur={fieldBlur}
                    placeholder={`e.g. ${idx === 0 ? '100% Organic Linen' : idx === 1 ? 'Tailored oversized fit' : 'Internal zip pocket'}`}
                    style={{ ...inputStyle, padding: '8px 12px' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    title="Remove bullet point"
                    style={{
                      background: '#21262d',
                      border: '1px solid #30363d',
                      color: '#8b949e',
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ef4444'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8b949e'; }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            {errors.features && <p style={errorStyle}>{errors.features}</p>}
          </div>
        </div>

        {/* ── Right column — Badges, Rating, Image ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Badge & Rating Panel */}
          <div
            style={{
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <h3 style={{ margin: '0 0 16px', color: '#e6edf3', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600 }}>
              Showcase Badge &amp; Rating
            </h3>

            {/* Badge Type */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle} htmlFor="pf-badge">Showcase Badge *</label>
              <div style={{ position: 'relative' }}>
                <select
                  id="pf-badge"
                  value={form.badgeType}
                  onChange={(e) => set('badgeType', e.target.value as BadgeType)}
                  onFocus={fieldFocus}
                  onBlur={fieldBlur}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="BEST SELLER">🔥 BEST SELLER</option>
                  <option value="TOP RATED">⭐ TOP RATED</option>
                </select>
                <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8b949e', pointerEvents: 'none', fontSize: '12px' }}>▾</span>
              </div>
            </div>

            {/* Rating Number */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle} htmlFor="pf-rating">Rating (1.0 to 5.0) *</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  id="pf-rating"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={form.rating}
                  onChange={(e) => set('rating', parseFloat(e.target.value) || 4.5)}
                  onFocus={fieldFocus}
                  onBlur={fieldBlur}
                  style={{ ...inputStyle, width: '90px', borderColor: errors.rating ? '#ef4444' : '#30363d' }}
                />
                <span style={{ color: '#f59e0b', fontSize: '14px' }}>★ ★ ★ ★ ★</span>
              </div>
              {errors.rating && <p style={errorStyle}>{errors.rating}</p>}
            </div>

            {/* Review Count Text */}
            <div>
              <label style={labelStyle} htmlFor="pf-review-count">Review Count Display</label>
              <input
                id="pf-review-count"
                type="text"
                value={form.reviewCount}
                onChange={(e) => set('reviewCount', e.target.value)}
                onFocus={fieldFocus}
                onBlur={fieldBlur}
                placeholder="e.g. (3.4k reviews)"
                style={{ ...inputStyle }}
              />
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
              Product Image
            </h3>
            <label style={labelStyle} htmlFor="pf-image">Image URL *</label>
            <input
              id="pf-image"
              type="url"
              value={form.image}
              onChange={(e) => { set('image', e.target.value); setImagePreview(e.target.value); }}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              placeholder="https://images.unsplash.com/…"
              style={{ ...inputStyle, borderColor: errors.image ? '#ef4444' : '#30363d' }}
            />
            {errors.image && <p style={errorStyle}>{errors.image}</p>}

            {imagePreview && (
              <div
                style={{
                  marginTop: '12px',
                  height: '200px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: '#0d1117',
                  border: '1px solid #30363d',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Product preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setImagePreview('')}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px',
                background: isSubmitting ? '#1f6feb' : 'linear-gradient(135deg, #ffa41c, #ff6200)',
                border: '1px solid #ff6200',
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
                mode === 'create' ? '✓ Publish Product' : '✓ Save Changes'
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push('/admin/products')}
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
