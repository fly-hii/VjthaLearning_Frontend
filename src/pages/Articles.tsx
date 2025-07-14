
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
      {/* Page Header */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">Articles</h1>
          
          {/* Filters and Search */}
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:gap-4 lg:items-center lg:justify-between">
            <div className="flex-1 max-w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 border-2 focus:border-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
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
                <SelectTrigger className="w-full sm:w-40">
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
      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Articles Grid - Full width on mobile, 75% on large screens */}
            <div className="flex-1 w-full lg:w-3/4">
              {articlesLoading ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading articles...</p>
                </div>
              ) : !articles || articles.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">No articles found</h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Try adjusting your search terms or filters.</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedArticles.map((article: Article) => (
                    <Card key={article._id} className="bg-white border-2 border-gray-200 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                      <div className="relative">
                        {article.media
                          ?.filter(item => item.type == 'image')
                          .map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt={image.filename || `Image ${index}`}
                              className="rounded-lg mb-4"
                            />
                          ))}
                        {(article.isFeatured || article.featured) && (
                          <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                          <Link to={`/article/${article.slug || article._id}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 sm:line-clamp-3">
                          {article.excerpt || (article.content ? article.content.substring(0, 150) + '...' : 'No preview available')}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center min-w-0 flex-1 mr-2">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{article.author || 'Unknown Author'}</span>
                          </div>
                          <div className="flex items-center flex-shrink-0">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="text-xs">{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        {article.category && (
                          <div className="mb-4">
                            <Badge variant="outline" className="text-xs">
                              {typeof article.category === 'object' ? article.category.name : article.category}
                            </Badge>
                          </div>
                        )}
                        
                        <Link to={`/article/${article.slug || article._id}`}>
                          <Button size="sm" className="w-full text-xs sm:text-sm">
                            Read More
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 sm:mt-8 gap-1 sm:gap-2 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i + 1}
                      variant={page === i + 1 ? 'default' : 'outline'}
                      onClick={() => setPage(i + 1)}
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Common Sidebar - Hidden on mobile, 25% on large screens */}
            <div className="hidden lg:block lg:w-1/4 min-w-0">
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
