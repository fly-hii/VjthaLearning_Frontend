
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CommonSidebar from '@/components/CommonSidebar';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '@/Services/api';
import type { Article } from '@/types/api';
import { useGroupedArticlesByCategory } from '@/hooks/useFilteredArticles';
import { subcategories } from '@/hooks/categoriesdata';
import { AIPopup } from '../AIPopup'; // Assuming you have an AI popup component
const CaseStudies = () => {
     const [page, setPage] = useState(1);
  const articlesPerPage = 20;
  const targetCategories = Object.values(subcategories.caseStudies);

  const { groupedArticles, isLoading } = useGroupedArticlesByCategory(targetCategories);

  // Flatten articles across filtered categories
  const allFilteredArticles = Object.values(groupedArticles).flat();

  const totalPages = Math.ceil(allFilteredArticles.length / articlesPerPage);
  const paginatedArticles = allFilteredArticles.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

if (isLoading) {
  return (
          <><Navigation />
           <AIPopup /> {/* AI Assistant Popup */}
      <div className="flex items-center justify-center h-[50vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading articles...</p>
      </div>
    </div></>
  );
}
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-center">Case Studies</h1>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Real-world examples and detailed analysis of successful projects and strategies
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1" style={{ width: '75%' }}>
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading articles...</p>
                </div>
              ) : allFilteredArticles.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">No articles found</h3>
                  <p className="text-gray-600 mb-8">Check back later for new case study articles.</p>
                </div>
              ) : (
                <div className="bg-gray-100 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedArticles.map((article: Article) => (
                      <Card key={article._id} className="bg-white border-2 border-gray-300 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                        <div className="relative">
                          {article.featuredImage && (
                            <img
                              src={article.featuredImage}
                              alt={article.title}
                              className="w-full h-40 object-cover"
                            />
                          )}
                          <Badge className="absolute top-2 right-2 bg-purple-600 text-white">
                            Case Study
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {article.excerpt || (article.content ? article.content.substring(0, 150) + '...' : 'No preview available')}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {article.author || 'Unknown Author'}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          <Link to={`/article/${article._id}`}>
                            <Button size="sm" className="w-full">
                              Read More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2 flex-wrap">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                          key={i + 1}
                          variant={page === i + 1 ? 'default' : 'outline'}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ width: '25%' }} className="min-w-80">
              <div className="sticky top-8">
                <CommonSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
