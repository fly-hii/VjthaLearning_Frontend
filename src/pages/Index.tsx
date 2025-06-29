import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, ChevronRight, Clock, TrendingUp, Star, ChevronLeft, Play } from 'lucide-react';
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
import { BackToTop } from './BacktoTop';
import { cardcategories } from '@/hooks/categoriesdata';
const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

const categoryCards = Object.entries(cardcategories).map(([key, category]) => ({
  key,
  name: category.name,
  image: category.image,
}));
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
  },
  {
    id: 13,
    title: 'The Rise of Edge Computing in IoT',
    excerpt: 'How edge computing enhances the efficiency and speed of IoT systems.',
    author: 'Nina Patel',
    date: '2024-01-03',
    category: 'IoT',
    image: 'https://images.unsplash.com/photo-1549921296-3a7636c6e70b?w=400&h=250&fit=crop',
    readTime: '7 min read'
  },
  {
    id: 14,
    title: 'Cybersecurity Trends to Watch This Year',
    excerpt: 'Emerging threats and how organizations can prepare for them.',
    author: 'Robert Singh',
    date: '2024-01-02',
    category: 'Cybersecurity',
    image: 'https://images.unsplash.com/photo-1600267165986-3d1b99f36ad9?w=400&h=250&fit=crop',
    readTime: '6 min read'
  },
  {
    id: 15,
    title: 'No-Code Platforms: The New Developer Toolkit?',
    excerpt: 'A look at how no-code tools are enabling rapid application development.',
    author: 'Aisha Khan',
    date: '2024-01-01',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1581091226825-5ecb7823a46e?w=400&h=250&fit=crop',
    readTime: '5 min read'
  },
  {
    id: 16,
    title: 'How 5G is Redefining Connectivity',
    excerpt: 'The role of 5G networks in transforming communication and industries.',
    author: 'Liam Roberts',
    date: '2023-12-31',
    category: 'Telecom',
    image: 'https://images.unsplash.com/photo-1600267141133-1c0825ef098b?w=400&h=250&fit=crop',
    readTime: '7 min read'
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
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const articleChunks = chunkArray(firstBlogPosts, 6);
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

      {/* Hero Section with Search */}
      <section className="py-16 to-blue min-xl-screen from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-orange-400 via-yellow-400 via-green-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Vjtha makes it easy to explore and share knowledge
          </h1>
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                type="text"
                placeholder="Search articles, jobs, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-6 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-white shadow-xl shadow-[0_20px_25px_-5px_rgba(0,2,245,0.5)]"
              />
            </div>
          </div>

          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Start Exploring
          </Button>
        </div>
      </section>

      {/* Category Cards Slider */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Carousel className="w-full max-w-7xl mx-auto relative">
          {/* Left Arrow */}
          <CarouselPrevious className="absolute  -left-10 top-1/2 -translate-y-1/2 z-10 bg-blue-200 hover:bg-gray-50 border shadow-lg" />
          <CarouselContent className="-ml-4">
            {categoryCards.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/6"
              >
                <Link to={category.link} className="group block">
                  <Card
                    className={`overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 h-80 ${category.bgColor} border-0`}
                  >
                    <CardContent className="p-0 h-full relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                      {/* Background Image */}
                      <div className="absolute inset-0  group-hover:opacity-50 transition-opacity duration-300">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-white/80 uppercase tracking-wide font-medium">
                              Explore
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Right Arrow */}
          <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 bg-blue-200 hover:bg-gray-50 border shadow-lg" />
        </Carousel>

        </div>
      </section>

      {/* Vjtha Specials Section - New Layout Based on Wireframe */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 border-b-4 border-black pb-2 inline-block">
              Vjtha Specials
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Two boxes with article lists */}
            <div className="lg:col-span-2 space-y-8">
              {/* First Box */}
              <div className="bg-white border-2 border-gray-100 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {highlightArticles.slice(0, 10).map((article) => (
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
            <div className="lg:col-span-1" >
              <div className="bg-white border-2 border-gray-100 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow rounded-lg p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-dashed border-gray-400 pb-2">
                  Highly Recommended
                </h3>
                <Carousel className="w-full">
                  <CarouselContent>
                    {articleChunks.map((group, index) => (
                      <CarouselItem key={index}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {group.map((article) => (
                            <Link to={`/article/${article.id}`} key={article.id} className="group block bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
                              <h4 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {article.title}
                              </h4>
                              <p className="text-xs text-gray-600 mb-2 line-clamp-3">{article.excerpt}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{article.author}</span>
                                <span>{article.readTime}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
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
            <h2 className="text-3xl font-bold text-gray-900">Technologies Blog</h2>
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
            <h2 className="text-3xl font-bold text-gray-900">Education Blog</h2>
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
            <h2 className="text-3xl font-bold text-gray-900">Jobs Blog</h2>
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
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Index;
