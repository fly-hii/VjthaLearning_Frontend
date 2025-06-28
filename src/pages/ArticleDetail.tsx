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
  const { id } = useParams();
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articlesApi.getById(id!),
    enabled: !!id,
  });

  const { data: relatedArticles } = useQuery({
    queryKey: ['relatedArticles', article?.category, id],
    queryFn: () => {
      const categoryId = typeof article?.category === 'object' ? article.category._id : article?.category;
      return articlesApi.getRelated(categoryId, id!, 3);
    },
    enabled: !!article?.category && !!id,
  });

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-300 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-8">
          <Link to="/articles" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {typeof article.category === 'object' ? article.category?.name : article.category || 'General'}
            </Badge>
            <h1 className="text-4xl md:text-3xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                5 min read
              </div>
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                {(article.views || 0).toLocaleString()} views
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Main Content - 75% Width */}
            <div style={{ width: '75%' }}>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  {/* Featured Image */}
                  {article.featuredImage && (
                    <div className="mb-8">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}

                  {/* Video Embed */}
                  {article.videoEmbedUrl && (
                    <div className="mb-8">
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
                  <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      {article.tags?.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  </div>

                  {/* Author Bio */}
                  <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">About the Author</h3>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{article.author}</h4>
                        <p className="text-gray-600 text-sm">
                          Senior writer and technology expert with over 10 years of experience in the industry.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <Comments articleId={article._id} />

                  {/* Related Articles */}
                  {relatedArticles && relatedArticles.length > 0 && (
                    <div className="mt-12">
                      <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedArticles.map((relatedArticle: Article) => (
                          <Link
                            key={relatedArticle._id}
                            to={`/article/${relatedArticle._id}`}
                            className="block group"
                          >
                            <Card className="hover:shadow-lg transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex gap-3">
                                  {relatedArticle.featuredImage && (
                                    <img
                                      src={relatedArticle.featuredImage}
                                      alt={relatedArticle.title}
                                      className="w-16 h-16 object-cover rounded"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
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

            {/* Common Sidebar - 25% Width */}
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

export default ArticleDetail;
