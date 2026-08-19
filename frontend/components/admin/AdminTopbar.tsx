'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BREADCRUMBS: Record<string, { label: string; parent?: string; parentHref?: string }> = {
  '/admin':               { label: 'Dashboard' },
  '/admin/blogs':         { label: 'All Blogs', parent: 'Dashboard', parentHref: '/admin' },
  '/admin/blogs/new':     { label: 'New Post', parent: 'All Blogs', parentHref: '/admin/blogs' },
  '/admin/blogs/edit':    { label: 'Edit Post', parent: 'All Blogs', parentHref: '/admin/blogs' },
  '/admin/products':      { label: 'Products Showcase', parent: 'Dashboard', parentHref: '/admin' },
  '/admin/products/new':  { label: 'Add Product', parent: 'Products', parentHref: '/admin/products' },
  '/admin/products/edit': { label: 'Edit Product', parent: 'Products', parentHref: '/admin/products' },
  '/admin/settings':      { label: 'Settings', parent: 'Dashboard', parentHref: '/admin' },
};

export default function AdminTopbar() {
  const pathname = usePathname();

  // Match dynamic edit routes
  const isBlogEdit = pathname.startsWith('/admin/blogs/edit/');
  const isProductEdit = pathname.startsWith('/admin/products/edit/');
  const routeKey = isBlogEdit ? '/admin/blogs/edit' : isProductEdit ? '/admin/products/edit' : pathname;
  const crumb = BREADCRUMBS[routeKey] || { label: 'Admin' };

  const isProductsSection = pathname.startsWith('/admin/products');

  return (
    <header
      style={{
        height: '60px',
        background: '#161b22',
        borderBottom: '1px solid #30363d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Breadcrumbs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {crumb.parent && crumb.parentHref && (
          <>
            <Link
              href={crumb.parentHref}
              style={{
                color: '#8b949e',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c9d1d9'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8b949e'; }}
            >
              {crumb.parent}
            </Link>
            <span style={{ color: '#30363d', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>/</span>
          </>
        )}
        <span
          style={{
            color: '#e6edf3',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {crumb.label}
        </span>
      </nav>

      {/* Quick action buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isProductsSection ? (
          <Link
            href="/admin/products/new"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: 'linear-gradient(135deg, #ffa41c, #ff6200)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '6px',
              border: '1px solid #ff6200',
              transition: 'opacity 0.15s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            <span style={{ fontSize: '16px', lineHeight: 1, fontWeight: 400 }}>+</span>
            Add Product
          </Link>
        ) : (
          <Link
            href="/admin/blogs/new"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              borderRadius: '6px',
              border: '1px solid #2563eb',
              transition: 'opacity 0.15s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            <span style={{ fontSize: '16px', lineHeight: 1, fontWeight: 400 }}>+</span>
            New Post
          </Link>
        )}
      </div>
    </header>
  );
}
