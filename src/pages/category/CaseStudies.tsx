import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "Netflix's Migration to Microservices: A Complete Transformation",
      excerpt: "How Netflix successfully transitioned from monolithic architecture to microservices...",
      author: "Engineering Team",
      date: "2024-06-20",
      company: "Netflix",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      tags: ["Microservices", "Architecture", "Scale"]
    },
    {
      id: 2,
      title: "Airbnb's Data-Driven Growth Strategy",
      excerpt: "Analyzing how Airbnb leveraged data analytics to achieve global expansion...",
      author: "Data Science Team",
      date: "2024-06-19",
      company: "Airbnb",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
      tags: ["Data Analytics", "Growth", "Strategy"]
    },
    {
      id: 3,
      title: "Spotify's Recommendation Algorithm: Personalization at Scale",
      excerpt: "Inside Spotify's machine learning approach to music recommendations...",
      author: "ML Engineering Team",
      date: "2024-06-18",
      company: "Spotify",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
      tags: ["Machine Learning", "Personalization", "Algorithms"]
    },
    {
      id: 4,
      title: "Tesla's Manufacturing Innovation: Gigafactory Success",
      excerpt: "How Tesla revolutionized automotive manufacturing with automation and efficiency...",
      author: "Operations Team",
      date: "2024-06-17",
      company: "Tesla",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      tags: ["Manufacturing", "Automation", "Innovation"]
    },
    {
      id: 5,
      title: "Zoom's Scalability Challenge During COVID-19",
      excerpt: "How Zoom handled unprecedented growth and scaled their infrastructure...",
      author: "Infrastructure Team",
      date: "2024-06-16",
      company: "Zoom",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop",
      tags: ["Scalability", "Infrastructure", "Crisis Management"]
    },
    {
      id: 6,
      title: "Amazon's Supply Chain Optimization",
      excerpt: "The technology and logistics behind Amazon's same-day delivery system...",
      author: "Logistics Team",
      date: "2024-06-15",
      company: "Amazon",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
      tags: ["Supply Chain", "Logistics", "Optimization"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-center">Case Studies</h1>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            In-depth analysis of successful technology implementations and business strategies
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Main Section */}
            <div className="flex-1">
              <div className="bg-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseStudies.map((study) => (
                    <Card
                      key={study.id}
                      className="bg-white border-2 border-gray-300 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-40 object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-indigo-600 text-white">
                          Case Study
                        </Badge>
                        <Badge className="absolute top-2 left-2 bg-gray-800 text-white">
                          {study.company}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {study.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {study.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {study.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(study.date).toLocaleDateString()}
                          </div>
                        </div>

                        <Link to={`/article/${study.id}`}>
                          <Button size="sm" className="w-full">
                            Read Case Study
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80">
              <div className="bg-gray-100 p-6 hover:shadow-lg hover:shadow-blue-500/50 transition-shadow">
                <h2 className="text-xl font-bold mb-6 text-center">Featured Case Studies</h2>
                <div className="space-y-4">
                  {caseStudies.slice(0, 5).map((study) => (
                    <div key={study.id} className="flex gap-3 pb-4 border-b border-gray-300 last:border-b-0">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-16 h-16 object-cover rounded bg-gray-300"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                          {study.title}
                        </h4>
                        <p className="text-xs text-indigo-600 mb-1">{study.company}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(study.date).toLocaleDateString()}
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

export default CaseStudies;