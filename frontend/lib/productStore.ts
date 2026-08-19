'use client';

import { useState, useEffect } from 'react';
import { ProductItem, ProductItemDraft, BadgeType } from '@/types/product';
import { carouselProducts } from '@/lib/data';

export const PRODUCT_STORAGE_KEY = 'ownfashion_admin_products';
export const PRODUCTS_UPDATED_EVENT = 'ownfashion_products_updated';

// Map initial carouselProducts from lib/data.ts into ProductItem format
export function seedFromCarouselProducts(): ProductItem[] {
  return carouselProducts.map((p, index) => {
    const badgeType: BadgeType =
      (p.badge || '').toLowerCase().includes('top') ? 'TOP RATED' : 'BEST SELLER';

    return {
      id: p.id || `prod-seed-${index + 1}`,
      title: p.name,
      image: p.image,
      priceText: p.price,
      badgeType,
      rating: p.rating || 4.5,
      reviewCount: p.reviews || '(2.5k reviews)',
      reviewQuote: p.quote,
      features: p.details && p.details.length > 0 ? [...p.details] : ['Premium build & materials', 'Comfort tailored fit'],
      amazonUrl: p.link || 'https://www.amazon.com/?tag=ownfashion-20',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
}

export function loadProducts(): ProductItem[] {
  if (typeof window === 'undefined') {
    return seedFromCarouselProducts();
  }
  try {
    const raw = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ProductItem[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // corrupted storage — fall through to seed
  }
  const seed = seedFromCarouselProducts();
  saveProducts(seed);
  return seed;
}

export function saveProducts(products: ProductItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT));
  } catch {
    // ignore storage errors
  }
}

export function createProduct(draft: ProductItemDraft): ProductItem {
  const products = loadProducts();
  const now = new Date().toISOString();
  const newProduct: ProductItem = {
    ...draft,
    id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };
  saveProducts([newProduct, ...products]);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<ProductItemDraft>): ProductItem | null {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updated: ProductItem = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  products[index] = updated;
  saveProducts(products);
  return updated;
}

export function deleteProduct(id: string): boolean {
  const products = loadProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

export function getProductById(id: string): ProductItem | null {
  const products = loadProducts();
  return products.find((p) => p.id === id) || null;
}

/**
 * React hook that subscribes to real-time product store updates.
 */
export function useProducts() {
  const [products, setProducts] = useState<ProductItem[]>(() => {
    if (typeof window !== 'undefined') {
      return loadProducts();
    }
    return seedFromCarouselProducts();
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProducts(loadProducts());
    setIsLoaded(true);

    const handleUpdate = () => {
      setProducts(loadProducts());
    };

    window.addEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return { products, isLoaded };
}
