
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Bookmark, Eye, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  blogPosts,
  blogNews,
  blogJobs,
  aiArticle,
  caseStudies,
  cultureArticles,
  trendsArticles,
  webDevArticles
} from '@/lib/mockdata';

const ArticleDetail = () => {
  const { id } = useParams();
  
  const allArticles = [
    ...blogPosts,
    ...blogNews,
    ...blogJobs,
    ...aiArticle,
    ...caseStudies,
    ...cultureArticles,
    ...trendsArticles,
    ...webDevArticles
  ];

  const article = allArticles.find(a => a.id === parseInt(id || '0'));

  if (!article) {
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

  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <Link to="/articles" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {new Date(article.date).toLocaleDateString('en-US', {
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
                1.2k views
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  {/* Featured Image */}
                  <div className="mb-8">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                    />
                  </div>

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
                      {article.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Article Text */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-xl text-gray-700 mb-6 font-medium">
                      {article.excerpt}
                    </p>
                    
                    <p className="text-gray-700 mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
                    <p className="text-gray-700 mb-6">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Means</h2>
                    <p className="text-gray-700 mb-6">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8">
                      <p className="text-blue-800 font-medium">
                        "This represents a significant shift in how we approach modern technology solutions."
                      </p>
                    </div>

                    <p className="text-gray-700 mb-6">
                      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
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
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="w-80">
              <Card className="bg-white shadow-lg sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        to={`/article/${relatedArticle.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <img
                            src={relatedArticle.image}
                            alt={relatedArticle.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {relatedArticle.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(relatedArticle.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
