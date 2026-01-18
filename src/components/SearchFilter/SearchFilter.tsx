import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input/Input';
import { MultiSelect } from '@/components/ui/MultiSelect/MultiSelect';
import { Button } from '@/components/ui/Button/Button';
import { useCategories } from '@/hooks/useCategories';
import './SearchFilter.scss';

interface SearchFilterProps {
  search: string;
  categories: string[];
  onSearchChange: (search: string) => void;
  onCategoriesChange: (categories: string[]) => void;
  onClear: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  categories,
  onSearchChange,
  onCategoriesChange,
  onClear,
}) => {
  const [searchValue, setSearchValue] = useState(search);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearchChange]);

  // Sync external search with internal state
  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  const categoryOptions = (categoriesData?.data || []).map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const hasFilters = search || categories.length > 0;

  return (
    <div className="search-filter">
      <div className="search-filter__fields">
        <div className="search-filter__search">
          <Input
            placeholder="Search products by name..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search products"
          />
          <svg
            className="search-filter__search-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 19L14.65 14.65"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="search-filter__category">
          <MultiSelect
            options={categoryOptions}
            value={categories}
            onChange={onCategoriesChange}
            placeholder={categoriesLoading ? 'Loading...' : 'Filter by categories'}
            disabled={categoriesLoading}
          />
        </div>
      </div>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="search-filter__clear"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Clear filters
        </Button>
      )}
    </div>
  );
};
