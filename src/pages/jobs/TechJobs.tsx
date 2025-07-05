
import { ArrowRight, Calendar, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CommonSidebar from '@/components/CommonSidebar';
import { techJobs} from '@/lib/mockdata';

const TechJobs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Page Header */}
      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">Tech Jobs</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover exciting technology career opportunities at leading tech companies
          </p>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Jobs Grid - Full width on mobile, 75% on large screens */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {techJobs.map((job) => (
                  <Card key={job.id} className="bg-white border-2 border-gray-300 hover:shadow-lg hover:shadow-blue-600/50 transition-shadow">
                    <div className="relative">
                      <img
                        src={job.image}
                        alt={job.title}
                        className="w-full h-32 sm:h-40 object-cover rounded-t-lg"
                      />
                      {job.isUrgent && (
                        <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs">
                          Urgent
                        </Badge>
                      )}
                      <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-xs">
                        Tech
                      </Badge>
                    </div>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2 text-sm sm:text-base">{job.company}</p>
                      
                      <div className="space-y-1 sm:space-y-2 mb-3">
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{job.salary}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{job.experience}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 sm:line-clamp-3">
                        {job.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="truncate">Posted {job.postedTime}</span>
                        </div>
                      </div>
                      
                      <Link to={`/job/${job.id}`}>
                        <Button size="sm" className="w-full text-xs sm:text-sm">
                          Read More
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Common Sidebar - Hidden on mobile, 25% on large screens */}
            <div className="hidden lg:block lg:w-1/4 min-w-0">
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

export default TechJobs;
