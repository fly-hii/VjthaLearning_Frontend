
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, ChevronRight, Clock, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = {
    id: 1,
    title: 'The Future of Artificial Intelligence in Business Automation: Transforming Industries',
    excerpt: 'Discover how AI is revolutionizing business processes across industries, from healthcare to finance, and creating unprecedented opportunities for growth, efficiency, and innovation in the digital age.',
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    readTime: '12 min read',
    category: 'AI & Machine Learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    featured: true,
    views: '15.2K'
  };

  const editorsPicks = [
    {
      id: 2,
      title: 'Building Scalable React Applications: Modern Architecture Patterns for 2024',
      excerpt: 'A comprehensive guide to structuring React applications for enterprise-level scalability and maintainability.',
      author: 'Michael Rodriguez',
      date: '2024-01-14',
      readTime: '10 min read',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      views: '8.7K'
    },
    {
      id: 3,
      title: 'Cybersecurity Trends 2024: Protecting Your Digital Assets in an Evolving Landscape',
      excerpt: 'Stay ahead of emerging cyber threats with comprehensive strategies and cutting-edge security practices.',
      author: 'Emma Thompson',
      date: '2024-01-13',
      readTime: '8 min read',
      category: 'Tech Innovation',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
      views: '12.1K'
    },
    {
      id: 4,
      title: 'Remote Work Revolution: How Companies Are Adapting to the New Normal',
      excerpt: 'Inside look at successful remote work implementations and the tools shaping the future workplace.',
      author: 'David Kim',
      date: '2024-01-12',
      readTime: '6 min read',
      category: 'Company Culture',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop',
      views: '9.3K'
    }
  ];

  const trendingArticles = [
    {
      id: 5,
      title: 'Machine Learning Models That Changed Everything: A Deep Dive Analysis',
      excerpt: 'Exploring breakthrough ML models and their real-world applications across different industries.',
      author: 'Lisa Park',
      date: '2024-01-11',
      readTime: '15 min read',
      category: 'AI & Machine Learning',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      trending: true,
      views: '18.5K'
    },
    {
      id: 6,
      title: 'Cloud Computing Giants: AWS vs Azure vs Google Cloud in 2024',
      excerpt: 'Comprehensive comparison of major cloud platforms and their latest features.',
      author: 'John Martinez',
      date: '2024-01-10',
      readTime: '11 min read',
      category: 'Cloud Technology',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
      trending: true,
      views: '14.2K'
    },
    {
      id: 7,
      title: 'The Rise of Low-Code Platforms: Democratizing Software Development',
      excerpt: 'How low-code solutions are empowering non-developers to create powerful applications.',
      author: 'Rachel Green',
      date: '2024-01-09',
      readTime: '9 min read',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      trending: true,
      views: '11.8K'
    }
  ];

  const latestArticles = [
    {
      id: 8,
      title: 'DevOps Best Practices: Streamlining Development and Operations',
      author: 'Alex Johnson',
      date: '2024-01-08',
      readTime: '7 min read',
      category: 'DevOps',
      image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=300&h=200&fit=crop',
      views: '6.4K'
    },
    {
      id: 9,
      title: 'Blockchain Beyond Cryptocurrency: Real-World Applications',
      author: 'Sophie Chen',
      date: '2024-01-07',
      readTime: '10 min read',
      category: 'Blockchain',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop',
      views: '8.1K'
    },
    {
      id: 10,
      title: 'UI/UX Design Principles That Convert: A Data-Driven Approach',
      author: 'Tom Wilson',
      date: '2024-01-06',
      readTime: '8 min read',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-36f80b15ad06?w=300&h=200&fit=crop',
      views: '7.9K'
    },
    {
      id: 11,
      title: 'Sustainable Tech: Green Computing and Environmental Responsibility',
      author: 'Maria Garcia',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300&h=200&fit=crop',
      views: '5.7K'
    }
  ];

  const quickReads = [
    {
      id: 12,
      title: '5 Essential VS Code Extensions for React Developers',
      author: 'Chris Lee',
      readTime: '3 min read',
      views: '4.2K'
    },
    {
      id: 13,
      title: 'JavaScript ES2024: New Features You Should Know',
      author: 'Anna Kumar',
      readTime: '4 min read',
      views: '6.1K'
    },
    {
      id: 14,
      title: 'Docker vs Kubernetes: When to Use Each',
      author: 'Mark Stevens',
      readTime: '5 min read',
      views: '7.3K'
    }
  ];

  const categories = [
    { name: 'AI & Machine Learning', count: 24, color: 'bg-purple-100 text-purple-800' },
    { name: 'Web Development', count: 32, color: 'bg-blue-100 text-blue-800' },
    { name: 'Cloud Technology', count: 18, color: 'bg-green-100 text-green-800' },
    { name: 'DevOps', count: 16, color: 'bg-orange-100 text-orange-800' },
    { name: 'Cybersecurity', count: 21, color: 'bg-red-100 text-red-800' },
    { name: 'Design', count: 14, color: 'bg-pink-100 text-pink-800' }
  ];

  return (
    
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="bg-white text-red-600 font-bold">BREAKING</Badge>
            <p className="text-sm font-medium">
              Major AI breakthrough announced: OpenAI releases GPT-5 with unprecedented capabilities
            </p>
          </div>
      <Navigation />

      {/* Breaking News Banner */}
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="bg-white text-red-600 font-bold">BREAKING</Badge>
            <p className="text-sm font-medium">
              Major AI breakthrough announced: OpenAI releases GPT-5 with unprecedented capabilities
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Star className="w-8 h-8 mr-3 text-yellow-500" />
              Featured Story
            </h2>
          </div>
          
          <Link to={`/article/${featuredArticle.id}`} className="group">
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className="bg-red-600 text-white">Featured</Badge>
                    <Badge variant="outline">{featuredArticle.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredArticle.views} views
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredArticle.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredArticle.date).toLocaleDateString()}
                      </div>
                      <span className="font-medium">{featuredArticle.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Editor's Picks */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Star className="w-7 h-7 mr-3 text-blue-600" />
              Editor's Picks
            </h2>
            <Link to="/articles" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {editorsPicks.map((article) => (
              <Link key={article.id} to={`/article/${article.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.views}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-7 h-7 mr-3 text-green-600" />
              Trending Now
            </h2>
            <Link to="/articles" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {trendingArticles.map((article) => (
              <Link key={article.id} to={`/article/${article.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-green-600 text-white flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <span className="flex items-center font-medium text-green-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.views}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles & Quick Reads */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Latest Articles */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
                <Link to="/articles" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-6">
                {latestArticles.map((article) => (
                  <Link key={article.id} to={`/article/${article.id}`} className="group">
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="flex">
                        <div className="w-32 h-24 flex-shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="flex-1 p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline" className="text-xs">{article.category}</Badge>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {article.views}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Reads */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Reads</h3>
                <div className="space-y-4">
                  {quickReads.map((article) => (
                    <Link key={article.id} to={`/article/${article.id}`} className="group block">
                      <Card className="p-4 hover:shadow-md transition-all duration-300">
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{article.author}</span>
                          <div className="flex items-center space-x-2">
                            <span>{article.readTime}</span>
                            <span>•</span>
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 group"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-blue-600">
                        {category.name}
                      </span>
                      <Badge className={category.color}>{category.count}</Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      <Footer />
    </div>
  );
};

export default Index;
