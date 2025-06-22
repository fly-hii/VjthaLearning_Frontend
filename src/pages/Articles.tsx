
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
    title: '10 JavaScript Frameworks Developers Love in 2025',
    excerpt: 'Discover the top JavaScript frameworks that are dominating the development scene this year and why they’re preferred by modern developers.',
    author: 'John Miller',
    date: '2025-02-20',
    readTime: '6 min read',
    category: 'Web Development',
    categorySlug: 'web-dev',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b2c2b47b?w=600&h=400&fit=crop',
    featured: false,
    tags: ['JavaScript', 'Frameworks', 'Frontend']
  },
  {
    id: 3,
    title: 'Why Every Developer Should Learn DevOps in 2025',
    excerpt: 'From continuous deployment to monitoring and automation, here’s why DevOps skills are becoming essential in the software industry.',
    author: 'Emily Rojas',
    date: '2025-03-05',
    readTime: '7 min read',
    category: 'DevOps',
    categorySlug: 'devops',
    image: 'https://images.unsplash.com/photo-1581091215367-59a6f41d7c94?w=600&h=400&fit=crop',
    featured: true,
    tags: ['DevOps', 'CI/CD', 'Cloud']
  },
  {
    id: 4,
    title: 'UX Design Principles That Will Rule in 2025',
    excerpt: 'Design trends change fast. Here are the core user experience principles that will define great digital products this year.',
    author: 'Lisa Ahmed',
    date: '2025-04-10',
    readTime: '5 min read',
    category: 'UI/UX Design',
    categorySlug: 'ui-ux',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa7023?w=600&h=400&fit=crop',
    featured: false,
    tags: ['UX Design', 'UI Trends', 'User Research']
  },
  {
    id: 5,
    title: 'Getting Started with TypeScript: A Beginner’s Guide',
    excerpt: 'TypeScript is taking over JavaScript projects. Learn the basics, benefits, and how to integrate it into your frontend or backend apps.',
    author: 'Mark Thompson',
    date: '2025-01-25',
    readTime: '9 min read',
    category: 'Programming',
    categorySlug: 'programming',
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600&h=400&fit=crop',
    featured: false,
    tags: ['TypeScript', 'JavaScript', 'Frontend']
  },
  {
    id: 6,
    title: 'Building Scalable APIs with Node.js and Express',
    excerpt: 'Learn how to build robust and scalable APIs using Node.js, Express, and best practices for performance and security.',
    author: 'Anita Deshmukh',
    date: '2025-02-12',
    readTime: '10 min read',
    category: 'Backend Development',
    categorySlug: 'backend',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    featured: true,
    tags: ['Node.js', 'API', 'Backend']
  },
  {
    id: 7,
    title: 'How to Ace Technical Interviews in 2025',
    excerpt: 'With changing trends in hiring, here’s how you can prepare for coding interviews, system design rounds, and behavioral questions.',
    author: 'Daniel Osei',
    date: '2025-03-18',
    readTime: '6 min read',
    category: 'Career',
    categorySlug: 'career',
    image: 'https://images.unsplash.com/photo-1612832021605-09d4951abeb7?w=600&h=400&fit=crop',
    featured: false,
    tags: ['Interviews', 'Tech Jobs', 'Preparation']
  },
  {
    id: 8,
    title: 'Top Cloud Platforms Compared: AWS vs Azure vs GCP',
    excerpt: 'Which cloud provider should you choose for your next project? We break down the pros, cons, and pricing.',
    author: 'Ravi Kiran',
    date: '2025-01-10',
    readTime: '8 min read',
    category: 'Cloud Computing',
    categorySlug: 'cloud',
    image: 'https://images.unsplash.com/photo-1581093588401-7a6e24b28279?w=600&h=400&fit=crop',
    featured: false,
    tags: ['Cloud', 'AWS', 'Azure', 'GCP']
  },
  {
    id: 9,
    title: 'React vs Vue: Which Framework to Use in 2025?',
    excerpt: 'A head-to-head comparison of React and Vue for developers choosing the best frontend library.',
    author: 'Priya Menon',
    date: '2025-03-02',
    readTime: '7 min read',
    category: 'Frontend',
    categorySlug: 'frontend',
    image: 'https://images.unsplash.com/photo-1618375525315-f51f1f8477b3?w=600&h=400&fit=crop',
    featured: true,
    tags: ['React', 'Vue', 'JavaScript']
  },
  {
    id: 10,
    title: 'Essential Git Commands Every Developer Should Know',
    excerpt: 'Version control is crucial. Here are the most useful Git commands that can save your workflow.',
    author: 'Javier Morales',
    date: '2025-04-01',
    readTime: '4 min read',
    category: 'Tools & Tips',
    categorySlug: 'tools',
    image: 'https://images.unsplash.com/photo-1610878180933-6c2adf7f94dd?w=600&h=400&fit=crop',
    featured: false,
    tags: ['Git', 'Version Control', 'Tools']
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
