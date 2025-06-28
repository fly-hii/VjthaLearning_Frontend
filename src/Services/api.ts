import { 
  Article, 
  CreateArticleData, 
  UpdateArticleData, 
  Category, 
  CreateCategoryData, 
  UpdateCategoryData,
  ArticleQueryParams, 
  UpdateUserData,
  User,
  CreateUserData
} from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Helper function to get auth headers
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
});

// Article API Functions
export const articlesApi = {
  // Get all articles with optional query parameters
  getAll: async (params?: ArticleQueryParams): Promise<Article[]> => {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category && params.category !== 'all') queryParams.append('category', params.category);
    if (params?.status && params.status !== 'all') queryParams.append('status', params.status);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.exclude) queryParams.append('exclude', params.exclude);

    const response = await fetch(`${API_BASE_URL}/articles?${queryParams.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return response.json();
  },

  // Get articles by category slug
  getByCategory: async (categorySlug: string, params?: { limit?: number; page?: number }): Promise<Article[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append('category', categorySlug);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`${API_BASE_URL}/articles?${queryParams.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch articles by category');
    return response.json();
  },

  // Get single article by ID
  getById: async (id: string): Promise<Article> => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return response.json();
  },

  // Create new article
  create: async (data: CreateArticleData): Promise<Article> => {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create article');
    return response.json();
  },

  // Update article
  update: async (id: string, data: UpdateArticleData): Promise<Article> => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update article');
    return response.json();
  },

  // Delete article
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete article');
  },

  // Search articles
  search: async (query: string): Promise<Article[]> => {
    const response = await fetch(`${API_BASE_URL}/articles?search=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search articles');
    return response.json();
  },

  // Get related articles
  getRelated: async (category: string, currentId: string, limit: number = 3): Promise<Article[]> => {
    const response = await fetch(`${API_BASE_URL}/articles?category=${category}&exclude=${currentId}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch related articles');
    return response.json();
  },
};

// Category API Functions
export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  // Get single category by ID
  getById: async (id: string): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },

  // Get category by slug
  getBySlug: async (slug: string): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/slug/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },

  // Create new category
  create: async (data: CreateCategoryData): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create category');
    const result = await response.json();
    return result.category || result;
  },

  // Update category
  update: async (id: string, data: UpdateCategoryData): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update category');
    const result = await response.json();
    return result.category || result;
  },

  // Delete category
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete category');
  },

  // Get articles by category ID
  getByCategoryId: async (categoryId: string): Promise<Article[]> => {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/articles`);
    if (!response.ok) throw new Error('Failed to fetch articles by category ID');
    return response.json();
  },
};

// User API Functions
export const usersApi = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  // Get single user by ID
  getById: async (id: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  // Create new user
  create: async (data: CreateUserData): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  // Update user
  update: async (id: string, data: UpdateUserData): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  // Delete user
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete user');
  },
};
