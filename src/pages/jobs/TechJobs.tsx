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
      
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Tech Jobs</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Discover exciting technology career opportunities at leading tech companies
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Jobs Grid - 75% Width */}
            <div style={{ width: '75%' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {techJobs.map((job) => (
                  <Card key={job.id} className="bg-white border-2 border-gray-300 hover:shadow-lg hover:shadow-blue-600/50 transition-shadow">
                    <div className="relative">
                      <img
                        src={job.image}
                        alt={job.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      {job.isUrgent && (
                        <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                          Urgent
                        </Badge>
                      )}
                      <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
                        Tech
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {job.experience}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Posted {job.postedTime}
                        </div>
                      </div>
                      
                      <Link to={`/job/${job.id}`}>
                        <Button size="sm" className="w-full">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
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

export default TechJobs;
