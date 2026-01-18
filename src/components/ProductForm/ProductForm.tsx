import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/Input/Input';
import { Textarea } from '@/components/ui/Textarea/Textarea';
import { MultiSelect } from '@/components/ui/MultiSelect/MultiSelect';
import { Button } from '@/components/ui/Button/Button';
import { useCategories } from '@/hooks/useCategories';
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import type { Product, ProductFormData } from '@/types';
import './ProductForm.scss';

const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Product name is required')
    .max(100, 'Product name cannot exceed 100 characters'),
  description: z
    .string()
    .trim()
    .max(500, 'Description cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
  quantity: z
    .number({ invalid_type_error: 'Quantity must be a number' })
    .min(0, 'Quantity cannot be negative')
    .int('Quantity must be a whole number'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
});

interface ProductFormProps {
  product?: Product | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    quantity: 0,
    categories: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const isEditing = !!product;
  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        quantity: product.quantity,
        categories: product.categories.map((c) => c._id),
      });
    }
  }, [product]);

  const categoryOptions = (categoriesData?.data || []).map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const validateForm = (): boolean => {
    try {
      productSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isEditing && product) {
        await updateProduct.mutateAsync({ id: product._id, data: formData });
      } else {
        await createProduct.mutateAsync(formData);
      }
      
      // Reset form on success
      setFormData({ name: '', description: '', quantity: 0, categories: [] });
      setErrors({});
      onSuccess?.();
    } catch {
      // Error is handled in the mutation
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? (value === '' ? 0 : parseInt(value, 10) || 0) : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoriesChange = (categories: string[]) => {
    setFormData((prev) => ({ ...prev, categories }));
    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: '' }));
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <Input
        label="Product Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
        placeholder="Enter product name"
        required
        maxLength={100}
      />

      <Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        error={errors.description}
        placeholder="Enter product description (optional)"
        maxLength={500}
        rows={3}
      />

      <Input
        label="Quantity"
        name="quantity"
        type="number"
        min={0}
        value={formData.quantity}
        onChange={handleInputChange}
        error={errors.quantity}
        placeholder="0"
        required
      />

      <MultiSelect
        label="Categories"
        options={categoryOptions}
        value={formData.categories}
        onChange={handleCategoriesChange}
        error={errors.categories}
        placeholder={categoriesLoading ? 'Loading categories...' : 'Select categories'}
        disabled={categoriesLoading}
        required
      />

      <div className="product-form__actions">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {isEditing ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
};
