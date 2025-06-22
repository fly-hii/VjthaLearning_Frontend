
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, ChevronRight, Clock, TrendingUp, Star, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const highlightArticles = [
    {
      id: 1,
      title: 'The Future of Artificial Intelligence in Business Automation',
      excerpt: 'Discover how AI is revolutionizing business processes across industries.',
      author: 'Dr. Sarah Chen',
      date: '2024-01-15',
      category: 'AI & Machine Learning',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      readTime: '12 min read'
    },
    {
      id: 2,
      title: 'Building Scalable React Applications: Modern Architecture Patterns',
      excerpt: 'A comprehensive guide to structuring React applications for enterprise-level scalability.',
      author: 'Michael Rodriguez',
      date: '2024-01-14',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      readTime: '10 min read'
    },
    {
      id: 3,
      title: 'Cybersecurity Trends 2024: Protecting Your Digital Assets',
      excerpt: 'Stay ahead of emerging cyber threats with comprehensive strategies.',
      author: 'Emma Thompson',
      date: '2024-01-13',
      category: 'Tech Innovation',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
      readTime: '8 min read'
    },
    {
      id: 4,
      title: 'Remote Work Revolution: How Companies Are Adapting',
      excerpt: 'Inside look at successful remote work implementations.',
      author: 'David Kim',
      date: '2024-01-12',
      category: 'Company Culture',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop',
      readTime: '6 min read'
    },
    {
      id: 5,
      title: 'Machine Learning Models That Changed Everything',
      excerpt: 'Exploring breakthrough ML models and their real-world applications.',
      author: 'Lisa Park',
      date: '2024-01-11',
      category: 'AI & Machine Learning',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      readTime: '15 min read'
    },
    {
      id: 6,
      title: 'Cloud Computing Giants: AWS vs Azure vs Google Cloud',
      excerpt: 'Comprehensive comparison of major cloud platforms.',
      author: 'John Martinez',
      date: '2024-01-10',
      category: 'Cloud Technology',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
      readTime: '11 min read'
    },
    {
      id: 7,
      title: 'The Rise of Low-Code Platforms',
      excerpt: 'How low-code solutions are empowering non-developers.',
      author: 'Rachel Green',
      date: '2024-01-09',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      readTime: '9 min read'
    },
    {
      id: 8,
      title: 'DevOps Best Practices: Streamlining Development',
      excerpt: 'Essential practices for modern development workflows.',
      author: 'Alex Johnson',
      date: '2024-01-08',
      category: 'DevOps',
      image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=250&fit=crop',
      readTime: '7 min read'
    },
    {
      id: 9,
      title: 'Blockchain Beyond Cryptocurrency: Real-World Applications',
      excerpt: 'Exploring practical applications of blockchain technology beyond digital currencies.',
      author: 'Sophie Chen',
      date: '2024-01-07',
      category: 'Blockchain',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
      readTime: '10 min read'
    },
    {
      id: 10,
      title: 'UI/UX Design Principles That Convert',
      excerpt: 'Data-driven approach to creating user interfaces that drive results.',
      author: 'Tom Wilson',
      date: '2024-01-06',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-36f80b15ad06?w=400&h=250&fit=crop',
      readTime: '8 min read'
    },
    {
      id: 11,
      title: 'Sustainable Tech: Green Computing Revolution',
      excerpt: 'Environmental responsibility in the technology sector.',
      author: 'Maria Garcia',
      date: '2024-01-05',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop',
      readTime: '6 min read'
    },
    {
      id: 12,
      title: 'Mobile App Development Trends 2024',
      excerpt: 'Latest trends shaping the mobile application development landscape.',
      author: 'James Lee',
      date: '2024-01-04',
      category: 'Mobile Development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      readTime: '9 min read'
    }
  ];

  const firstBlogPosts = [
    {
      id: 9,
      title: 'Blockchain Beyond Cryptocurrency: Real-World Applications',
      excerpt: 'Exploring practical applications of blockchain technology beyond digital currencies.',
      author: 'Sophie Chen',
      date: '2024-01-07',
      category: 'Blockchain',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
      readTime: '10 min read'
    },
    {
      id: 10,
      title: 'UI/UX Design Principles That Convert',
      excerpt: 'Data-driven approach to creating user interfaces that drive results.',
      author: 'Tom Wilson',
      date: '2024-01-06',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-36f80b15ad06?w=400&h=250&fit=crop',
      readTime: '8 min read'
    },
    {
      id: 11,
      title: 'Sustainable Tech: Green Computing Revolution',
      excerpt: 'Environmental responsibility in the technology sector.',
      author: 'Maria Garcia',
      date: '2024-01-05',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop',
      readTime: '6 min read'
    },
    {
      id: 12,
      title: 'Mobile App Development Trends 2024',
      excerpt: 'Latest trends shaping the mobile application development landscape.',
      author: 'James Lee',
      date: '2024-01-04',
      category: 'Mobile Development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      readTime: '9 min read'
    }
  ];

  const secondBlogPosts = [
    {
      id: 13,
      title: 'Data Analytics: Turning Information into Insights',
      excerpt: 'How modern businesses leverage data analytics for competitive advantage.',
      author: 'Dr. Amanda Foster',
      date: '2024-01-03',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      readTime: '12 min read'
    },
    {
      id: 14,
      title: 'Internet of Things: Connecting Our World',
      excerpt: 'The expanding ecosystem of connected devices and their impact.',
      author: 'Robert Kim',
      date: '2024-01-02',
      category: 'IoT',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
      readTime: '11 min read'
    },
    {
      id: 15,
      title: 'Quantum Computing: The Next Frontier',
      excerpt: 'Understanding the potential and challenges of quantum technology.',
      author: 'Dr. Lisa Wang',
      date: '2024-01-01',
      category: 'Quantum Computing',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
      readTime: '14 min read'
    },
    {
      id: 16,
      title: 'Digital Transformation in Healthcare',
      excerpt: 'How technology is revolutionizing patient care and medical practices.',
      author: 'Dr. Mark Johnson',
      date: '2023-12-31',
      category: 'Healthcare Tech',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      readTime: '10 min read'
    }
  ];

const highlights = [
  {
    title: 'Empowering Fresh Talent',
    subtitle: 'Find the right job to kickstart your career journey with personalized matches and support at every step.',
  },
  {
    title: 'Real-Time Job Updates',
    subtitle: 'Stay updated with the latest job opportunities, notifications, and alerts tailored to your profile.',
  },
  {
    title: 'Trusted by Thousands',
    subtitle: 'Join a growing community of job seekers and recruiters across India who trust our platform to build careers.',
  },
  {
    title: 'Boost Your Visibility',
    subtitle: 'Stand out from the crowd and get discovered by top recruiters through an optimized and professional profile.',
  },
];

const [currentSlide, setCurrentSlide] = useState(0);

// Auto-slide every 5 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % highlights.length);
  }, 5000); // 5000ms = 5 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, []);

  return (
    <div className="bg-white text-black">
      <Navigation />

      {/* Search Bar */}
      <section className="py-6 bg-blue-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Scrollings of Hot Topics"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-full bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-2 text-center">
          <div className="relative max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 transition-all duration-500">
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">
              {highlights[currentSlide].title}
            </h3>
            <p className="text-gray-600">{highlights[currentSlide].subtitle}</p>
          </div>

          {/* Optional: Dots for slide indicators */}
          <div className="flex justify-center mt-4 mb-4 space-x-2">
            {highlights.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              ></span>
            ))}
          </div>
        </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-16 gap-6">
            {highlightArticles.slice(0, 8).map((article) => (
              <Link key={article.id} to={`/article/${article.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full bg-white/80 backdrop-blur-sm">
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
      </section>

      {/* Flyhii Specials Section - New Layout Based on Wireframe */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 border-b-4 border-black pb-2 inline-block">
              Flyhii Specials
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Two boxes with article lists */}
            <div className="lg:col-span-2 space-y-8">
              {/* First Box */}
              <div className="bg-white border-4 border-gray-400 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {highlightArticles.slice(0, 6).map((article) => (
                    <Link key={article.id} to={`/article/${article.id}`} className="group flex space-x-4">
                      <div className="w-20 h-16 bg-gray-400 rounded flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Second Box */}
              <div className="bg-white border-4 border-gray-400 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {highlightArticles.slice(6, 12).map((article) => (
                    <Link key={article.id} to={`/article/${article.id}`} className="group flex space-x-4">
                      <div className="w-20 h-16 bg-gray-400 rounded flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Highly Recommended with Slider */}
            <div className="lg:col-span-1">
              <div className="bg-white border-4 border-gray-400 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-dashed border-gray-400 pb-2">
                  Highly Recommended
                </h3>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {firstBlogPosts.map((article) => (
                      <CarouselItem key={article.id}>
                        <Link to={`/article/${article.id}`} className="group block">
                          <div className="space-y-4">
                            <div className="w-full h-40 bg-gray-400 rounded">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-3 group-hover:text-blue-600 transition-colors">
                                {article.title}
                              </h4>
                              <p className="text-xs text-gray-600 mb-3 line-clamp-3">{article.excerpt}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{article.author}</span>
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4 space-x-2">
                    <CarouselPrevious className="relative inset-auto translate-y-0 translate-x-0" />
                    <CarouselNext className="relative inset-auto translate-y-0 translate-x-0" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Blog Section with Slider */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">First Blog</h2>
            <Link to="/articles" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {firstBlogPosts.map((article) => (
                <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link to={`/article/${article.id}`} className="group block">
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                      <div className="flex lg:flex-col">
                        <div className="w-16 h-12 lg:w-full lg:h-48 flex-shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="flex-1 p-4 lg:p-6">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {article.category}
                          </Badge>
                          <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Second Blog Section with Slider */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Second Blog</h2>
            <Link to="/articles" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {secondBlogPosts.map((article) => (
                <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link to={`/article/${article.id}`} className="group block">
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                      <div className="flex lg:flex-col">
                        <div className="w-32 h-24 lg:w-full lg:h-48 flex-shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="flex-1 p-4 lg:p-6">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {article.category}
                          </Badge>
                          <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Third Blog Section with Slider */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Third Blog</h2>
            <Link to="/articles" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {highlightArticles.slice(4, 8).map((article) => (
                <CarouselItem key={article.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link to={`/article/${article.id}`} className="group block">
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                      <div className="flex lg:flex-col">
                        <div className="w-32 h-24 lg:w-full lg:h-48 flex-shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="flex-1 p-4 lg:p-6">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {article.category}
                          </Badge>
                          <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      <Footer />
    </div>
  );
};

export default Index;
