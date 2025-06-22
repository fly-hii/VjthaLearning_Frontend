
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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

  const articles = [
    {
      id: 1,
      title: 'The Future of AI in Web Development: Trends to Watch in 2024',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications, from automated code generation to intelligent user interfaces.',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'AI & Machine Learning',
      categorySlug: 'ai-ml',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      featured: true,
      tags: ['AI', 'Web Development', 'Future Tech']
    },
    {
      id: 2,
      title: 'Building Scalable React Applications: Best Practices and Patterns',
      excerpt: 'A comprehensive guide to structuring React applications for long-term maintainability, performance optimization, and team collaboration.',
      author: 'Michael Rodriguez',
      date: '2024-01-14',
      readTime: '12 min read',
      category: 'Web Development',
      categorySlug: 'web-development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
      featured: false,
      tags: ['React', 'JavaScript', 'Architecture']
    },
    {
      id: 3,
      title: 'Remote Work Culture: How FlyHii Media Adapts to the Digital Age',
      excerpt: 'Inside look at how we maintain company culture, productivity, and team collaboration in a fully distributed work environment.',
      author: 'Emma Thompson',
      date: '2024-01-13',
      readTime: '6 min read',
      category: 'Company Culture',
      categorySlug: 'company-culture',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
      featured: false,
      tags: ['Remote Work', 'Culture', 'Productivity']
    },
    {
      id: 4,
      title: 'Cybersecurity in 2024: Protecting Your Digital Assets',
      excerpt: 'Essential security measures every business should implement to stay safe online, including the latest threat intelligence and prevention strategies.',
      author: 'David Kim',
      date: '2024-01-12',
      readTime: '10 min read',
      category: 'Tech Innovation',
      categorySlug: 'tech-innovation',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
      featured: true,
      tags: ['Cybersecurity', 'Privacy', 'Business']
    },
    {
      id: 5,
      title: 'UX Design Principles That Drive User Engagement',
      excerpt: 'How thoughtful design choices can significantly impact user behavior, conversion rates, and overall business outcomes in digital products.',
      author: 'Lisa Park',
      date: '2024-01-11',
      readTime: '7 min read',
      category: 'Web Development',
      categorySlug: 'web-development',
      image: 'https://images.unsplash.com/photo-1561070791-36f80b15ad06?w=600&h=400&fit=crop',
      featured: false,
      tags: ['UX Design', 'User Experience', 'Design']
    },
    {
      id: 6,
      title: 'Data Analytics: Turning Information into Business Intelligence',
      excerpt: 'Leveraging modern data analytics tools and methodologies to make informed decisions and drive sustainable business growth.',
      author: 'John Martinez',
      date: '2024-01-10',
      readTime: '9 min read',
      category: 'Industry Trends',
      categorySlug: 'industry-trends',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      featured: false,
      tags: ['Data Analytics', 'Business Intelligence', 'Strategy']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.categorySlug === selectedCategory;
    
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
      
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">All Articles</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore our comprehensive collection of insights, tutorials, and thought leadership content
              on technology, innovation, and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles, authors, or topics..."
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
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              Showing {sortedArticles.length} of {articles.length} articles
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.id}`} className="group">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.featured && (
                        <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                          Featured
                        </Badge>
                      )}
                      <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                        {article.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {article.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(article.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;
