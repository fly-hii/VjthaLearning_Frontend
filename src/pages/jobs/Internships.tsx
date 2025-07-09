import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, MapPin, Briefcase, Clock, DollarSign, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { jobsApi } from '@/Services/api';
import { Job } from '@/types/api';
import { Link } from 'react-router-dom';

const Internships = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const allJobs = await jobsApi.getAll();
        
        // Filter for internships
        const internships = allJobs.filter(job => 
          job.title.toLowerCase().includes('intern') ||
          job.jobType?.toLowerCase().includes('intern') ||
          job.description?.toLowerCase().includes('internship')
        );
        
        setJobs(internships);
      } catch (err) {
        setError('Failed to fetch internships');
        console.error('Error fetching internships:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Latest internships for sidebar
  const latestInternships = jobs.slice(0, 5).map((job, index) => ({
    id: index + 1,
    title: job.title,
    company: job.company,
    time: new Date(job.postedDate || Date.now()).toLocaleDateString()
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading internships...</p>
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

      {/* Page Header */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Internships</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Launch your career with internship opportunities at top companies
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="bg-gray-100 p-6">
                {jobs.length === 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Internships Found</h3>
                    <p className="text-gray-500">Check back later for new opportunities!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                      <Card key={job._id} className="bg-white border-2 border-gray-300 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                        <div className="relative">
                          <div className="w-full h-40 bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">
                              {job.title?.charAt(0) || 'I'}
                            </span>
                          </div>
                          {job.urgent && (
                            <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                              Urgent
                            </Badge>
                          )}
                          <Badge className="absolute top-2 right-2 bg-orange-600 text-white">
                            Internship
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
                              ${job.salary}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <GraduationCap className="w-4 h-4 mr-2" />
                              {job.experienceFrom === 0 && job.experienceTo === 0 ? 'Entry Level' : `${job.experienceFrom}-${job.experienceTo} years`}
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
                            <Button size="sm" className="w-full">
                              Read More
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

            {/* Sidebar */}
            <div className="w-80">
              <div className="bg-gray-100 p-6 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                <h2 className="text-xl font-bold mb-6 text-center">Latest Internships</h2>
                <div className="space-y-4">
                  {latestInternships.map((internship) => (
                    <div key={internship.id} className="flex gap-3 pb-4 border-b border-gray-300 last:border-b-0">
                      <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {internship.title}
                        </h4>
                        <p className="text-xs text-blue-600 mb-1">{internship.company}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {internship.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-6 gap-4">
                  <Button variant="outline" size="icon">
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </Button>
                  <Button variant="outline" size="icon">
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

export default Internships;
