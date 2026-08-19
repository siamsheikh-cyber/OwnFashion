import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { ToastProvider } from '@/components/admin/ToastProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Admin — OwnFashion',
  description: 'OwnFashion Blog Management Admin Dashboard',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="admin-root"
      className={inter.variable}
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0f1117',
        color: '#e6edf3',
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <style>{`
        /* ── Admin scoped overrides ─────────────────────────────────────────
           globals.css sets border-radius: 0 !important on all elements.
           The #admin-root ID selector has higher specificity than the bare *
           selector, so these !important rules win inside the admin panel. ── */

        #admin-root * {
          font-family: var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif;
          box-sizing: border-box;
        }

        /* General 6px radius for common interactive elements */
        #admin-root button,
        #admin-root input,
        #admin-root select,
        #admin-root textarea,
        #admin-root a[style],
        #admin-root li a,
        #admin-root [data-r="6"] {
          border-radius: 6px !important;
        }

        /* 4px radius — badges, chips */
        #admin-root [data-r="4"] { border-radius: 4px !important; }

        /* 8px radius — secondary panels */
        #admin-root [data-r="8"] { border-radius: 8px !important; }

        /* 10px radius — table container */
        #admin-root [data-r="10"] { border-radius: 10px !important; }

        /* 12px radius — modal */
        #admin-root [data-r="12"] { border-radius: 12px !important; }

        /* 50% — circles (toggle thumb, avatar, icon circles) */
        #admin-root [data-r="50p"] { border-radius: 50% !important; }

        /* Full pill */
        #admin-root [data-r="full"],
        #admin-root .rounded-full { border-radius: 9999px !important; }

        /* Brand logo box */
        #admin-root [data-r="logo"] { border-radius: 6px !important; }

        /* Date picker indicator */
        #admin-root input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.5);
          cursor: pointer;
        }

        /* Scrollbar styling for admin */
        #admin-root ::-webkit-scrollbar { width: 6px; height: 6px; }
        #admin-root ::-webkit-scrollbar-track { background: transparent; }
        #admin-root ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px !important; }
        #admin-root ::-webkit-scrollbar-thumb:hover { background: #484f58; }
      `}</style>

      <ToastProvider>
        <AdminSidebar />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            overflowX: 'hidden',
          }}
        >
          <AdminTopbar />
          <main style={{ flex: 1, padding: '32px 28px' }}>
            {children}
          </main>
        </div>
      </ToastProvider>
    </div>
  );
}
