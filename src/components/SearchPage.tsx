
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import {
  blogPosts,
  blogNews,
  blogJobs,
  aiArticle,
  internships,
  techJobs,
  nonTechJobs,
  todayJobs,
  urgentJobs,
  caseStudies,
  cultureArticles,
  trendsArticles,
  webDevArticles
} from '../lib/mockdata';
import { Calendar, User, MapPin, Building } from 'lucide-react';

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get('q') || '';

  const allArticles = [
    ...blogPosts,
    ...blogNews,
    ...blogJobs,
    ...aiArticle,
    ...internships,
    ...techJobs,
    ...nonTechJobs,
    ...todayJobs,
    ...urgentJobs,
    ...caseStudies,
    ...cultureArticles,
    ...trendsArticles,
    ...webDevArticles
  ];

  const results = allArticles.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) 
  );

  // Type guard to check if item is an article
  const isArticle = (item: any): item is { excerpt: string; author: string; date: string } => {
    return 'excerpt' in item && 'author' in item && 'date' in item;
  };

  // Type guard to check if item is a job
  const isJob = (item: any): item is { company: string; location: string; salary?: string; postedTime?: string } => {
    return 'company' in item && 'location' in item;
  };

  return (
    <>
      <Navigation />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{query}"
        </h1>

        {results.length === 0 ? (
          <p className="text-gray-600">No articles found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow hover:shadow-md transition-shadow"
              >
                <Link to={`/article/${article.id}`}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    <Link
                      to={`/article/${article.id}`}
                      className="hover:underline"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  
                  {/* Conditional rendering based on item type */}
                  {isArticle(article) && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  )}
                  
                  {isJob(article) && (
                    <div className="text-sm text-gray-600 mb-4 space-y-1">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {article.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {article.location}
                      </div>
                      {article.salary && (
                        <div className="text-green-600 font-medium">
                          {article.salary}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    {isArticle(article) && (
                      <>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(article.date).toLocaleDateString()}
                        </div>
                      </>
                    )}
                    
                    {isJob(article) && (
                      <>
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          Job Listing
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {article.postedTime ? new Date(article.postedTime).toLocaleDateString() : 'Recently'}
                        </div>
                      </>
                    )}
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
