'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById, updateProduct } from '@/lib/productStore';
import { ProductItem, ProductItemDraft } from '@/types/product';
import { useToast } from '@/components/admin/ToastProvider';
import ProductForm from '@/components/admin/ProductForm';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  const id = params.id as string;

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const found = getProductById(id);
    if (found) {
      setProduct(found);
    } else {
      setNotFound(true);
    }
    setMounted(true);
  }, [id]);

  const handleSubmit = async (data: ProductItemDraft) => {
    setIsSubmitting(true);
    try {
      const updated = updateProduct(id, data);
      if (updated) {
        showToast(`"${updated.title}" updated successfully!`, 'success');
        router.push('/admin/products');
      } else {
        showToast('Product not found. It may have been removed.', 'error');
        setIsSubmitting(false);
      }
    } catch {
      showToast('Failed to save changes. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (notFound) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: '#1c2128',
          border: '1px solid #30363d',
          borderRadius: '10px',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.4 }}>🔍</div>
        <h2
          style={{
            margin: '0 0 8px',
            color: '#e6edf3',
            fontFamily: 'Inter, sans-serif',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          Product Not Found
        </h2>
        <p
          style={{
            margin: '0 0 24px',
            color: '#8b949e',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          }}
        >
          The product with ID &ldquo;{id}&rdquo; could not be found. It may have been deleted.
        </p>
        <button
          onClick={() => router.push('/admin/products')}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #ffa41c, #ff6200)',
            border: '1px solid #ff6200',
            borderRadius: '6px',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ← Back to Products Showcase
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <button
            onClick={() => router.push('/admin/products')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              background: 'transparent',
              border: '1px solid #30363d',
              borderRadius: '5px',
              color: '#8b949e',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#e6edf3';
              (e.currentTarget as HTMLElement).style.borderColor = '#8b949e';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#8b949e';
              (e.currentTarget as HTMLElement).style.borderColor = '#30363d';
            }}
          >
            ← Back
          </button>
          <h1
            style={{
              margin: 0,
              color: '#e6edf3',
              fontFamily: 'Inter, sans-serif',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Edit Product
          </h1>
        </div>
        {product && (
          <p
            style={{
              margin: 0,
              color: '#484f58',
              fontFamily: 'monospace',
              fontSize: '12px',
            }}
          >
            ID: {product.id}
          </p>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderBottom: '1px solid #21262d', marginBottom: '28px' }} />

      {product && (
        <ProductForm
          mode="edit"
          initialData={product}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
