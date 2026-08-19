'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ProductItem } from '@/types/product';
import DeleteModal from './DeleteModal';

interface ProductTableProps {
  products: ProductItem[];
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  }, [deleteTarget, onDelete]);

  if (products.length === 0) {
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
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.4 }}>🛍️</div>
        <h3
          style={{
            margin: '0 0 8px',
            color: '#e6edf3',
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          No products in showcase yet
        </h3>
        <p
          style={{
            margin: '0 0 24px',
            color: '#8b949e',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          }}
        >
          Add products to feature in the &ldquo;Best Sellers &amp; Top-Rated&rdquo; homepage carousel.
        </p>
        <Link
          href="/admin/products/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #ffa41c, #ff6200)',
            border: '1px solid #ff6200',
            borderRadius: '6px',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          + Add First Product
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
            gridTemplateColumns: '64px 1fr 150px 120px 110px 110px',
            gap: '0',
            padding: '0 20px',
            borderBottom: '1px solid #30363d',
            background: '#161b22',
          }}
        >
          {['', 'Product Title', 'Badge', 'Price', 'Rating', 'Actions'].map((h) => (
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
        {products.map((product, idx) => {
          const isBestSeller = product.badgeType === 'BEST SELLER';

          return (
            <div
              key={product.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr 150px 120px 110px 110px',
                gap: '0',
                padding: '0 20px',
                borderBottom: idx < products.length - 1 ? '1px solid #21262d' : 'none',
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
                    height: '48px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#0d1117',
                    border: '1px solid #30363d',
                    flexShrink: 0,
                  }}
                >
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', opacity: 0.3 }}>🛍️</div>
                  )}
                </div>
              </div>

              {/* Title & Amazon Link */}
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
                  title={product.title}
                >
                  {product.title}
                </div>
                <div
                  style={{
                    color: '#8b949e',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {product.features?.length || 0} features &bull;{' '}
                  <a
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffa41c', textDecoration: 'none' }}
                  >
                    Amazon Link ↗
                  </a>
                </div>
              </div>

              {/* Badge */}
              <div style={{ padding: '12px 8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: isBestSeller ? 'rgba(255,164,28,0.12)' : 'rgba(59,130,246,0.12)',
                    border: `1px solid ${isBestSeller ? 'rgba(255,164,28,0.35)' : 'rgba(59,130,246,0.3)'}`,
                    color: isBestSeller ? '#ffa41c' : '#60a5fa',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {isBestSeller ? '🔥 BEST SELLER' : '⭐ TOP RATED'}
                </span>
              </div>

              {/* Price */}
              <div style={{ padding: '12px 8px' }}>
                <span
                  style={{
                    color: '#e6edf3',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {product.priceText}
                </span>
              </div>

              {/* Rating */}
              <div style={{ padding: '12px 8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#f59e0b', fontSize: '12px' }}>★</span>
                  <span style={{ color: '#e6edf3', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600 }}>
                    {product.rating}
                  </span>
                  <span style={{ color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '10px' }}>
                    {product.reviewCount ? `(${product.reviewCount.replace(/[()]/g, '')})` : ''}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ padding: '12px 8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  title="Edit product"
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
                    (e.currentTarget as HTMLElement).style.color = '#ffa41c';
                    (e.currentTarget as HTMLElement).style.borderColor = '#ffa41c';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,164,28,0.1)';
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
                  title="Delete product"
                  onClick={() => setDeleteTarget(product)}
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
          );
        })}
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
