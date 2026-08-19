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
          Settings
        </h1>
        <p style={{ margin: 0, color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
          Configure blog settings, default affiliate tags, and metadata.
        </p>
      </div>

      {/* Settings Card */}
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
            }}
          />
          <span style={{ fontSize: '12px', color: '#484f58', marginTop: '4px', display: 'block' }}>
            Used for automatic affiliate link formatting across editorial stories.
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
            }}
          />
        </div>

        <div style={{ paddingTop: '12px', borderTop: '1px solid #21262d' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#8b949e', fontSize: '13px' }}>
            <span>ℹ</span> Global settings customization will be enabled in upcoming releases.
          </div>
        </div>
      </div>
    </div>
  );
}
