'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_SECTIONS = [
  {
    title: 'Editorial Blog',
    items: [
      { label: 'All Blogs', href: '/admin/blogs', icon: '▦' },
      { label: 'New Post', href: '/admin/blogs/new', icon: '+' },
    ],
  },
  {
    title: 'Showcase Store',
    items: [
      { label: 'Products Showcase', href: '/admin/products', icon: '🛍' },
      { label: 'Add Product', href: '/admin/products/new', icon: '+' },
    ],
  },
  {
    title: 'Homepage & Appearance',
    items: [
      { label: 'Hero Spotlight', href: '/admin/hero', icon: '✦' },
      { label: 'Settings', href: '/admin/settings', icon: '⚙' },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (href !== '/admin/blogs' && href !== '/admin/products' && href !== '/admin/hero' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside
      style={{
        width: '240px',
        minHeight: '100vh',
        background: '#161b22',
        borderRight: '1px solid #30363d',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {/* Brand */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid #21262d' }}>
        <Link href="/" target="_blank" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              data-r="logo"
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #ffa41c, #ff6200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              O
            </div>
            <div>
              <div style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                OwnFashion
              </div>
              <div style={{ color: '#8b949e', fontSize: '11px', fontWeight: 400, marginTop: '1px' }}>
                Admin Panel
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {NAV_SECTIONS.map((sec) => (
          <div key={sec.title}>
            <div
              style={{
                color: '#8b949e',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '8px',
                paddingLeft: '8px',
              }}
            >
              {sec.title}
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {sec.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: active ? 600 : 400,
                        color: active ? '#e6edf3' : '#8b949e',
                        background: active ? '#21262d' : 'transparent',
                        border: active ? '1px solid #30363d' : '1px solid transparent',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = '#c9d1d9';
                          (e.currentTarget as HTMLElement).style.background = '#1c2128';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLElement).style.color = '#8b949e';
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }
                      }}
                    >
                      <span
                        style={{
                          width: '18px',
                          fontSize: item.icon === '+' ? '18px' : '13px',
                          textAlign: 'center',
                          color: active ? '#ffa41c' : '#8b949e',
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                      {active && (
                        <span
                          data-r="50p"
                          style={{
                            marginLeft: 'auto',
                            width: '6px',
                            height: '6px',
                            background: '#ffa41c',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer — view public site */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid #21262d' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 10px',
            textDecoration: 'none',
            fontSize: '12px',
            color: '#8b949e',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#c9d1d9'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8b949e'; }}
        >
          <span style={{ fontSize: '12px' }}>↗</span>
          View Public Site
        </Link>
      </div>
    </aside>
  );
}
