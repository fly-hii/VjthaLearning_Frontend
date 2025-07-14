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
  CreateUserData,
  Comment,
  CreateCommentData,
  Job,
  CreateJobData,
  UpdateJobData,
  TechPostResponse,
  TechPostPayload 
} from '@/types/api';

const API_BASE_URL = import.meta.env.BACKEND_URL;

// Helper function to get auth headers
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
});

// Helper function to get auth headers for FormData
const getAuthHeadersFormData = () => ({
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

  // Get article by slug
  getBySlug: async (slug: string): Promise<Article> => {
    const response = await fetch(`${API_BASE_URL}/articles/slug/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
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

  // Get comments for an article
  getComments: async (articleId: string): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },
  getAllComments: async (): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/articles/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },
  // Add comment to an article
  addComment: async (articleId: string, data: CreateCommentData): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to add comment');
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

export const jobsApi = {
  // Get all jobs
  getAll: async (): Promise<Job[]> => {
    const res = await fetch(`${API_BASE_URL}/jobs`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  },

  // Get a single job by ID
  getById: async (id: string): Promise<Job> => {
    const res = await fetch(`${API_BASE_URL}/jobs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch job');
    return res.json();
  },

  // Create a new job
  create: async (data: CreateJobData): Promise<Job> => {
    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create job');
    return res.json();
  },

  // Update an existing job
  update: async (id: string, data: UpdateJobData): Promise<Job> => {
    const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update job');
    return res.json();
  },

  // Delete a job
  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete job');
  },
};

export const techPostApi = {
  // 🔍 Get all tech posts
  getAll: async (): Promise<TechPostResponse[]> => {
    const res = await fetch(`${API_BASE_URL}/api/tech-posts`);
    if (!res.ok) throw new Error("Failed to fetch tech posts");
    return res.json();
  },

  // 🔍 Get a single post by ID
  getById: async (id: string): Promise<TechPostResponse> => {
    const res = await fetch(`${API_BASE_URL}/tech-posts/${id}`);
    if (!res.ok) throw new Error("Failed to fetch tech post");
    return res.json();
  },

  // ➕ Create a new post with FormData (for file upload)
createWithFormData: async (formData: FormData): Promise<TechPostResponse> => {
  const res = await fetch(`${API_BASE_URL}/tech-posts`, {
    method: "POST",
    headers: getAuthHeadersFormData(),
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create tech post");
  }
  const result = await res.json();
  return result.post;
},


  // ➕ Create a new post with JSON (backwards compatibility)
  create: async (data: TechPostPayload): Promise<TechPostResponse> => {
    const res = await fetch(`${API_BASE_URL}/tech-posts`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to create tech post");
    }
    const result = await res.json();
    return result.post;
  },

  // ✏️ Update a post
  update: async (id: string, data: Partial<TechPostPayload>): Promise<TechPostResponse> => {
    const res = await fetch(`${API_BASE_URL}/tech-posts/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update tech post");
    }
    const result = await res.json();
    return result.post;
  },

  // 🗑️ Delete a post
  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/tech-posts/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete tech post");
    }
  },
};
