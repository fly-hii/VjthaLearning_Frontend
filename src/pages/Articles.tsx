
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CommonSidebar from '@/components/CommonSidebar';
import { useQuery } from '@tanstack/react-query';
import { articlesApi, categoriesApi } from '@/Services/api';
import type { Article, Category } from '@/types/api';
import { AIPopup } from './AIPopup';
const Articles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const articlesPerPage = 20;


const { data: articlesData = [], isLoading: articlesLoading } = useQuery({
  queryKey: ['articles', selectedCategory, searchQuery, sortBy, page],
  queryFn: () =>
    articlesApi.getAll({
      category: selectedCategory,
      search: searchQuery,
      sort: sortBy,
    }),
});

const articles = Array.isArray(articlesData) ? articlesData : [];
const totalArticles = articles.length;
const totalPages = Math.ceil(totalArticles / articlesPerPage);
const paginatedArticles = articles.slice((page - 1) * articlesPerPage, page * articlesPerPage);

console.log(articlesData);
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
  });

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((cat: Category) => ({
      value: cat.slug,
      label: cat.name
    }))
  ];


  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [page]);


  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <AIPopup /> {/* AI Assistant Popup */}
      {/* Page Header */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Articles</h1>
          
          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-2 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Articles Grid - 75% Width */}
            <div className="flex-1" style={{ width: '75%' }}>
              {articlesLoading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading articles...</p>
                </div>
                  ) : !articles || articles.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">No articles found</h3>
                  <p className="text-gray-600 mb-8">Try adjusting your search terms or filters.</p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Show All Articles
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedArticles.map((article: Article) => (
                    <Card key={article._id} className="bg-white border-2 border-gray-200 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                      <div className="relative">
                        {article.featuredImage && (
                          <img
                            src={article.featuredImage}
                            alt={article.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        )}
                        {(article.isFeatured || article.featured) && (
                          <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                          <Link to={`/article/${article._id}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {article.excerpt || (article.content ? article.content.substring(0, 150) + '...' : 'No preview available')}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {article.author || 'Unknown Author'}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {article.category && (
                          <div className="mb-4">
                            <Badge variant="outline">
                              {typeof article.category === 'object' ? article.category.name : article.category}
                            </Badge>
                          </div>
                        )}
                        
                        <Link to={`/article/${article._id}`}>
                          <Button size="sm" className="w-full">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                  
                </div>
              )}
              {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2 flex-wrap">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                          key={i + 1}
                          variant={page === i + 1 ? 'default' : 'outline'}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                  )}
            </div>

            {/* Common Sidebar - 25% Width */}
            <div style={{ width: '25%' }} className="min-w-80">
              <div className="sticky top-8">
                <CommonSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Articles;
