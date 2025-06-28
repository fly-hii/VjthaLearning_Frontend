
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { Calendar, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '@/Services/api';
import type { Article } from '@/types/api';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;

  const { data: allResults = [], isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => articlesApi.search(query),
    enabled: !!query,
  });

  // Pagination logic
  const totalPages = Math.ceil(allResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const results = allResults.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if needed
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show last page
      if (totalPages > 1) {
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink 
              onClick={() => handlePageChange(totalPages)}
              isActive={currentPage === totalPages}
              className="cursor-pointer"
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

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
        ) : allResults.length === 0 ? (
          <p className="text-gray-600">No articles found.</p>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, allResults.length)} of {allResults.length} results
              </p>
            </div>
            
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {renderPaginationItems()}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
