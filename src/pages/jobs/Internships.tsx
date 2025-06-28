import { ArrowRight, Calendar, MapPin, Briefcase, Clock, DollarSign, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { internships } from '@/lib/mockdata';
import { Link } from 'react-router-dom';

const Internships = () => {
  const internship = internships;

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
      
      <section className="py-8 bg-gray-50 ">
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
              <div className="bg-gray-100 p-6 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internships.map((internship) => (
                    <Card key={internship.id} className="bg-white border-2 border-gray-300 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
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
                        
                        <Link to={`/job/${internship.id}`}>
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
