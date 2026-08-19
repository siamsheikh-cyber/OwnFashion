import { Author, AffiliateProduct, ContentBlock } from './index';

export type BlogSeason = 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER' | 'ALL' | string;

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  season?: 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER' | string;
  date: string;
  excerpt: string;
  content: string;
  mainImage: string;
  amazonAffiliateUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  subtitle?: string;
  readTime?: string;
  author?: Author;
  tags?: string[];
  affiliateProducts?: AffiliateProduct[];
  contentBlocks?: ContentBlock[];
}

export type AdminBlogPostDraft = Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>;

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
