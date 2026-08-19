'use client';

import Link from 'next/link';

export default function AdminSettingsPage() {
  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Page Header */}
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
          Settings &amp; Appearance
        </h1>
        <p style={{ margin: 0, color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          Configure editorial metadata, homepage spotlights, and affiliate defaults.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Hero Spotlight Quick Card */}
        <div
          data-r="8"
          style={{
            background: '#1c2128',
            border: '1px solid #30363d',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div>
            <div style={{ color: '#e6edf3', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
              ✦ Homepage Hero Spotlight Overlay Card
            </div>
            <div style={{ color: '#8b949e', fontSize: '13px', lineHeight: 1.4 }}>
              Customize the heading, subtext description, and call-to-action button displayed over the homepage banner.
            </div>
          </div>
          <Link
            href="/admin/hero"
            style={{
              padding: '9px 18px',
              background: 'linear-gradient(135deg, #ffa41c, #ff6200)',
              border: '1px solid #ff6200',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Configure Hero Card &rarr;
          </Link>
        </div>

        {/* Global Configuration Card */}
        <div
          data-r="8"
          style={{
            background: '#1c2128',
            border: '1px solid #30363d',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <h2 style={{ margin: 0, color: '#e6edf3', fontSize: '15px', fontWeight: 600 }}>
            Default Affiliate &amp; Category Settings
          </h2>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                color: '#8b949e',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Default Amazon Associate Tag
            </label>
            <input
              type="text"
              defaultValue="ownfashion-20"
              disabled
              style={{
                width: '100%',
                padding: '10px 14px',
                background: '#0d1117',
                border: '1px solid #30363d',
                color: '#8b949e',
                fontSize: '14px',
                cursor: 'not-allowed',
                boxSizing: 'border-box',
              }}
            />
            <span style={{ fontSize: '12px', color: '#484f58', marginTop: '4px', display: 'block' }}>
              Used for automatic affiliate link tracking across editorial stories.
            </span>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                color: '#8b949e',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Default Blog Category
            </label>
            <input
              type="text"
              defaultValue="TRENDY WEAR"
              disabled
              style={{
                width: '100%',
                padding: '10px 14px',
                background: '#0d1117',
                border: '1px solid #30363d',
                color: '#8b949e',
                fontSize: '14px',
                cursor: 'not-allowed',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ paddingTop: '12px', borderTop: '1px solid #21262d' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8b949e', fontSize: '13px' }}>
              <span>ℹ</span> Live customization for all sections is available directly in their respective admin panels.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
