/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  Clock,
  User,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// API functions
const fetchArticles = async (params?: { search?: string; category?: string; status?: string }) => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.category && params.category !== 'all') queryParams.append('category', params.category);
  if (params?.status && params.status !== 'all') queryParams.append('status', params.status);

  const response = await fetch(`${API_BASE_URL}/articles?${queryParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch articles');
  return response.json();
};

const deleteArticle = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}`, { 
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  if (!response.ok) throw new Error('Failed to delete article');
  return response.json();
};

const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

const ArticlesManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const queryClient = useQueryClient();
  const [viewArticle, setViewArticle] = useState<any | null>(null);
  const [editArticle, setEditArticle] = useState<any | null>(null);

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles', searchTerm, filterCategory, filterStatus],
    queryFn: () => fetchArticles({ 
      search: searchTerm, 
      category: filterCategory, 
      status: filterStatus 
    }),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast.success('Article deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete article');
    },
  });

  const handleDeleteArticle = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      deleteArticleMutation.mutate(id);
    }
  };

  const categoryOptions = ['All', ...categories.map((cat: any) => cat.name)];
  const statuses = ['All', 'Published', 'Draft', 'Featured'];

  // Calculate stats from articles
  const stats = {
    total: articles.length,
    drafts: articles.filter((a: any) => !a.isPublished).length,
    featured: articles.filter((a: any) => a.isFeatured).length,
    totalViews: articles.reduce((sum: number, a: any) => sum + (a.views || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles Management</h1>
          <p className="text-gray-600 mt-1">Manage all your blog articles</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Button>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Eye className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Articles List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categoryOptions.map(category => (
                <option key={category} value={category.toLowerCase()}>{category}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status.toLowerCase()}>{status}</option>
              ))}
            </select>
          </div>

          {/* Articles Table */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article: any) => (
                  <TableRow key={article._id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {article.isFeatured && <Star className="w-4 h-4 text-yellow-500" />}
                        <span className="font-medium">{article.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{article.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {article.category?.name || article.category || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={article.isPublished ? 'default' : 'secondary'}
                      >
                        {article.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>{(article.views || 0).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 
                       article.createdAt ? new Date(article.createdAt).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setEditArticle(article)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setViewArticle(article)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteArticle(article._id)}
                          disabled={deleteArticleMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    {/* 🔍 View Article Dialog */}
      <Dialog open={!!viewArticle} onOpenChange={(open) => !open && setViewArticle(null)}>
      <DialogContent
        className="sm:max-w-3xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl
                  animate-in zoom-in-95 fade-in duration-300 transition-all border border-gray-200 dark:border-zinc-700"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 mb-1">
            📄 {viewArticle?.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">✨ A closer look at this gem of an article</p>
        </DialogHeader>

        <div className="space-y-3 mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          <div className="border-b border-dashed pb-2">
            <p><strong>👤 Author:</strong> <span className="text-blue-700 dark:text-blue-300">{viewArticle?.author}</span></p>
            <p><strong>🏷️ Category:</strong> <span className="italic">{viewArticle?.category?.name || '—'}</span></p>
            <p className="flex items-center gap-2">
              <strong>📌 Status:</strong>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white tracking-wide animate-pulse transition-all duration-300 ${
                  viewArticle?.isPublished ? 'bg-emerald-600' : 'bg-gray-500'
                }`}
              >
                {viewArticle?.isPublished ? 'Published' : 'Draft'}
              </span>
            </p>
            <p><strong>👁️ Views:</strong> <span className="font-medium">{viewArticle?.views}</span></p>
            <p><strong>🗓️ Published:</strong> {viewArticle?.createdAt && new Date(viewArticle.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">📝 Content</h2>
            <div
              className="prose max-w-none prose-sm prose-blue dark:prose-invert transition-all"
              dangerouslySetInnerHTML={{ __html: viewArticle?.content || '' }}
            />
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button
            variant="outline"
            onClick={() => setViewArticle(null)}
            className="transition-colors bg-white hover:bg-blue-50 text-blue-600 border-blue-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-blue-300"
          >
            ✖ Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      {/* ✏️ Edit Article Dialog */}
      <Dialog open={!!editArticle} onOpenChange={(open) => !open && setEditArticle(null)}>
        <DialogContent className="sm:max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl transition-all duration-300 animate-in fade-in-90 slide-in-from-bottom-2">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold mb-2">✏️ Edit Article: {editArticle?.title}</DialogTitle>
            <p className="text-sm text-muted-foreground">Make changes to the article below</p>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium block mb-1">Title</label>
              <Input
                value={editArticle?.title}
                onChange={(e) =>
                  setEditArticle((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Article title"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Content</label>
              <textarea
                rows={8}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={editArticle?.content}
                onChange={(e) =>
                  setEditArticle((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Write article content..."
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setEditArticle(null)} className="transition hover:bg-gray-100 dark:hover:bg-zinc-800">
              Cancel
            </Button>
            <Button
              onClick={() => {
                // TODO: Replace with actual update logic
                toast.success('Update API not implemented yet');
                setEditArticle(null);
              }}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ArticlesManagement;