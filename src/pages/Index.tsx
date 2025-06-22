
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import NewsletterSignup from '@/components/NewsletterSignup';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Tech Innovation', count: 24, color: 'bg-blue-100 text-blue-800' },
    { name: 'AI & Machine Learning', count: 18, color: 'bg-purple-100 text-purple-800' },
    { name: 'Web Development', count: 32, color: 'bg-green-100 text-green-800' },
    { name: 'Company Culture', count: 16, color: 'bg-orange-100 text-orange-800' },
    { name: 'Industry Trends', count: 28, color: 'bg-pink-100 text-pink-800' },
    { name: 'Case Studies', count: 12, color: 'bg-indigo-100 text-indigo-800' },
  ];

  const trendingPosts = [
    {
      id: 1,
      title: 'The Future of AI in Web Development: Trends to Watch in 2024',
      excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications.',
      author: 'Sarah Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'AI & ML',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Building Scalable React Applications: Best Practices and Patterns',
      excerpt: 'A comprehensive guide to structuring React applications for long-term maintainability and performance.',
      author: 'Michael Rodriguez',
      date: '2024-01-14',
      readTime: '12 min read',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Remote Work Culture: How FlyHii Media Adapts to the Digital Age',
      excerpt: 'Inside look at how we maintain company culture and productivity in a distributed team environment.',
      author: 'Emma Thompson',
      date: '2024-01-13',
      readTime: '6 min read',
      category: 'Company Culture',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop'
    }
  ];

  const latestPosts = [
    {
      id: 4,
      title: 'Cybersecurity in 2024: Protecting Your Digital Assets',
      excerpt: 'Essential security measures every business should implement to stay safe online.',
      author: 'David Kim',
      date: '2024-01-12',
      readTime: '10 min read',
      category: 'Tech Innovation',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'UX Design Principles That Drive User Engagement',
      excerpt: 'How thoughtful design choices can significantly impact user behavior and business outcomes.',
      author: 'Lisa Park',
      date: '2024-01-11',
      readTime: '7 min read',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1561070791-36f80b15ad06?w=600&h=400&fit=crop'
    },
    {
      id: 6,
      title: 'Data Analytics: Turning Information into Business Intelligence',
      excerpt: 'Leveraging data analytics tools to make informed decisions and drive growth.',
      author: 'John Martinez',
      date: '2024-01-10',
      readTime: '9 min read',
      category: 'Industry Trends',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSlider />

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                  <CardContent className="p-6 text-center">
                    <Badge className={`${category.color} mb-3 text-sm font-medium`}>
                      {category.count} articles
                    </Badge>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Articles */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            <Link to="/articles" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {trendingPosts.map((post, index) => (
              <Link key={post.id} to={`/article/${post.id}`} className="group">
                <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        index === 0 ? 'h-64 lg:h-80' : 'h-48'
                      }`}
                    />
                    {post.featured && (
                      <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                        Featured
                      </Badge>
                    )}
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${
                      index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                    }`}>
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <span className="font-medium">{post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <Link to="/articles" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link key={post.id} to={`/article/${post.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <span className="font-medium">{post.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Services Preview */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need IT Solutions?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Beyond sharing insights, we provide comprehensive IT services to help your business thrive in the digital age.
          </p>
          <Link to="/services">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Explore Our Services <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
