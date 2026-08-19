'use client';

import { useEffect, useRef } from 'react';

interface DeleteModalProps {
  postTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ postTitle, onConfirm, onCancel }: DeleteModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus cancel button on open for accessibility
  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.15s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        style={{
          background: '#1c2128',
          border: '1px solid #30363d',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          animation: 'modalIn 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            fontSize: '20px',
          }}
        >
          🗑
        </div>

        {/* Title */}
        <h2
          style={{
            margin: '0 0 8px',
            color: '#e6edf3',
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          Delete Post
        </h2>

        {/* Body */}
        <p
          style={{
            margin: '0 0 6px',
            color: '#8b949e',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          Are you sure you want to delete
        </p>
        <p
          style={{
            margin: '0 0 28px',
            color: '#e6edf3',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            background: '#21262d',
            border: '1px solid #30363d',
            borderRadius: '6px',
            padding: '10px 14px',
            lineHeight: 1.4,
          }}
        >
          &ldquo;{postTitle}&rdquo;
        </p>
        <p
          style={{
            margin: '0 0 28px',
            color: '#8b949e',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
          }}
        >
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            ref={cancelRef}
            onClick={onCancel}
            style={{
              padding: '9px 20px',
              background: 'transparent',
              border: '1px solid #30363d',
              color: '#8b949e',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '6px',
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
          <button
            onClick={onConfirm}
            style={{
              padding: '9px 20px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              border: '1px solid #dc2626',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            Delete Post
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
