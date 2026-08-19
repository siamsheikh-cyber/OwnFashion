'use client';

import { useState, useEffect } from 'react';
import { AdminBlogPost } from '@/types/admin';
import { postsData } from '@/lib/postData';

export const STORAGE_KEY = 'ownfashion_admin_blogs';
export const POSTS_UPDATED_EVENT = 'ownfashion_posts_updated';

// Map existing Post data into AdminBlogPost format for seeding
export function seedFromPostsData(): AdminBlogPost[] {
  return postsData.map((post, index) => ({
    id: post.id || `seed-${index + 1}`,
    title: post.title,
    slug: post.slug || slugify(post.title),
    category: post.category || 'TRENDY WEAR',
    date: post.publishedAt || new Date().toISOString().split('T')[0],
    excerpt: post.description || '',
    content: post.contentBlocks
      ? post.contentBlocks
          .map((block) => {
            if (block.type === 'paragraph') return `<p>${block.text}</p>`;
            if (block.type === 'heading') return `<h2>${block.heading}</h2>`;
            if (block.type === 'blockquote') return `<blockquote>${block.text}</blockquote>`;
            if (block.type === 'image') return `<img src="${block.imageUrl}" alt="${block.imageCaption || ''}" />`;
            return '';
          })
          .join('\n')
      : '',
    mainImage: post.image || '',
    amazonAffiliateUrl: post.affiliateProducts?.[0]?.affiliateUrl || '',
    featured: index < 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    season: (post.season || 'FALL').toUpperCase(),
    subtitle: post.subtitle || '',
    readTime: post.readTime || '5 min read',
    author: post.author,
    tags: post.tags,
    affiliateProducts: post.affiliateProducts,
    contentBlocks: post.contentBlocks,
  }));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parsePostDate(dateStr?: string): number {
  if (!dateStr) return 0;
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;
  const cleaned = dateStr.replace(/,/g, '');
  const parsedCleaned = Date.parse(cleaned);
  return isNaN(parsedCleaned) ? 0 : parsedCleaned;
}

export function sortPostsByDateDesc(posts: AdminBlogPost[]): AdminBlogPost[] {
  return [...posts].sort((a, b) => {
    const timeA = parsePostDate(a.date || a.createdAt);
    const timeB = parsePostDate(b.date || b.createdAt);
    return timeB - timeA;
  });
}

export function loadPosts(): AdminBlogPost[] {
  if (typeof window === 'undefined') {
    return seedFromPostsData();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminBlogPost[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return sortPostsByDateDesc(parsed);
      }
    }
  } catch {
    // corrupted storage — fall through to seed
  }
  const seed = seedFromPostsData();
  savePosts(seed);
  return sortPostsByDateDesc(seed);
}

export function savePosts(posts: AdminBlogPost[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent(POSTS_UPDATED_EVENT));
  } catch {
    // ignore storage errors
  }
}

export function createPost(draft: Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>): AdminBlogPost {
  const posts = loadPosts();
  const now = new Date().toISOString();
  const newPost: AdminBlogPost = {
    ...draft,
    id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };
  savePosts([newPost, ...posts]);
  return newPost;
}

export function updatePost(id: string, updates: Partial<Omit<AdminBlogPost, 'id' | 'createdAt'>>): AdminBlogPost | null {
  const posts = loadPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updated: AdminBlogPost = { ...posts[index], ...updates, updatedAt: new Date().toISOString() };
  posts[index] = updated;
  savePosts(posts);
  return updated;
}

export function deletePost(id: string): boolean {
  const posts = loadPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  savePosts(filtered);
  return true;
}

export function getPostById(id: string): AdminBlogPost | null {
  const posts = loadPosts();
  return posts.find((p) => p.id === id) || null;
}

export function getPostBySlugFromList(posts: AdminBlogPost[], slug: string): AdminBlogPost | null {
  return posts.find((p) => p.slug === slug || p.id === slug) || null;
}

export function getLatestPosts(posts: AdminBlogPost[], count: number = 4): AdminBlogPost[] {
  const sorted = sortPostsByDateDesc(posts);
  return sorted.slice(0, count);
}

export function getPostsByCategory(posts: AdminBlogPost[], category: string, count?: number): AdminBlogPost[] {
  const targetCategory = category.trim().toUpperCase();
  const sorted = sortPostsByDateDesc(posts);
  const filtered = sorted.filter((p) => (p.category || '').trim().toUpperCase() === targetCategory);
  if (count !== undefined) {
    return filtered.slice(0, count);
  }
  return filtered;
}

export function getRelatedPostsFromList(posts: AdminBlogPost[], currentSlug: string, count: number = 3): AdminBlogPost[] {
  const filtered = posts.filter((p) => p.slug !== currentSlug && p.id !== currentSlug);
  return filtered.slice(0, count);
}

/**
 * React hook that subscribes to real-time adminStore updates.
 */
export function useBlogPosts() {
  const [posts, setPosts] = useState<AdminBlogPost[]>(() => {
    if (typeof window !== 'undefined') {
      return loadPosts();
    }
    return seedFromPostsData();
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial client-side load from localStorage
    setPosts(loadPosts());
    setIsLoaded(true);

    const handleUpdate = () => {
      setPosts(loadPosts());
    };

    window.addEventListener(POSTS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(POSTS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return { posts, isLoaded };
}

/**
 * React hook that fetches a single post by slug with real-time sync.
 */
export function usePostBySlug(slug: string) {
  const { posts, isLoaded } = useBlogPosts();
  const post = getPostBySlugFromList(posts, slug);

  return {
    post,
    posts,
    isLoaded,
    notFound: isLoaded && !post,
  };
}
