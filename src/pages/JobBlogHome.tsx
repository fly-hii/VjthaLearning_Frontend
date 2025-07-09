
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const JobBlogHome = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Job Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover career opportunities and job insights
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/jobs/today" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Today's Jobs</h3>
                <p className="text-gray-600 mb-4">Latest job postings from today</p>
                <Button className="w-full">
                  View Jobs <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Link>
            
            <Link to="/jobs/tech" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Tech Jobs</h3>
                <p className="text-gray-600 mb-4">Technology sector opportunities</p>
                <Button className="w-full">
                  View Jobs <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Link>
            
            <Link to="/jobs/non-tech" className="group">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Non-Tech Jobs</h3>
                <p className="text-gray-600 mb-4">Opportunities outside tech sector</p>
                <Button className="w-full">
                  View Jobs <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default JobBlogHome;
