
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '@/Services/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, User, Eye } from 'lucide-react';

const ArticleDetail = () => {
  const { id, slug } = useParams();
  const articleIdentifier = slug || id;

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', articleIdentifier],
    queryFn: () => {
      // Try to fetch by slug first, then by ID
      if (slug) {
        return articlesApi.getBySlug(slug);
      } else if (id) {
        return articlesApi.getById(id);
      }
      throw new Error('No article identifier provided');
    },
    enabled: !!articleIdentifier,
  });

  // Increment views when article loads
  useQuery({
    queryKey: ['increment-views', article?._id],
    queryFn: () => articlesApi.incrementViews(article!._id),
    enabled: !!article?._id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto py-10 px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto py-10 px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
            <p className="text-gray-600">The article you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <article className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h1>
                
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {article.views && (
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      <span>{article.views} views</span>
                    </div>
                  )}
                </div>

                {/* Category Badge */}
                {article.category && (
                  <div className="mb-6">
                    <Badge variant="secondary" className="text-sm">
                      {typeof article.category === 'object' 
                        ? article.category.name 
                        : article.category}
                    </Badge>
                  </div>
                )}

                {/* Article Excerpt */}
                {article.excerpt && (
                  <p className="text-lg text-gray-700 mb-6 font-medium">
                    {article.excerpt}
                  </p>
                )}
              </header>

              {/* Article Media */}
              {article.media && article.media.length > 0 && (
                <div className="mb-8">
                  {article.media.map((mediaItem, index) => (
                    <div key={index} className="mb-4">
                      {mediaItem.type === 'image' && (
                        <img
                          src={mediaItem.url}
                          alt={mediaItem.filename || `Article image ${index + 1}`}
                          className="w-full h-auto rounded-lg shadow-md"
                          onError={(e) => {
                            console.error('Image failed to load:', mediaItem.url);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      {mediaItem.type === 'video' && (
                        <video
                          controls
                          className="w-full rounded-lg shadow-md"
                          onError={(e) => {
                            console.error('Video failed to load:', mediaItem.url);
                          }}
                        >
                          <source src={mediaItem.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {mediaItem.type === 'document' && (
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <a
                            href={mediaItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            📄 {mediaItem.filename || 'Download Document'}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Fallback for old featuredImage field */}
              {article.featuredImage && (!article.media || article.media.length === 0) && (
                <div className="mb-8">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-auto rounded-lg shadow-md"
                    onError={(e) => {
                      console.error('Featured image failed to load:', article.featuredImage);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Video Embed */}
              {article.videoEmbedUrl && (
                <div className="mb-8">
                  <video
                    controls
                    className="w-full rounded-lg shadow-md"
                  >
                    <source src={`/${article.videoEmbedUrl}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Article Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
