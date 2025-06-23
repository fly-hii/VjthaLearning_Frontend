
import { ArrowRight, Calendar, MapPin, Briefcase, Clock, DollarSign, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Internships = () => {
  const internships = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "Google",
      location: "Mountain View, CA",
      type: "Internship",
      salary: "$8k/month",
      duration: "3 months",
      description: "Work on real projects with experienced engineers and learn cutting-edge technologies...",
      postedTime: "1 hour ago",
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "Nike",
      location: "Beaverton, OR",
      type: "Internship",
      salary: "$4k/month",
      duration: "6 months",
      description: "Support marketing campaigns and gain hands-on experience in brand management...",
      postedTime: "2 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "Facebook",
      location: "Menlo Park, CA",
      type: "Internship",
      salary: "$7.5k/month",
      duration: "4 months",
      description: "Analyze user data and build machine learning models for social media insights...",
      postedTime: "3 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "UX Design Intern",
      company: "Apple",
      location: "Cupertino, CA",
      type: "Internship",
      salary: "$6k/month",
      duration: "3 months",
      description: "Design user interfaces and conduct user research for innovative products...",
      postedTime: "4 hours ago",
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Finance Intern",
      company: "Goldman Sachs",
      location: "New York, NY",
      type: "Internship",
      salary: "$5k/month",
      duration: "3 months",
      description: "Learn financial analysis and investment banking fundamentals...",
      postedTime: "5 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Content Writing Intern",
      company: "BuzzFeed",
      location: "New York, NY",
      type: "Internship",
      salary: "$3.5k/month",
      duration: "4 months",
      description: "Create engaging content for digital platforms and social media...",
      postedTime: "6 hours ago",
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
    }
  ];

  const latestInternships = [
    { id: 1, title: "Product Management Intern", company: "Microsoft", time: "30m ago" },
    { id: 2, title: "Research Intern", company: "IBM", time: "1h ago" },
    { id: 3, title: "Sales Intern", company: "Salesforce", time: "2h ago" },
    { id: 4, title: "HR Intern", company: "Spotify", time: "3h ago" },
    { id: 5, title: "Operations Intern", company: "Amazon", time: "4h ago" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="py-8 bg-gray-50 border-b-4 border-black">
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
              <div className="bg-gray-100 p-6 border-4 border-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internships.map((internship) => (
                    <Card key={internship.id} className="bg-white border-2 border-gray-300 hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img
                          src={internship.image}
                          alt={internship.title}
                          className="w-full h-40 object-cover"
                        />
                        {internship.isUrgent && (
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
                          {internship.title}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">{internship.company}</p>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {internship.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="w-4 h-4 mr-2" />
                            {internship.salary}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <GraduationCap className="w-4 h-4 mr-2" />
                            {internship.duration}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {internship.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Posted {internship.postedTime}
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
