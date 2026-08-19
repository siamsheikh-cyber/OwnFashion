'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ProductItem, BadgeType } from '@/types/product';
import { loadProducts, deleteProduct } from '@/lib/productStore';
import { useToast } from '@/components/admin/ToastProvider';
import ProductTable from '@/components/admin/ProductTable';

export default function AdminProductsPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [search, setSearch] = useState('');
  const [badgeFilter, setBadgeFilter] = useState<'ALL' | BadgeType>('ALL');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProducts(loadProducts());
    setMounted(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    const prod = products.find((p) => p.id === id);
    deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`"${prod?.title || 'Product'}" removed from showcase.`, 'success');
  }, [products, showToast]);

  const bestSellerCount = products.filter((p) => p.badgeType === 'BEST SELLER').length;
  const topRatedCount = products.filter((p) => p.badgeType === 'TOP RATED').length;
  const avgRating = products.length > 0
    ? (products.reduce((acc, p) => acc + (p.rating || 0), 0) / products.length).toFixed(1)
    : '0.0';

  const filteredProducts = products.filter((p) => {
    const matchesBadge = badgeFilter === 'ALL' || p.badgeType === badgeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.priceText.toLowerCase().includes(q) ||
      p.reviewQuote.toLowerCase().includes(q);
    return matchesBadge && matchesSearch;
  });

  if (!mounted) return null;

  return (
    <div>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}
      >
        <div>
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
            Best Sellers &amp; Top-Rated Showcase
          </h1>
          <p style={{ margin: 0, color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            Manage curated products featured in the homepage interactive carousel ({products.length} products total)
          </p>
        </div>

        <Link
          href="/admin/products/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #ffa41c, #ff6200)',
            border: '1px solid #ff6200',
            borderRadius: '6px',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(255,164,28,0.25)',
            transition: 'opacity 0.15s, transform 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '0.9';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.opacity = '1';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          <span style={{ fontSize: '18px', lineHeight: 1, fontWeight: 300 }}>+</span>
          Add New Product
        </Link>
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        {[
          { label: 'Total Products', value: products.length, color: '#ffa41c' },
          { label: 'Best Sellers', value: bestSellerCount, color: '#ff6200' },
          { label: 'Top Rated', value: topRatedCount, color: '#3b82f6' },
          { label: 'Avg Rating', value: `${avgRating} ★`, color: '#f59e0b' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '8px',
              padding: '16px 20px',
            }}
          >
            <div style={{ color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
              {stat.label}
            </div>
            <div style={{ color: stat.color, fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '340px' }}>
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#484f58',
              fontSize: '14px',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            style={{
              width: '100%',
              padding: '9px 14px 9px 36px',
              background: '#1c2128',
              border: '1px solid #30363d',
              borderRadius: '6px',
              color: '#e6edf3',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#ffa41c'; }}
            onBlur={(e) => { e.target.style.borderColor = '#30363d'; }}
          />
        </div>

        {/* Badge Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['ALL', 'BEST SELLER', 'TOP RATED'] as const).map((badge) => {
            const isActive = badgeFilter === badge;
            return (
              <button
                key={badge}
                onClick={() => setBadgeFilter(badge)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: isActive ? '#ffa41c' : '#30363d',
                  background: isActive ? 'rgba(255,164,28,0.12)' : 'transparent',
                  color: isActive ? '#ffa41c' : '#8b949e',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {badge === 'BEST SELLER' ? '🔥 BEST SELLERS' : badge === 'TOP RATED' ? '⭐ TOP RATED' : 'ALL PRODUCTS'}
              </button>
            );
          })}
        </div>

        {/* Result count */}
        {(search || badgeFilter !== 'ALL') && (
          <span style={{ color: '#8b949e', fontFamily: 'Inter, sans-serif', fontSize: '12px', marginLeft: 'auto' }}>
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Table */}
      <ProductTable products={filteredProducts} onDelete={handleDelete} />
    </div>
  );
}
