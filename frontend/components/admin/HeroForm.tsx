'use client';

import { useState } from 'react';
import { HeroContent } from '@/types/hero';
import { DEFAULT_HERO_CONTENT, saveHeroContent, resetHeroContent, clearHeroContent } from '@/lib/heroStore';
import { useToast } from '@/components/admin/ToastProvider';

interface HeroFormProps {
  initialData: HeroContent;
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

export default function HeroForm({ initialData }: HeroFormProps) {
  const { showToast } = useToast();

  const [form, setForm] = useState<HeroContent>({
    title: initialData.title || '',
    description: initialData.description || '',
    buttonText: initialData.buttonText || '',
    buttonLink: initialData.buttonLink || '',
    isVisible: initialData.isVisible !== false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      saveHeroContent(form);
      showToast('Hero spotlight card updated successfully!', 'success');
    } catch {
      showToast('Failed to update hero card.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    const def = resetHeroContent();
    setForm(def);
    showToast('Hero spotlight reset to default.', 'info');
  };

  const handleClear = () => {
    const empty = clearHeroContent();
    setForm(empty);
    showToast('Hero card cleared & hidden.', 'info');
  };

  const fieldFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = '#ffa41c';
    (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(255,164,28,0.15)';
  };
  const fieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = '#30363d';
    (e.target as HTMLElement).style.boxShadow = 'none';
  };

  return (
    <form onSubmit={handleSave}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' }}>

        {/* ── Left Column: Form Inputs ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Heading */}
          <div>
            <label style={labelStyle} htmlFor="hero-title">Heading (Title) *</label>
            <input
              id="hero-title"
              type="text"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              placeholder="e.g. The Art of Subtlety: Spring Collection"
              style={{ ...inputStyle, fontSize: '15px', padding: '12px 14px' }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle} htmlFor="hero-description">
              Paragraph (Short Description / Subtext)
            </label>
            <textarea
              id="hero-description"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              onFocus={fieldFocus}
              onBlur={fieldBlur}
              rows={4}
              placeholder="e.g. Discover curated minimalist elegance, structural tailoring, and timeless seasonal essentials."
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
            />
          </div>

          {/* Button Text & Link in 2 columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle} htmlFor="hero-btn-text">Button Text</label>
              <input
                id="hero-btn-text"
                type="text"
                value={form.buttonText}
                onChange={(e) => setForm((prev) => ({ ...prev, buttonText: e.target.value }))}
                onFocus={fieldFocus}
                onBlur={fieldBlur}
                placeholder="e.g. Explore Collection"
                style={{ ...inputStyle }}
              />
            </div>

            <div>
              <label style={labelStyle} htmlFor="hero-btn-link">Button Target URL / Link</label>
              <input
                id="hero-btn-link"
                type="text"
                value={form.buttonLink}
                onChange={(e) => setForm((prev) => ({ ...prev, buttonLink: e.target.value }))}
                onFocus={fieldFocus}
                onBlur={fieldBlur}
                placeholder="e.g. /posts or /posts/my-slug"
                style={{ ...inputStyle }}
              />
            </div>
          </div>

          {/* Visibility Toggle Card */}
          <div
            style={{
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '8px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ color: '#e6edf3', fontSize: '13px', fontWeight: 600 }}>Card Visibility</div>
              <div style={{ color: '#8b949e', fontSize: '12px', marginTop: '2px' }}>
                Toggle to show or hide the overlay spotlight card on the homepage banner
              </div>
            </div>
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, isVisible: !prev.isVisible }))}
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                border: 'none',
                background: form.isVisible ? '#ffa41c' : '#30363d',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
              aria-pressed={form.isVisible}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: form.isVisible ? '22px' : '2px',
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

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '12px 28px',
                background: 'linear-gradient(135deg, #ffa41c, #ff6200)',
                border: '1px solid #ff6200',
                borderRadius: '6px',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(255,164,28,0.25)',
              }}
            >
              {isSubmitting ? 'Saving…' : '✓ Save Changes'}
            </button>

            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: '12px 20px',
                background: '#21262d',
                border: '1px solid #30363d',
                borderRadius: '6px',
                color: '#8b949e',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#e6edf3'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8b949e'; }}
            >
              ↺ Reset to Default
            </button>

            <button
              type="button"
              onClick={handleClear}
              style={{
                padding: '12px 20px',
                background: 'transparent',
                border: '1px solid #30363d',
                borderRadius: '6px',
                color: '#ef4444',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              Hide / Clear Card
            </button>
          </div>
        </div>

        {/* ── Right Column: Live Visual Preview ── */}
        <div>
          <div
            style={{
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#e6edf3', fontSize: '13px', fontWeight: 600 }}>
                Live Card Preview
              </h3>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  background: form.isVisible ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                  color: form.isVisible ? '#4ade80' : '#ef4444',
                }}
              >
                {form.isVisible ? 'Visible' : 'Hidden'}
              </span>
            </div>

            {/* Simulated Hero Card with exact beige aesthetic */}
            <div
              style={{
                position: 'relative',
                background: '#21262d',
                borderRadius: '6px',
                padding: '24px 16px',
                backgroundImage: "url('/images/ownfashion-hero.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '260px',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              {form.isVisible && (form.title || form.description || form.buttonText) ? (
                <div
                  style={{
                    background: '#fed488',
                    padding: '16px',
                    border: '1px solid rgba(0,0,0,0.15)',
                    width: '100%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  {form.title && (
                    <div
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        color: '#000',
                        fontSize: '16px',
                        lineHeight: 1.25,
                        marginBottom: '8px',
                      }}
                    >
                      {form.title}
                    </div>
                  )}

                  {form.description && (
                    <div
                      style={{
                        fontFamily: 'Literata, Georgia, serif',
                        color: '#785a1a',
                        fontSize: '11px',
                        lineHeight: 1.4,
                        marginBottom: '10px',
                      }}
                    >
                      {form.description}
                    </div>
                  )}

                  {form.buttonText && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'Hanken Grotesk, sans-serif',
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#000',
                        borderBottom: '1px solid #000',
                        paddingBottom: '2px',
                      }}
                    >
                      {form.buttonText} &rarr;
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#8b949e',
                    fontSize: '12px',
                    padding: '20px',
                    borderRadius: '4px',
                  }}
                >
                  Overlay card is currently hidden
                </div>
              )}
            </div>
            <p style={{ margin: '12px 0 0', color: '#8b949e', fontSize: '11px', lineHeight: 1.4 }}>
              Preview shows heading, subtext, and action button with exact editorial styling.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
