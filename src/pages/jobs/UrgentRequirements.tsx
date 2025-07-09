
import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, MapPin, Briefcase, Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { jobsApi } from '@/Services/api';
import { Job } from '@/types/api';
import { Link } from 'react-router-dom';

const UrgentRequirements = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const allJobs = await jobsApi.getAll();
        
        // Filter for urgent jobs
        const urgentJobs = allJobs.filter(job => job.urgent === true);
        
        setJobs(urgentJobs);
      } catch (err) {
        setError('Failed to fetch urgent jobs');
        console.error('Error fetching urgent jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Latest urgent jobs for sidebar
  const latestUrgentJobs = jobs.slice(0, 5).map((job, index) => ({
    id: index + 1,
    title: job.title,
    company: job.company,
    time: new Date(job.postedDate || Date.now()).toLocaleDateString(),
    deadline: 'ASAP'
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading urgent jobs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-4xl font-bold text-center text-red-700">Urgent Requirements</h1>
          </div>
          <p className="text-center max-w-2xl mx-auto font-medium">
            Critical job openings that need immediate attention - Apply now!
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="p-6">
                {jobs.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Urgent Jobs Found</h3>
                    <p className="text-gray-500">Check back later for urgent opportunities!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                      <Card key={job._id} className="bg-white border-2 hover:shadow-2xl transition-shadow">
                        <div className="relative">
                          <img
                            src={job.image || '/placeholder.svg'}
                            alt={job.title}
                            className="w-full h-40 object-cover"
                          />
                          <Badge className="absolute top-2 left-2 bg-red-600 text-white animate-pulse">
                            URGENT
                          </Badge>
                          <Badge className="absolute top-2 right-2 bg-yellow-600 text-white">
                            ASAP
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {job.title}
                          </h3>
                          <p className="text-red-600 font-medium mb-2">{job.company}</p>
                          
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
                              Posted {new Date(job.postedDate || Date.now()).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <Link to={`/job/${job._id}`}>
                            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                              View Details
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-80">
              <div className="bg-red-50 p-6 rounded-[3%] hover:shadow-lg transition-all duration-300">
                <h2 className="text-xl font-bold mb-6 text-center text-red-700">Latest Urgent Jobs</h2>
                <div className="space-y-4">
                  {latestUrgentJobs.map((job) => (
                    <div key={job.id} className="flex gap-3 pb-4 border-b border-red-300 last:border-b-0">
                      <div className="w-16 h-16 bg-red-300 rounded flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {job.title}
                        </h4>
                        <p className="text-xs text-red-600 mb-1">{job.company}</p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {job.time}
                          </div>
                          <Badge className="bg-yellow-600 text-white text-xs">
                            {job.deadline}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-6 gap-4">
                  <Button variant="outline" size="icon" className="border-red-600 text-red-600 hover:bg-red-50">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-red-600 text-red-600 hover:bg-red-50">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UrgentRequirements;
