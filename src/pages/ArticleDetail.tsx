
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Bookmark, Eye, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CommonSidebar from '@/components/CommonSidebar';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '@/Services/api';
import type { Article } from '@/types/api';
import Comments from '@/components/Comments';

const ArticleDetail = () => {
  const { slug } = useParams();
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesApi.getBySlug(slug!),
    enabled: !!slug,
  });

  const { data: relatedArticles } = useQuery({
    queryKey: ['relatedArticles', article?.category, slug],
    queryFn: () => {
      const categoryId = typeof article?.category === 'object' ? article.category._id : article?.category;
      return articlesApi.getRelated(categoryId, slug!, 3);
    },
    enabled: !!article?.category && !!slug,
  });

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">The article you're looking for doesn't exist.</p>
            <Link to="/articles">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section with 3D Animation */}
      <section className="relative bg-gradient-to-r from-blue-300 to-purple-700 text-white transform-gpu">
        <div className="absolute inset-0 bg-black/20 animate-pulse"></div>
        <div className="relative container mx-auto px-4 py-6 sm:py-8">
          <Link 
            to="/articles" 
            className="inline-flex items-center text-white/80 hover:text-white mb-4 sm:mb-6 transition-all duration-300 hover:scale-105 transform text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
          
          <div className="max-w-4xl transform hover:scale-105 transition-all duration-500">
            <Badge className="mb-3 sm:mb-4 bg-white/20 text-white border-white/30 animate-bounce text-xs sm:text-sm">
              {typeof article.category === 'object' ? article.category?.name : article.category || 'General'}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-white/90 text-xs sm:text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="truncate">{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="truncate">{new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                5 min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {(article.views || 0).toLocaleString()} views
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content with Enhanced Animation */}
      <section className="py-6 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Main Content - Full width on mobile, 75% on large screens */}
            <div className="w-full lg:w-3/4">
              <Card className="bg-white shadow-lg transform hover:scale-102 transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  {/* Featured Image */}
                  {article.featuredImage && (
                    <div className="mb-6 sm:mb-8">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}

                  {/* Video Embed */}
                  {article.videoEmbedUrl && (
                    <div className="mb-6 sm:mb-8">
                      <div className="aspect-video">
                        <iframe
                          src={article.videoEmbedUrl}
                          className="w-full h-full rounded-lg"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Article Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 p-3 sm:p-4 bg-gray-50 rounded-lg gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      {article.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-sm sm:prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>

                  {/* Author Bio */}
                  <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">About the Author</h3>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{article.author}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Senior writer and technology expert with over 10 years of experience in the industry.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <Comments articleId={article._id} />

                  {/* Related Articles */}
                  {relatedArticles && relatedArticles.length > 0 && (
                    <div className="mt-8 sm:mt-12">
                      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Related Articles</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {relatedArticles.map((relatedArticle: Article) => (
                          <Link
                            key={relatedArticle._id}
                            to={`/article/${relatedArticle.slug || relatedArticle._id}`}
                            className="block group"
                          >
                            <Card className="hover:shadow-lg transition-shadow">
                              <CardContent className="p-3 sm:p-4">
                                <div className="flex gap-3">
                                  {relatedArticle.featuredImage && (
                                    <img
                                      src={relatedArticle.featuredImage}
                                      alt={relatedArticle.title}
                                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                      {relatedArticle.title}
                                    </h4>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {new Date(relatedArticle.publishedAt || relatedArticle.createdAt).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Common Sidebar - Hidden on mobile, 25% on large screens */}
            <div className="hidden lg:block lg:w-1/4 min-w-0">
              <div className="sticky top-8 transform hover:scale-105 transition-all duration-300">
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

export default ArticleDetail;
