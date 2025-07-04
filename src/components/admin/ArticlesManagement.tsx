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
  Tag,
  MessageSquare,
  Upload,
  File,
  Image,
  Video
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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

const createArticle = async (article: any) => {
  const response = await fetch(`${API_BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify(article),
  });
  if (!response.ok) throw new Error('Failed to create article');
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
  //creating new article
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [newArticle, setNewArticle] = useState<any>({
  title: '',
  content: '',
  tags: '',
  category: '',
  author: '',
  isPublished: false,
  featuredImage: '',
  videoFile: null,
  documentFile: null,
});

  const [jobApplications, setJobApplications] = useState<any[]>([
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      applicantName: 'John Doe',
      applicantEmail: 'john@example.com',
      appliedDate: '2024-01-15',
      status: 'pending',
      resume: 'john_doe_resume.pdf'
    },
    {
      id: 2,
      jobTitle: 'Backend Developer',
      applicantName: 'Jane Smith',
      applicantEmail: 'jane@example.com',
      appliedDate: '2024-01-14',
      status: 'reviewed',
      resume: 'jane_smith_resume.pdf'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock file upload - replace with actual upload logic
      const fileUrl = URL.createObjectURL(file);
      if (fileType === 'image') {
        setNewArticle({ ...newArticle, featuredImage: fileUrl });
      } else if (fileType === 'video') {
        setNewArticle({ ...newArticle, videoFile: file });
      } else if (fileType === 'document') {
        setNewArticle({ ...newArticle, documentFile: file });
      }
      toast.success(`${fileType} uploaded successfully`);
    }
  };

  const updateApplicationStatus = (applicationId: number, newStatus: string) => {
    setJobApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    toast.success(`Application status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

const queryClients = useQueryClient();

const createArticleMutation = useMutation({
  mutationFn: createArticle,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['articles'] });
    toast.success('Article created successfully');
    setIsCreateModalOpen(false);
    setNewArticle({
      title: '',
      content: '',
      tags: '',
      category: '',
      author: '',
      isPublished: false,
    });
  },
  onError: (error: Error) => {
    toast.error(error.message || 'Failed to create article');
  },
});
const handleCreateArticle = async (newArticle: any) => {
  createArticleMutation.mutate(newArticle);
};

  const queryClientss = useQueryClient();

const createArticleMutationn = useMutation({
  mutationFn: createArticle,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['articles'] });
    toast.success('Article created successfully');
    setIsCreateModalOpen(false);
    setNewArticle({
  title: '',
  content: '',
  tags: '',
  category: '',
  author: '',
  isPublished: false,
  featuredImage: '', // ✅ Clear this too
  videoFile: null,
  documentFile: null,
});

  },
  onError: (error: Error) => {
    toast.error(error.message || 'Failed to create article');
  },
});

  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles Management</h1>
          <p className="text-gray-600 mt-1">Manage all your blog articles and job applications</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4  hover:shadow-lg hover:shadow-blue-400/40 transition-colors">
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
          <CardContent className="p-4  hover:shadow-lg hover:shadow-blue-400/40 transition-colors">
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
          <CardContent className="p-4  hover:shadow-lg hover:shadow-blue-400/40 transition-colors">
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
          <CardContent className="p-4  hover:shadow-lg hover:shadow-blue-400/40 transition-colors">
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

      {/* Tabs for Articles and Applications */}
      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="applications">Job Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          {/* Articles Management */}
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
                      <TableHead>Views/Comments</TableHead>
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
                          <div className="flex items-center space-x-4 text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4 text-blue-500" />
                              <span>{(article.views || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-4 h-4 text-green-500" />
                              <span>{(article.comments?.length || 0).toLocaleString()}</span>
                            </div>
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
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          {/* Job Applications Management */}
          <Card>
            <CardHeader>
              <CardTitle>Job Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.jobTitle}</TableCell>
                      <TableCell>{application.applicantName}</TableCell>
                      <TableCell>{application.applicantEmail}</TableCell>
                      <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <File className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                            className="text-blue-600 hover:bg-blue-50"
                          >
                            Review
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateApplicationStatus(application.id, 'accepted')}
                            className="text-green-600 hover:bg-green-50"
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateApplicationStatus(application.id, 'rejected')}
                            className="text-red-600 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enhanced Create Article Dialog with File Upload */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-300">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Create New Article</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4 max-h-96 overflow-y-auto">
            {/* Title */}
            <Input
              placeholder="Article Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              className="transform transition-all duration-200 focus:scale-105"
            />

            {/* File Upload Section */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900">Media Upload</h3>
              
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Featured Image</label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image')}
                    className="flex-1"
                  />
                  <Button size="sm" variant="outline">
                    <Image className="w-4 h-4" />
                  </Button>
                </div>
                {newArticle.featuredImage && (
                  <img src={newArticle.featuredImage} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
              </div>

              {/* Video Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Video File</label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'video')}
                    className="flex-1"
                  />
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Documents (PDF, PPT, Excel)</label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept=".pdf,.ppt,.pptx,.xls,.xlsx,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'document')}
                    className="flex-1"
                  />
                  <Button size="sm" variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <textarea
              placeholder="Article Content"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none transform transition-all duration-200 focus:scale-105"
              rows={5}
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
            />

            {/* Tags */}
            <Input
              placeholder="Tags (comma separated)"
              value={newArticle.tags}
              onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value })}
            />

            {/* Author */}
            <Input
              placeholder="Author"
              value={newArticle.author}
              onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
            />

            {/* Category Dropdown */}
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={newArticle.category}
              onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
            >
              <option value="">Select category</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            {/* Publish Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newArticle.isPublished}
                onChange={(e) => setNewArticle({ ...newArticle, isPublished: e.target.checked })}
              />
              <label>Publish</label>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
            <Button 
              onClick={() => handleCreateArticle(newArticle)} 
              className="bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              Create Article
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <p className="flex items-center gap-2">
              <strong>💬 Comments:</strong>
              <span className="font-medium">{viewArticle?.comments?.length || 0}</span>
            </p>
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
