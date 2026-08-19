'use client';

import { useState, useEffect } from 'react';
import { loadHeroContent } from '@/lib/heroStore';
import { HeroContent } from '@/types/hero';
import HeroForm from '@/components/admin/HeroForm';

export default function AdminHeroPage() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHero(loadHeroContent());
    setMounted(true);
  }, []);

  if (!mounted || !hero) return null;

  return (
    <div>
      {/* Page header */}
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
          Hero Spotlight Overlay Card
        </h1>
        <p
          style={{
            margin: 0,
            color: '#8b949e',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          }}
        >
          Configure the featured editorial card that overlays the main homepage banner image.
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderBottom: '1px solid #21262d', marginBottom: '28px' }} />

      <HeroForm initialData={hero} />
    </div>
  );
}
