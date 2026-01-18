import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/Badge/Badge';
import { Button } from '@/components/ui/Button/Button';
import type { Product } from '@/types';
import './ProductCard.scss';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
  isDeleting,
}) => {
  const formattedDate = format(new Date(product.createdAt), 'MMM dd, yyyy');

  return (
    <article className="product-card">
      <div className="product-card__header">
        <h3 className="product-card__name">{product.name}</h3>
        <span className="product-card__quantity">
          Qty: <strong>{product.quantity}</strong>
        </span>
      </div>

      {product.description && (
        <p className="product-card__description">{product.description}</p>
      )}

      <div className="product-card__categories">
        {product.categories.map((category) => (
          <Badge key={category._id} variant="primary">
            {category.name}
          </Badge>
        ))}
      </div>

      <div className="product-card__footer">
        <span className="product-card__date">
          Added on {formattedDate}
        </span>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(product._id)}
          isLoading={isDeleting}
          aria-label={`Delete ${product.name}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M5.5 2V3H2V4H3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V4H14V3H10.5V2H5.5ZM4 4H12V13H4V4ZM6 6V11H7V6H6ZM9 6V11H10V6H9Z"
              fill="currentColor"
            />
          </svg>
          Delete
        </Button>
      </div>
    </article>
  );
};
