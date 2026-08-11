export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  brand?: string;
  price: string;
  image: string;
  affiliateUrl: string;
  description: string;
  badge?: string;
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'blockquote' | 'image' | 'callout' | 'products';
  text?: string;
  heading?: string;
  quoteAuthor?: string;
  imageUrl?: string;
  imageCaption?: string;
  products?: AffiliateProduct[];
}

export interface Article {
  id?: string;
  slug?: string;
  category: 'SEASONAL COMFORT' | 'TRENDY WEAR' | string;
  season?: 'Spring' | 'Summer' | 'Fall' | 'Winter' | string;
  title: string;
  subtitle?: string;
  readTime: string;
  image: string;
  description?: string;
  publishedAt?: string;
  author?: Author;
  takeaways?: string[];
  contentBlocks?: ContentBlock[];
  tags?: string[];
  affiliateProducts?: AffiliateProduct[];
}

export type Post = Article;

export interface PickItem {
  id?: string;
  title: string;
  tag: string;
  caption: string;
  image: string;
}

export interface CarouselProduct {
  id?: string;
  name: string;
  price: string;
  image: string;
  quote: string;
  details: string[];
  link?: string;
}

export interface TrendItem {
  id?: string;
  slug?: string;
  title: string;
  tag: string;
  readTime: string;
  image: string;
}

