import { Article, PickItem, CarouselProduct, TrendItem } from '@/types';

export const navLinks = ['Home', 'Blog', 'About', 'Contact'];

export const featuredArticles: Article[] = [
  {
    slug: 'investing-in-timeless-hardware',
    category: 'Accessories',
    title: 'Investing in Timeless Hardware',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'the-architecture-of-a-bold-lip',
    category: 'Beauty',
    title: 'The Architecture of a Bold Lip',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'reading-list-april-edition',
    category: 'Curation',
    title: 'Reading List: April Edition',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
  },
];

export const picks: PickItem[] = [
  {
    title: 'Essential Knitwear Set',
    tag: 'Under $40',
    caption: 'Everyday elegance without the markup.',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'The Structured Blazer',
    tag: 'Under $65',
    caption: 'A versatile staple for transition seasons.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Relaxed Linen Trousers',
    tag: 'Under $50',
    caption: 'Breathable comfort meets sharp tailoring.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Evening Slip Dress',
    tag: 'Under $80',
    caption: 'Understated glamour for intimate gatherings.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80',
  },
];

export const trends: TrendItem[] = [
  {
    slug: 'embracing-the-new-pastels',
    title: 'Embracing the New Pastels',
    tag: 'Spring Essentials',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'deconstructing-the-canadian-tuxedo',
    title: 'Deconstructing the Canadian Tuxedo',
    tag: 'Denim Redux',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'textures-of-the-night',
    title: 'Textures of the Night',
    tag: 'Evening Wear',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=80',
  },
];

export const carouselProducts: CarouselProduct[] = [
  {
    name: 'Classic Cashmere Blend Wrap',
    price: '$89.00',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    quote: "The softest wrap I've ever owned. It feels like a $300 piece for a fraction of the price.",
    details: ['70% Cashmere, 30% Silk', 'Oversized 80" x 30" dimensions', 'Available in 12 neutral tones'],
  },
  {
    name: 'Structured Wool-Blend Blazer',
    price: '$124.00',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
    quote: 'Perfect tailoring. It holds its shape all day and looks incredibly expensive.',
    details: ['Fully lined interior', 'Functional button cuffs', 'Modern oversized fit'],
  },
  {
    name: 'Minimalist Leather Tote',
    price: '$158.00',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    quote: 'The only bag I need for work. Fits my laptop and looks chic with everything.',
    details: ['Genuine pebble-grain leather', 'Reinforced base', 'Internal zip pocket'],
  },
  {
    name: 'Relaxed Linen Trousers',
    price: '$50.00',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    quote: 'Breathable comfort meets sharp tailoring. My go-to for summer evenings.',
    details: ['100% Organic Linen', 'High-waisted fit', 'Side seam pockets'],
  },
];
