
import React from 'react';
import { 
  FileText, 
  Users, 
  Briefcase, 
  Star, 
  Edit, 
  FolderOpen, 
  Eye,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardHome: React.FC = () => {
  const stats = [
    { title: 'Total Articles', value: '156', icon: FileText, color: 'blue', change: '+12%' },
    { title: 'Total Users', value: '2,847', icon: Users, color: 'green', change: '+5%' },
    { title: 'Total Jobs', value: '89', icon: Briefcase, color: 'purple', change: '+18%' },
    { title: 'Featured Articles', value: '24', icon: Star, color: 'yellow', change: '+3%' },
    { title: 'Draft Articles', value: '31', icon: Edit, color: 'orange', change: '-2%' },
    { title: 'Categories', value: '12', icon: FolderOpen, color: 'pink', change: '0%' },
    { title: "Today's Views", value: '5,429', icon: Eye, color: 'indigo', change: '+24%' },
    { title: 'Published Today', value: '8', icon: CheckCircle, color: 'emerald', change: '+15%' },
  ];

  const recentActivity = [
    { action: 'New article published', item: 'AI in Modern Web Development', time: '2 minutes ago', type: 'success' },
    { action: 'User registered', item: 'john.doe@example.com', time: '15 minutes ago', type: 'info' },
    { action: 'Job listing created', item: 'Senior React Developer', time: '1 hour ago', type: 'success' },
    { action: 'Article updated', item: 'Getting Started with TypeScript', time: '2 hours ago', type: 'warning' },
    { action: 'Comment moderated', item: 'Inappropriate content removed', time: '3 hours ago', type: 'error' },
  ];

  const topArticles = [
    { title: 'Introduction to React Hooks', views: 2847, author: 'Sarah Johnson' },
    { title: 'Building Scalable APIs', views: 2156, author: 'Mike Chen' },
    { title: 'CSS Grid vs Flexbox', views: 1943, author: 'Emily Davis' },
    { title: 'JavaScript ES2024 Features', views: 1756, author: 'Alex Rivera' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.item}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Top Performing Articles</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                    <p className="text-xs text-gray-600">by {article.author}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{article.views.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
