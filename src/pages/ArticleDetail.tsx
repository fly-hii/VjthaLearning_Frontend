import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '@/Services/api';
import type { Article } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, User } from 'lucide-react';

const ArticlesPageWithModal = () => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: () => articlesApi.getAll({ limit: 12, sort: 'latest' }),
  });

  const handleOpenArticle = (slug: string) => {
    setSelectedSlug(slug);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="container mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Latest Articles</h1>

        {isLoading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <p>Failed to load articles</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: Article) => (
              <div
                key={article._id}
                onClick={() => handleOpenArticle(article.slug)}
                className="cursor-pointer group hover:scale-[1.02] transition-all"
              >
                <Card className="shadow hover:shadow-lg">
                  <CardContent className="p-4">
                    {article.featuredImage && (
                      <img
                        src={article.media?.url || article.featuredImage}
                        alt={article.title}
                        className="w-full h-40 object-cover rounded-md mb-3"
                      />
                    )}
                    <Badge variant="secondary" className="mb-2">
                      {typeof article.category === 'object'
                        ? article.category.name || "null"
                        : article.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {article.author}
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Popup Modal */}
      {isModalOpen && selectedSlug && (
        <ArticleModal slug={selectedSlug} onClose={() => setIsModalOpen(false)} />
      )}

      <Footer />
    </div>
  );
};

export default ArticlesPageWithModal;

// ─────────────────────────────────────────────
// ✅ Modal Component (included below in same file)
const ArticleModal = ({ slug, onClose }: { slug: string; onClose: () => void }) => {
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesApi.getBySlug(slug),
    enabled: !!slug,
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white max-w-3xl w-full rounded-xl relative overflow-y-auto max-h-[90vh] shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-700 hover:text-red-500"
        >
          ×
        </button>

        {isLoading ? (
          <div className="p-6 text-center">Loading article...</div>
        ) : error || !article ? (
          <div className="p-6 text-center">Failed to load article</div>
        ) : (
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>

            {article.featuredImage && (
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            {article.videoEmbedUrl && (
              <div className="mt-4">
                <video
                  controls
                  className="w-full rounded-lg shadow-lg"
                >
                  <source src={`/${article.videoEmbedUrl}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

