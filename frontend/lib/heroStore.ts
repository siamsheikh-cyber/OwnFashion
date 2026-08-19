'use client';

import { useState, useEffect } from 'react';
import { HeroContent } from '@/types/hero';

export const HERO_STORAGE_KEY = 'ownfashion_admin_hero';
export const HERO_UPDATED_EVENT = 'ownfashion_hero_updated';

export const DEFAULT_HERO_CONTENT: HeroContent = {
  title: 'The Art of Subtlety: Spring Collection',
  description: 'Discover curated minimalist elegance, structural tailoring, and timeless seasonal essentials.',
  buttonText: 'Explore Collection',
  buttonLink: '/posts',
  isVisible: true,
};

export function loadHeroContent(): HeroContent {
  if (typeof window === 'undefined') {
    return DEFAULT_HERO_CONTENT;
  }
  try {
    const raw = localStorage.getItem(HERO_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as HeroContent;
      if (parsed && typeof parsed.title === 'string') {
        return {
          title: parsed.title,
          description: parsed.description || '',
          buttonText: parsed.buttonText || 'Explore Collection',
          buttonLink: parsed.buttonLink || '/posts',
          isVisible: parsed.isVisible !== false,
        };
      }
    }
  } catch {
    // corrupted storage — fall through to default
  }
  return DEFAULT_HERO_CONTENT;
}

export function saveHeroContent(content: HeroContent): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(content));
    window.dispatchEvent(new CustomEvent(HERO_UPDATED_EVENT));
  } catch {
    // ignore storage errors
  }
}

export function resetHeroContent(): HeroContent {
  saveHeroContent(DEFAULT_HERO_CONTENT);
  return DEFAULT_HERO_CONTENT;
}

export function clearHeroContent(): HeroContent {
  const empty: HeroContent = {
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    isVisible: false,
  };
  saveHeroContent(empty);
  return empty;
}

/**
 * React hook subscribing to real-time hero content updates.
 */
export function useHeroContent() {
  const [hero, setHero] = useState<HeroContent>(() => {
    if (typeof window !== 'undefined') {
      return loadHeroContent();
    }
    return DEFAULT_HERO_CONTENT;
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHero(loadHeroContent());
    setIsLoaded(true);

    const handleUpdate = () => {
      setHero(loadHeroContent());
    };

    window.addEventListener(HERO_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(HERO_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return { hero, isLoaded };
}
