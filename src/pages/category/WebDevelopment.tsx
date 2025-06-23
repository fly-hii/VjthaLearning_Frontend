import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { webDevArticles } from '@/lib/mockdata'; // Assuming you have a data file with web development articles

const WebDevelopment = () => {
  const webDevArtices =webDevArticles;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Web Development</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and techniques in web development
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Left Column: Articles */}
            <div className="flex-1">
              <div className="bg-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {webDevArticles.map((article) => (
                    <Card
                      key={article.id}
                      className="bg-white border-2 border-gray-300 hover:shadow-lg hover:shadow-green-500/40 transition-shadow"
                    >
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

            {/* Right Column: Sidebar */}
            <div className="w-80">
              <div className="bg-gray-100 p-6 hover:shadow-lg hover:shadow-green-500/40 transition-shadow">
                <h2 className="text-xl font-bold mb-6 text-center">Latest Web Dev Articles</h2>
                <div className="space-y-4">
                  {webDevArticles.slice(0, 5).map((article) => (
                    <div
                      key={article.id}
                      className="flex gap-3 pb-4 border-b border-gray-300 last:border-b-0"
                    >
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