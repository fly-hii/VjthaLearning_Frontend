
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { blogPosts } from '@/lib/mockdata';

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tech-innovation', label: 'Tech Innovation' },
    { value: 'ai-ml', label: 'AI & Machine Learning' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'company-culture', label: 'Company Culture' },
    { value: 'industry-trends', label: 'Industry Trends' },
    { value: 'case-studies', label: 'Case Studies' },
  ];

  const articles = blogPosts;

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
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
                  {categories.map((category) => (
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
            {/* Articles Grid - Left Side */}
            <div className="flex-1">
              <div className="bg-white border-2 border-gray-100 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow rounded-lg p-6">
                {sortedArticles.length === 0 ? (
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedArticles.slice(0, 9).map((article) => (
                      <Card key={article.id} className="bg-white border-2 border-gray-300 hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-40 object-cover"
                          />
                          {article.featured && (
                            <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {article.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(article.date).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <Link to={`/article/${article.id}`}>
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
              </div>
            </div>

            {/* Latest Articles Sidebar - Right Side */}
            <div className="w-80">
              <div className="bg-white border-2 border-gray-100 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 text-center">Latest Articles</h2>
                <div className="space-y-4">
                  {sortedArticles.slice(0, 5).map((article) => (
                    <div key={article.id} className="flex gap-3 pb-4 border-b border-gray-300 last:border-b-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-16 object-cover rounded bg-gray-300"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation arrows at bottom */}
                <div className="flex justify-center mt-6 gap-4">
                  <Button variant="outline" size="icon">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
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
