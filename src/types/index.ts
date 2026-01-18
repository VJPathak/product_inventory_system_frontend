export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: Pagination;
  };
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ProductFormData {
  name: string;
  description: string;
  quantity: number;
  categories: string[];
}

export interface ProductFilters {
  search: string;
  categories: string[];
  page: number;
  limit: number;
}
