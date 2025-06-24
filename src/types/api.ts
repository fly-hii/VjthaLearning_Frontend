
// Article Types
export interface ArticleSEO {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  videoEmbedUrl?: string;
  tags?: string[];
  category?: Category | string;
  categorySlug?: string;
  author: string;
  isPublished: boolean;
  publishedAt?: Date | string;
  featured?: boolean;
  isFeatured?: boolean; // alias for featured
  seo?: ArticleSEO;
  createdAt: Date | string;
  updatedAt: Date | string;
  views?: number;
}

export interface CreateArticleData {
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  videoEmbedUrl?: string;
  tags?: string[];
  category: string;
  author: string;
  isPublished?: boolean;
  publishedAt?: Date | string;
  featured?: boolean;
  seo?: ArticleSEO;
}

export interface UpdateArticleData extends Partial<CreateArticleData> {
  slug?: string;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  articleCount?: number;
}

export interface CreateCategoryData {
  name: string;
  slug?: string;
  description?: string;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Query Parameters
export interface ArticleQueryParams {
  search?: string;
  category?: string;
  status?: string;
  sort?: string;
  limit?: number;
  exclude?: string;
}
