
import { ArrowRight, Calendar, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TechJobs = () => {
  const techJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Meta",
      location: "Menlo Park, CA",
      type: "Full-time",
      salary: "$150k - $200k",
      experience: "5+ years",
      description: "Build cutting-edge user interfaces for billions of users worldwide...",
      postedTime: "1 hour ago",
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      company: "Google",
      location: "Mountain View, CA",
      type: "Full-time",
      salary: "$160k - $220k",
      experience: "4+ years",
      description: "Develop and deploy ML models at scale for search and recommendation systems...",
      postedTime: "3 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$130k - $180k",
      experience: "3+ years",
      description: "Manage cloud infrastructure and CI/CD pipelines for AWS services...",
      postedTime: "5 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "iOS Developer",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Full-time",
      salary: "$140k - $190k",
      experience: "4+ years",
      description: "Develop innovative iOS applications for millions of users...",
      postedTime: "2 hours ago",
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Netflix",
      location: "Los Gatos, CA",
      type: "Full-time",
      salary: "$125k - $175k",
      experience: "3+ years",
      description: "Analyze user behavior and improve recommendation algorithms...",
      postedTime: "4 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Cybersecurity Engineer",
      company: "Microsoft",
      location: "Redmond, WA",
      type: "Full-time",
      salary: "$135k - $185k",
      experience: "5+ years",
      description: "Protect enterprise systems and develop security solutions...",
      postedTime: "6 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
    }
  ];

  const latestJobs = [
    { id: 1, title: "Backend Engineer", company: "Stripe", time: "30m ago" },
    { id: 2, title: "Frontend Developer", company: "Shopify", time: "1h ago" },
    { id: 3, title: "Cloud Architect", company: "Salesforce", time: "2h ago" },
    { id: 4, title: "Software Engineer", company: "Uber", time: "3h ago" },
    { id: 5, title: "Tech Lead", company: "Airbnb", time: "4h ago" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-8 bg-gray-50 border-b-4 border-black">
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
            <div className="flex-1">
              <div className="bg-gray-100 p-6 border-4 border-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {techJobs.map((job) => (
                    <Card key={job.id} className="bg-white border-2 border-gray-300 hover:shadow-lg transition-shadow">
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
                        
                        <Button size="sm" className="w-full">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-80">
              <div className="bg-gray-100 p-6 border-4 border-black">
                <h2 className="text-xl font-bold mb-6 text-center">Latest Tech Jobs</h2>
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

export default TechJobs;
