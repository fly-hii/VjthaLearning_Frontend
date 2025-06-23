
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const WebDevelopment = () => {
  const webDevArticles = [
    {
      id: 1,
      title: "Modern React Patterns and Best Practices",
      excerpt: "Exploring the latest React patterns for building scalable applications...",
      author: "Emma Thompson",
      date: "2024-06-20",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Building Responsive Web Applications with CSS Grid",
      excerpt: "Master CSS Grid to create complex, responsive layouts effortlessly...",
      author: "Carlos Martinez",
      date: "2024-06-19",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
      tags: ["CSS", "Grid", "Responsive Design"]
    },
    {
      id: 3,
      title: "Node.js Performance Optimization Techniques",
      excerpt: "Learn how to optimize your Node.js applications for better performance...",
      author: "Ryan Kim",
      date: "2024-06-18",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      tags: ["Node.js", "Performance", "Backend"]
    },
    {
      id: 4,
      title: "TypeScript Advanced Features and Use Cases",
      excerpt: "Diving deep into TypeScript's advanced features for better code quality...",
      author: "Sarah Miller",
      date: "2024-06-17",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
      tags: ["TypeScript", "JavaScript", "Development"]
    },
    {
      id: 5,
      title: "Progressive Web Apps: The Future of Web Development",
      excerpt: "Building PWAs that provide native app experiences on the web...",
      author: "Alex Chen",
      date: "2024-06-16",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop",
      tags: ["PWA", "Web Development", "Mobile"]
    },
    {
      id: 6,
      title: "GraphQL vs REST: Choosing the Right API Approach",
      excerpt: "Comparing GraphQL and REST APIs to help you make the right choice...",
      author: "Michael Brown",
      date: "2024-06-15",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop",
      tags: ["GraphQL", "REST", "API"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-8 bg-gray-50 border-b-4 border-black">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Web Development</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and techniques in web development
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="bg-gray-100 p-6 border-4 border-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {webDevArticles.map((article) => (
                    <Card key={article.id} className="bg-white border-2 border-gray-300 hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-40 object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                          Web Dev
                        </Badge>
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
              </div>
            </div>

            <div className="w-80">
              <div className="bg-gray-100 p-6 border-4 border-black">
                <h2 className="text-xl font-bold mb-6 text-center">Latest Web Dev Articles</h2>
                <div className="space-y-4">
                  {webDevArticles.slice(0, 5).map((article) => (
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

export default WebDevelopment;
