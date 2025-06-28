
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  Calendar, 
  User, 
  Search, 
  BookOpen, 
  Briefcase, 
  Star,
  Clock,
  ArrowRight,
  Filter
} from 'lucide-react';

const CommonSidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const trendingArticles = [
    { id: 1, title: "AI Revolution in 2024", category: "Tech", readTime: "5 min", views: "12.5k" },
    { id: 2, title: "Remote Work Best Practices", category: "Career", readTime: "8 min", views: "9.2k" },
    { id: 3, title: "Startup Success Stories", category: "Business", readTime: "6 min", views: "7.8k" },
    { id: 4, title: "Web Development Trends", category: "Tech", readTime: "10 min", views: "15.3k" },
    { id: 5, title: "Digital Marketing Guide", category: "Marketing", readTime: "7 min", views: "6.1k" },
  ];

  const featuredJobs = [
    { id: 1, title: "Senior Developer", company: "Google", type: "Remote", salary: "$120k+" },
    { id: 2, title: "Product Manager", company: "Microsoft", type: "Hybrid", salary: "$110k+" },
    { id: 3, title: "UX Designer", company: "Apple", type: "On-site", salary: "$95k+" },
    { id: 4, title: "Data Scientist", company: "Netflix", type: "Remote", salary: "$130k+" },
  ];

  const quickLinks = [
    { label: "Latest Articles", href: "/articles", icon: BookOpen },
    { label: "Tech Jobs", href: "/jobs/tech", icon: Briefcase },
    { label: "Internships", href: "/jobs/internships", icon: Star },
    { label: "Digital World", href: "/digital-world", icon: TrendingUp },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Search Widget */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Quick Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search articles, jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Tech</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Jobs</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Career</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button variant="ghost" className="w-full justify-start">
                <link.icon className="w-4 h-4 mr-2" />
                {link.label}
              </Button>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Trending Articles */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Trending Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingArticles.slice(0, 4).map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h4>
              <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  {article.category}
                </Badge>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readTime}
                </span>
                <span>{article.views} views</span>
              </div>
            </div>
          ))}
          <Link to="/articles">
            <Button variant="outline" size="sm" className="w-full mt-3">
              View All Articles <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Featured Jobs */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Featured Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {featuredJobs.map((job) => (
            <div key={job.id} className="group cursor-pointer p-2 rounded-lg hover:bg-gray-50">
              <h4 className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                {job.title}
              </h4>
              <p className="text-xs text-gray-600">{job.company}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <Badge variant="outline" className="text-xs">
                  {job.type}
                </Badge>
                <span className="font-medium text-green-600">{job.salary}</span>
              </div>
            </div>
          ))}
          <Link to="/jobs/tech">
            <Button variant="outline" size="sm" className="w-full mt-3">
              View All Jobs <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
          <p className="text-sm text-gray-600 mb-3">
            Get the latest articles and job opportunities delivered to your inbox.
          </p>
          <div className="space-y-2">
            <Input placeholder="Enter your email" />
            <Button size="sm" className="w-full">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonSidebar;
