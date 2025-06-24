
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import { Calendar, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '@/Services/api';
import type { Article } from '@/types/api';

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get('q') || '';

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => articlesApi.search(query),
    enabled: !!query,
  });

  return (
    <>
      <Navigation />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{query}"
        </h1>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : results.length === 0 ? (
          <p className="text-gray-600">No articles found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article: Article) => (
              <div
                key={article._id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow hover:shadow-md transition-shadow"
              >
                <Link to={`/article/${article._id}`}>
                  {article.featuredImage && (
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                </Link>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    <Link
                      to={`/article/${article._id}`}
                      className="hover:underline"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {article.excerpt || article.content.substring(0, 150) + '...'}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
