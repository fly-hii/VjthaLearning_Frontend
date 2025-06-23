import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CompanyCulture = () => {
  const cultureArticles = [
    {
      id: 1,
      title: "Building a Remote-First Company Culture",
      excerpt: "How leading companies are creating inclusive remote work environments...",
      author: "Jennifer Adams",
      date: "2024-06-20",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      tags: ["Remote Work", "Culture", "Management"]
    },
    {
      id: 2,
      title: "Diversity and Inclusion in Tech: Progress and Challenges",
      excerpt: "Examining the current state of D&I initiatives in technology companies...",
      author: "Marcus Johnson",
      date: "2024-06-19",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop",
      tags: ["Diversity", "Inclusion", "Tech Culture"]
    },
    {
      id: 3,
      title: "The Future of Work: Hybrid Models and Employee Satisfaction",
      excerpt: "Exploring how hybrid work models are reshaping employee expectations...",
      author: "Lisa Park",
      date: "2024-06-18",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop",
      tags: ["Hybrid Work", "Employee Satisfaction", "Future of Work"]
    },
    {
      id: 4,
      title: "Mental Health Support in the Workplace",
      excerpt: "How companies are prioritizing employee mental health and well-being...",
      author: "Dr. Rachel Green",
      date: "2024-06-17",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
      tags: ["Mental Health", "Employee Well-being", "HR"]
    },
    {
      id: 5,
      title: "Innovation Through Cross-Functional Collaboration",
      excerpt: "Breaking down silos to foster innovation and creativity in teams...",
      author: "Tom Wilson",
      date: "2024-06-16",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
      tags: ["Collaboration", "Innovation", "Team Dynamics"]
    },
    {
      id: 6,
      title: "Creating Psychological Safety in Tech Teams",
      excerpt: "Building environments where team members feel safe to take risks and make mistakes...",
      author: "Amanda Foster",
      date: "2024-06-15",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop",
      tags: ["Psychological Safety", "Team Building", "Leadership"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Company Culture</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Insights into building great company cultures and workplace environments
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Main Section */}
            <div className="flex-1">
              <div className="bg-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cultureArticles.map((article) => (
                    <Card key={article.id} className="bg-white border-2 border-gray-300 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                      <div className="relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-40 object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-pink-600 text-white">
                          Culture
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

            {/* Sidebar */}
            <div className="w-80">
              <div className="bg-gray-100 p-6 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                <h2 className="text-xl font-bold mb-6 text-center">Latest Culture Articles</h2>
                <div className="space-y-4">
                  {cultureArticles.slice(0, 5).map((article) => (
                    <div key={article.id} className="flex gap-3 pb-4 border-b border-gray-300 last:border-b-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-16 object-cover rounded bg-gray-300"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
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

export default CompanyCulture;