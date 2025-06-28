
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, Building, Users, Calendar, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { techJobs, nonTechJobs, internships, todayJobs, urgentJobs } from '@/lib/mockdata';

const JobDetail = () => {
  const { id } = useParams();
  
  // Combine all job arrays to find the job by ID
  const allJobs = [...techJobs, ...nonTechJobs, ...internships, ...todayJobs, ...urgentJobs];
  const job = allJobs.find(j => j.id.toString() === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">The job you're looking for doesn't exist.</p>
          <Link to="/jobs/today">
            <Button>Browse Jobs</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link to="/jobs/today" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-xl text-blue-600 font-semibold mb-4">{job.company}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {job.experience || job.duration}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Posted {job.postedTime}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {job.isUrgent && (
                <Badge className="bg-red-600 text-white w-fit">
                  Urgent Hiring
                </Badge>
              )}
              <Link to={`/job/${job.id}/apply`}>
                <Button size="lg" className="w-full md:w-auto">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job Details */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {job.description}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Responsibilities</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Lead and manage complex projects from conception to completion</li>
                    <li>Collaborate with cross-functional teams to achieve business objectives</li>
                    <li>Analyze market trends and provide strategic recommendations</li>
                    <li>Develop and maintain strong client relationships</li>
                    <li>Mentor junior team members and contribute to team growth</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Bachelor's degree in relevant field or equivalent experience</li>
                    <li>Minimum {job.experience || '2-3 years'} of professional experience</li>
                    <li>Strong analytical and problem-solving skills</li>
                    <li>Excellent communication and interpersonal abilities</li>
                    <li>Proficiency in relevant tools and technologies</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Benefits</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Competitive salary and performance bonuses</li>
                    <li>Comprehensive health and dental insurance</li>
                    <li>Flexible working arrangements and remote work options</li>
                    <li>Professional development and training opportunities</li>
                    <li>Generous vacation time and paid time off</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium text-gray-900">{job.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{job.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Salary</p>
                        <p className="font-medium text-gray-900">{job.salary}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-medium text-gray-900">{job.experience || job.duration || 'Entry Level'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Posted</p>
                        <p className="font-medium text-gray-900">{job.postedTime}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Apply for this Job</h3>
                  <p className="text-gray-600 mb-4">
                    Ready to take the next step in your career? Apply now and join our amazing team!
                  </p>
                  <Link to={`/job/${job.id}/apply`}>
                    <Button className="w-full" size="lg">
                      Apply Now
                    </Button>
                  </Link>
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

export default JobDetail;
