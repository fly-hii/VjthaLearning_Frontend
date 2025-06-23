
import { ArrowRight, Calendar, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const NonTechJobs = () => {
  const nonTechJobs = [
    {
      id: 1,
      title: "Marketing Manager",
      company: "Coca-Cola",
      location: "Atlanta, GA",
      type: "Full-time",
      salary: "$80k - $110k",
      experience: "4+ years",
      description: "Lead marketing campaigns and brand strategy for global products...",
      postedTime: "2 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "HR Business Partner",
      company: "Johnson & Johnson",
      location: "New Brunswick, NJ",
      type: "Full-time",
      salary: "$90k - $120k",
      experience: "5+ years",
      description: "Partner with business leaders to develop HR strategies and solutions...",
      postedTime: "4 hours ago",
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Financial Analyst",
      company: "Goldman Sachs",
      location: "New York, NY",
      type: "Full-time",
      salary: "$95k - $130k",
      experience: "3+ years",
      description: "Analyze financial data and provide investment recommendations...",
      postedTime: "1 hour ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Sales Director",
      company: "Oracle",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$120k - $160k",
      experience: "6+ years",
      description: "Drive enterprise sales and build strategic customer relationships...",
      postedTime: "3 hours ago",
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Content Writer",
      company: "HubSpot",
      location: "Cambridge, MA",
      type: "Remote",
      salary: "$60k - $80k",
      experience: "2+ years",
      description: "Create engaging content for blogs, social media, and marketing materials...",
      postedTime: "5 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Operations Manager",
      company: "FedEx",
      location: "Memphis, TN",
      type: "Full-time",
      salary: "$85k - $115k",
      experience: "4+ years",
      description: "Oversee daily operations and optimize logistics processes...",
      postedTime: "6 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop"
    }
  ];

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
      
      <section className="py-8 bg-gray-50 border-b-4 border-black">
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
              <div className="bg-gray-100 p-6 border-4 border-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nonTechJobs.map((job) => (
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
