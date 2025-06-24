import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, FolderOpen, FileText } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { categoriesApi } from '@/Services/api';
import type { Category, CreateCategoryData, UpdateCategoryData } from '@/types/api';

const CategoriesManagement: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState<CreateCategoryData>({ name: '', slug: '', description: '' });
  const queryClient = useQueryClient();
  const [editCategory, setEditCategory] = useState<Category | null>(null);


  const createCategoryMutation = useMutation({
    mutationFn: categoriesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully!');
      setNewCategory({ name: '', slug: '', description: '' });
      setShowAddForm(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create category');
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: categoriesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete category');
    },
  });
  const updateCategoryMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: UpdateCategoryData }) =>
    categoriesApi.update(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] });
    toast.success('Category updated successfully!');
    setEditCategory(null);
  },
  onError: (error: Error) => {
    toast.error(error.message || 'Failed to update category');
  },
  });
  const handleUpdateCategory = () => {
    if (editCategory) {
      const { _id, name, slug, description } = editCategory;
      updateCategoryMutation.mutate({
        id: _id,
        data: { name, slug, description },
      });
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategoryMutation.mutate(id);
    }
  };


  const handleAddCategory = () => {
    if (newCategory.name) {
      createCategoryMutation.mutate(newCategory);
    }
  };


  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });

  const [articleCounts, setArticleCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!categories.length) return;

    const fetchArticleCounts = async () => {
      const counts: { [key: string]: number } = {};

      await Promise.all(
        categories.map(async (category) => {
          try {
            const articles = await categoriesApi.getByCategoryId(category._id);
            counts[category._id] = articles.length;
          } catch (error) {
            counts[category._id] = 0;
            console.error(`Error loading articles for category ${category._id}`, error);
          }
        })
      );

      setArticleCounts(counts);
    };

    fetchArticleCounts();
  }, [categories]);
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories Management</h1>
          <p className="text-gray-600 mt-1">Organize your content into categories</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </Button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setNewCategory({
                      ...newCategory,
                      name,
                      slug: generateSlug(name)
                    });
                  }}
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <Input
                  value={newCategory.slug || ''}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  placeholder="category-slug"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddCategory}
                disabled={createCategoryMutation.isPending}
              >
                {createCategoryMutation.isPending ? 'Creating...' : 'Add Category'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {editCategory && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input
                  value={editCategory.name}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      name: e.target.value,
                      slug: generateSlug(e.target.value),
                    })
                  }
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <Input
                  value={editCategory.slug}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, slug: e.target.value })
                  }
                  placeholder="category-slug"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editCategory.description}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, description: e.target.value })
                  }
                  placeholder="Brief description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setEditCategory(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdateCategory}
                disabled={updateCategoryMutation.isPending}
              >
                {updateCategoryMutation.isPending ? 'Updating...' : 'Update Category'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Categories Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <FolderOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Articles</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.values(articleCounts).reduce((sum, count) => sum + count, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Badge className="w-8 h-8 flex items-center justify-center text-purple-600 bg-purple-100">
                Avg
              </Badge>
              <div>
                <p className="text-sm text-gray-600">Avg Articles/Category</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.length > 0
                    ? Math.round(Object.values(articleCounts).reduce((sum, count) => sum + count, 0) / categories.length)
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: Category) => (
                <TableRow key={category._id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {category.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {articleCounts[category._id] || 0} articles
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditCategory(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteCategory(category._id)}
                        disabled={deleteCategoryMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesManagement;
