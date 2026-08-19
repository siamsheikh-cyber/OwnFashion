'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/productStore';
import { ProductItemDraft } from '@/types/product';
import { useToast } from '@/components/admin/ToastProvider';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ProductItemDraft) => {
    setIsSubmitting(true);
    try {
      const newProd = createProduct(data);
      showToast(`"${newProd.title}" added to showcase!`, 'success');
      router.push('/admin/products');
    } catch {
      showToast('Failed to add product. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

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
          Add Product to Showcase
        </h1>
        <p
          style={{
            margin: 0,
            color: '#8b949e',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          }}
        >
          Provide product details, price display, key bullet features, and affiliate Amazon link.
        </p>
      </div>

      {/* Divider */}
      <div style={{ borderBottom: '1px solid #21262d', marginBottom: '28px' }} />

      <ProductForm mode="create" onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
