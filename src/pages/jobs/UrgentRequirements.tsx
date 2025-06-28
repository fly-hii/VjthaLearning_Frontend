import { ArrowRight, Calendar, MapPin, Briefcase, Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { urgentJobs } from '@/lib/mockdata'; // Assuming you have a mockdata file with urgent jobs
import { Link } from 'react-router-dom';

const UrgentRequirements = () => {
  const urgentJob =  urgentJobs;


  const latestUrgentJobs = [
    { id: 1, title: "Emergency Consultant", company: "McKinsey", time: "5m ago", deadline: "Today" },
    { id: 2, title: "Urgent Sales Rep", company: "Oracle", time: "10m ago", deadline: "Tomorrow" },
    { id: 3, title: "Crisis Manager", company: "Goldman", time: "20m ago", deadline: "24h" },
    { id: 4, title: "Emergency Developer", company: "Meta", time: "25m ago", deadline: "Tonight" },
    { id: 5, title: "Urgent Analyst", company: "JPMorgan", time: "35m ago", deadline: "ASAP" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-8  ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-4xl font-bold text-center text-red-700">Urgent Requirements</h1>
          </div>
          <p className="text-center  max-w-2xl mx-auto font-medium">
            Critical job openings that need immediate attention - Apply now!
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className=" p-6 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {urgentJobs.map((job) => (
                    <Card key={job.id} className="bg- border-2  hover:shadow-2xl transition-shadow">
                      <div className="relative">
                        <img
                          src={job.image}
                          alt={job.title}
                          className="w-full h-40 object-cover"
                        />
                        <Badge className="absolute top-2 left-2 bg-red-600 text-white animate-pulse">
                          URGENT
                        </Badge>
                        <Badge className="absolute top-2 right-2 bg-yellow-600 text-white">
                          {job.deadline}
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
                            Posted {job.postedTime}
                          </div>
                        </div>
                        
                        <Link to={`/job/${job.id}`}>
                          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-80"><div className="bg-red-50 p-6  rounded-[3%] hover: transition-all duration-300">
              
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
