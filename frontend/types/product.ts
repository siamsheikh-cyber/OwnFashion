export type BadgeType = 'BEST SELLER' | 'TOP RATED';

export interface ProductItem {
  id: string;
  title: string;
  image: string;
  priceText: string;
  badgeType: BadgeType;
  rating: number;
  reviewCount: string;
  reviewQuote: string;
  features: string[];
  amazonUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductItemDraft = Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>;
