import React, { useState, useCallback } from 'react';
import { Header } from '@/components/Header/Header';
import { SearchFilter } from '@/components/SearchFilter/SearchFilter';
import { ProductList } from '@/components/ProductList/ProductList';
import { ProductForm } from '@/components/ProductForm/ProductForm';
import { Modal } from '@/components/ui/Modal/Modal';
import type { ProductFilters } from '@/types';
import './Index.scss';

const Index: React.FC = () => {
  const [filters, setFilters] = useState<Partial<ProductFilters>>({
    search: '',
    categories: [],
    page: 1,
    limit: 9,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const handleCategoriesChange = useCallback((categories: string[]) => {
    setFilters((prev) => ({ ...prev, categories, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters((prev) => ({ ...prev, search: '', categories: [], page: 1 }));
  }, []);

  const handleFormSuccess = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="inventory-page">
      <Header onAddProduct={() => setIsFormOpen(true)} />

      <main className="inventory-page__main">
        <div className="inventory-page__container">
          <SearchFilter
            search={filters.search || ''}
            categories={filters.categories || []}
            onSearchChange={handleSearchChange}
            onCategoriesChange={handleCategoriesChange}
            onClear={handleClearFilters}
          />

          <section className="inventory-page__products">
            <ProductList
              filters={filters}
              onPageChange={handlePageChange}
              onAddProduct={() => setIsFormOpen(true)}
            />
          </section>
        </div>
      </main>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add New Product"
        size="md"
      >
        <ProductForm
          onSuccess={handleFormSuccess}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Index;
