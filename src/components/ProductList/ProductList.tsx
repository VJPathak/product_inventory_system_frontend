import React, { useState } from 'react';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { Pagination } from '@/components/Pagination/Pagination';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { EmptyState } from '@/components/ui/EmptyState/EmptyState';
import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button/Button';
import { useProducts, useDeleteProduct } from '@/hooks/useProducts';
import type { ProductFilters } from '@/types';
import './ProductList.scss';

interface ProductListProps {
  filters: Partial<ProductFilters>;
  onPageChange: (page: number) => void;
  onAddProduct: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  filters,
  onPageChange,
  onAddProduct,
}) => {
  const { data, isLoading, error } = useProducts(filters);
  const deleteProduct = useDeleteProduct();
  const [deleteModal, setDeleteModal] = useState<{ id: string; name: string } | null>(null);

  const handleDelete = async () => {
    if (deleteModal) {
      await deleteProduct.mutateAsync(deleteModal.id);
      setDeleteModal(null);
    }
  };

  if (isLoading) {
    return (
      <div className="product-list__loading">
        <Spinner size="lg" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list__error">
        <EmptyState
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
          title="Failed to load products"
          description="There was an error connecting to the server. Please check if your backend is running on port 5000."
          action={
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  const products = data?.data?.products || [];
  const pagination = data?.data?.pagination;

  if (products.length === 0) {
    const hasFilters = filters.search || (filters.categories && filters.categories.length > 0);

    return (
      <EmptyState
        icon={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        title={hasFilters ? 'No products found' : 'No products yet'}
        description={
          hasFilters
            ? 'Try adjusting your search or filter criteria.'
            : 'Get started by adding your first product to the inventory.'
        }
        action={
          !hasFilters && (
            <Button variant="primary" onClick={onAddProduct}>
              Add First Product
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className="product-list">
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={(id) => setDeleteModal({ id, name: product.name })}
            isDeleting={deleteProduct.isPending && deleteModal?.id === product._id}
          />
        ))}
      </div>

      {pagination && (
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      )}

      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete Product"
        size="sm"
      >
        <div className="product-list__delete-modal">
          <p>
            Are you sure you want to delete <strong>{deleteModal?.name}</strong>? This
            action cannot be undone.
          </p>
          <div className="product-list__delete-actions">
            <Button variant="secondary" onClick={() => setDeleteModal(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={deleteProduct.isPending}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
