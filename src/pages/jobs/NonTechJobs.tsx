import { ArrowRight, Calendar, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { nonTechJobs} from '@/lib/mockdata'; // Assuming you have a mockdata file with non-tech jobs
import { Link } from 'react-router-dom';
const NonTechJobs = () => {
  const nonTechJob=nonTechJobs


  const latestJobs = [
    { id: 1, title: "Account Manager", company: "Salesforce", time: "1h ago" },
    { id: 2, title: "Project Manager", company: "Adobe", time: "2h ago" },
    { id: 3, title: "Business Analyst", company: "McKinsey", time: "3h ago" },
    { id: 4, title: "Legal Counsel", company: "Tesla", time: "4h ago" },
    { id: 5, title: "Recruiter", company: "LinkedIn", time: "5h ago" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Page Header */}
      
      <section className="py-8 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Non-Tech Jobs</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Explore diverse career opportunities outside the technology sector
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="bg-gray-100 p-6 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nonTechJobs.map((job) => (
                    <Card key={job.id} className="bg-white border-2 border-gray-300 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                      <div className="relative">
                        <img
                          src={job.image}
                          alt={job.title}
                          className="w-full h-40 object-cover"
                        />
                        {job.isUrgent && (
                          <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                            Urgent
                          </Badge>
                        )}
                        <Badge className="absolute top-2 right-2 bg-purple-600 text-white">
                          Non-Tech
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
            </div>

            <div className="w-80">
              <div className="bg-gray-100 p-6 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                <h2 className="text-xl font-bold mb-6 text-center">Latest Non-Tech Jobs</h2>
                <div className="space-y-4">
                  {latestJobs.map((job) => (
                    <div key={job.id} className="flex gap-3 pb-4 border-b border-gray-300 last:border-b-0">
                      <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {job.title}
                        </h4>
                        <p className="text-xs text-blue-600 mb-1">{job.company}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.time}
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

export default NonTechJobs;
