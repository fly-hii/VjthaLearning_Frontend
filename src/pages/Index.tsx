/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, ChevronRight, Clock, TrendingUp, Star, ChevronLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/NewsletterSignup';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import { Articles } from '@/totalPages/articles';

// Define a fallback Articles type if the module is missing
type Articles = {
  _id?: string;
  id?: string | number;
  slug?: string;
  title: string;
  excerpt?: string;
  content?: string;
  author?: string;
  readTime?: string;
  featuredImage?: string;
  image?: string;
  category?: string;
};
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BackToTop } from './BacktoTop';
import { cardcategories } from '@/hooks/categoriesdata';
import { articlesApi, jobsApi } from '@/Services/api';
import { useQuery } from '@tanstack/react-query';
const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

const categoryCards = Object.entries(cardcategories).map(([key, category]) => ({
  key,
  name: category.name,
  image: category.image,
  link: (category as { name: string; image: string; link?: string }).link || `${key}`,
}));
  const [highlightArticles, setHighlightArticles] = useState<Articles[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchHighlightArticles = async () => {
    try {
      const response = await articlesApi.getAll({
        limit: 10,
        sort: 'latest', // optional
        category: [
          '68594eb61cada6edbdbd06cc', // Case Study
          '68594dfb1cada6edbdbd06b7', // AI
          '68594f541cada6edbdbd06e6', // Web
          '68594f981cada6edbdbd06f2', // Industry
          '68594f111cada6edbdbd06d8', // Tech
          '68594f241cada6edbdbd06dc', // Culture
        ],
      });

      setHighlightArticles(
        response.slice(0, 10).map((article: any) => ({
          ...article,
          category: typeof article.category === 'string'
            ? article.category
            : (article.category?.name || ''),
        }))
      );
    } catch (error) {
      console.error('Failed to fetch highlight articles', error);
    } finally {
      setLoading(false);
    }
  };

  fetchHighlightArticles();
}, []);
///only industyr

  const [firstBlogPosts, setIndustryArticles] = useState<Articles[]>([]);


useEffect(() => {
  const fetchIndustryArticles = async () => {
    try {
      const response = await articlesApi.getAll({
        limit: 10,
        sort: 'latest',
        category: 'UI/UX Design', // Only Industry category
      });
      
      setIndustryArticles(
        response.map((article: any) => ({
          ...article,
          category: typeof article.category === 'string'
            ? article.category
            : (article.category?.name || ''),
        }))
      );
    } catch (error) {
      console.error('Failed to fetch industry articles', error);
    } finally {
      setLoading(false);
    }
  };

  fetchIndustryArticles();
}, []);

  const [secondBlogPosts, ssetIndustryArticles] = useState<Articles[]>([]);


useEffect(() => {
  const fetchIndustryArticles = async () => {
    try {
      const response = await articlesApi.getAll({
        limit: 10,
        sort: 'latest',
        category: ['68594dfb1cada6edbdbd06b7'], // Only Industry category
      });

      ssetIndustryArticles(
        response.map((article: any) => ({
          ...article,
          category: typeof article.category === 'string'
            ? article.category
            : (article.category?.name || ''),
        }))
      );
    } catch (error) {
      console.error('Failed to fetch industry articles', error);
    } finally {
      setLoading(false);
    }
  };

  fetchIndustryArticles();
}, []);

//third blog post
  const [thirdBlogPosts, sssetIndustryArticles] = useState<Articles[]>([]);


useEffect(() => {
  const fetchIndustryArticles = async () => {
    try {
      const response = await articlesApi.getAll({
        limit: 10,
        sort: 'latest',
        category: ['68594dfb1cada6edbdbd06b7'], // Only Industry category
      });

      sssetIndustryArticles(
        response.map((article: any) => ({
          ...article,
          category: typeof article.category === 'string'
            ? article.category
            : (article.category?.name || ''),
        }))
      );
    } catch (error) {
      console.error('Failed to fetch industry articles', error);
    } finally {
      setLoading(false);
    }
  };

  fetchIndustryArticles();
}, []);

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Fetch articles
  const { data: articlesData = [], isLoading: articlesLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () => articlesApi.getAll(),
  });

const articles = useMemo(() => {
  return Array.isArray(articlesData) ? articlesData : [];
}, [articlesData]);
  // ✅ Optional: Fetch jobs if not local
  const { data: jobsData = [], isLoading: jobsLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobsApi.getAll(),
  });

  const jobs =useMemo(() => { return Array.isArray(jobsData) ? jobsData : []; }, [jobsData]);

  // ✅ Auto-slide logic (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % articles.length); // or `highlights.length`
    }, 5000);
    return () => clearInterval(interval);
  }, [articles.length]);

  // ✅ Search effect
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      setFilteredResults([]);
      return;
    }

    const jobMatches = jobs.filter((job) =>
      ["title", "author", "name"].some((key) =>
        job[key]?.toLowerCase().includes(query)
      )
    );

    const articleMatches = articles.filter((article) =>
      ["title", "author", "name"].some((key) =>
        article[key]?.toLowerCase().includes(query)
      )
    );

    const results = [
      ...jobMatches.map((item) => ({ ...item, type: "job" })),
      ...articleMatches.map((item) => ({ ...item, type: "article" })),
    ];

    setFilteredResults(results);
  }, [searchQuery, jobs, articles]);

  const articleChunks = chunkArray(firstBlogPosts, 6);
const navigate = useNavigate();

const handleSearchSubmit = () => {
  const query = searchQuery.trim();
  if (query) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }
};


return (
  <div className="bg-gray text-black">
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
          <Button
            size="lg"
            onClick={() => handleSearchSubmit()} // 👈 add this
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Exploring
          </Button>

        </div>
      </section>

      {/* Category Cards Slider */}
      <section className="py-8 bg-50">
        <div className="container mx-auto px-4">
          <Carousel className="w-full max-w-7xl mx-auto relative">
          {/* Left Arrow */}
          <CarouselPrevious className="absolute  -left-10 top-1/2 -translate-y-1/2 z-10 bg-blue-200 hover:bg-gray-50 border shadow-lg" />
          <CarouselContent className="-ml-4">
            {categoryCards.map((category) => (
              <CarouselItem
                key={category.key}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/6"
              >
                <Link to={category.link} className="group block">
                  <Card
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 h-80 border-0"
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
                        <div className="flex items-center justify-between mt-60">
                          <div className="w-12 h-12 bg-white/20 border-black rounded-full flex items-center justify-center group-hover:bg-blue-400 transition-colors duration-300">
                            <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-black/80 uppercase tracking-wide font-medium">
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
      <section className="py-16 bg-100">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 border-b-4 border-black pb-2 inline-block">
              Vjtha Specials
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Two boxes with article lists */}
            {!loading && highlightArticles.length > 0 && (
  <div className="lg:col-span-2 space-y-8">
    <div className="bg-white border-2 border-gray-100 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlightArticles.slice(0, 10).map((article) => (
           <Link key={article._id} to={`/article/${article._id}`} className="group flex space-x-4">
          <div className="w-20 h-16 bg-gray-400 rounded flex-shrink-0 overflow-hidden">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
              {article.excerpt || article.content?.slice(0, 100) + '...'}
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{article.author || 'Unknown Author'}</span>
              <span className="mx-2">•</span>
              <span>{article.readTime || '2 min read'}</span>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  </div>
)}


            {/* Right Column - Highly Recommended with Slider */}
            <div className="lg:col-span-1" >
              <div className="bg-white border-2 border-100 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow rounded-lg p-4">
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
      
  <section className="py-16 bg-wh">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Technologies Blog</h2>
          <Link
            to="/articles"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {firstBlogPosts.map((article) => (
              <CarouselItem
                key={article._id || article.id || article.slug || article.title} // ✅ Unique key
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link to={`/article/${article.slug || article._id}`} className="group block">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex lg:flex-col">
                      <div className="w-16 h-12 lg:w-full lg:h-48 flex-shrink-0">
                        <img
                          src={article.image || article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="flex-1 p-4 lg:p-6">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {typeof article.category === 'object'
                            ? article.category.name
                            : article.category}
                        </Badge>
                        <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {article.excerpt || article.content?.slice(0, 120) + '...'}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.author || 'Unknown'}</span>
                          <span>{article.readTime || '3 min read'}</span>
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
       <section className="py-16 bg-wh">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Educational Blog</h2>
          <Link
            to="/articles"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {secondBlogPosts.map((article) => (
              <CarouselItem
                key={article._id || article.id || article.slug || article.title} // ✅ Unique key
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link to={`/article/${article.slug || article._id}`} className="group block">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex lg:flex-col">
                      <div className="w-16 h-12 lg:w-full lg:h-48 flex-shrink-0">
                        <img
                          src={article.image || article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="flex-1 p-4 lg:p-6">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {typeof article.category === 'object'
                            ? article.category.name
                            : article.category}
                        </Badge>
                        <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {article.excerpt || article.content?.slice(0, 120) + '...'}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.author || 'Unknown'}</span>
                          <span>{article.readTime || '3 min read'}</span>
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
       <section className="py-16 bg-wh">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Job Blog</h2>
          <Link
            to="/articles"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {thirdBlogPosts.map((article) => (
              <CarouselItem
                key={article._id || article.id || article.slug || article.title} // ✅ Unique key
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link to={`/article/${article.slug || article._id}`} className="group block">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex lg:flex-col">
                      <div className="w-16 h-12 lg:w-full lg:h-48 flex-shrink-0">
                        <img
                          src={article.image || article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="flex-1 p-4 lg:p-6">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {typeof article.category === 'object'
                            ? article.category.name
                            : article.category}
                        </Badge>
                        <h3 className="font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {article.excerpt || article.content?.slice(0, 120) + '...'}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.author || 'Unknown'}</span>
                          <span>{article.readTime || '3 min read'}</span>
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