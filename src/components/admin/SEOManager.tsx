
import React from 'react';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  TrendingUp,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const SEOManager: React.FC = () => {
  const seoIssues = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      issue: 'Missing meta description',
      severity: 'high',
      status: 'needs_attention'
    },
    {
      id: 2,
      title: 'Building Scalable APIs',
      issue: 'Title too long (>60 characters)',
      severity: 'medium',
      status: 'needs_attention'
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox',
      issue: 'No focus keyword',
      severity: 'low',
      status: 'optimized'
    },
  ];

  const seoStats = [
    { label: 'Articles with SEO Issues', value: 23, color: 'red' },
    { label: 'Optimized Articles', value: 133, color: 'green' },
    { label: 'Missing Meta Descriptions', value: 8, color: 'yellow' },
    { label: 'Perfect SEO Score', value: 45, color: 'blue' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SEO Manager</h1>
          <p className="text-gray-600 mt-1">Optimize your content for search engines</p>
        </div>
      </div>

      {/* SEO Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {seoStats.map((stat, index) => (
          <Card key={index} className='hover:shadow-lg hover:shadow-blue-400/40 transition-shadow'>
            <CardContent className="p-4 ">
              <div className="flex items-center space-x-3">
                <Search className={`w-8 h-8 text-${stat.color}-600`} />
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SEO Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SEO Issues */}
        <Card >
          <CardHeader >
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>SEO Issues</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4' ">
              {seoIssues.map((issue) => (
                <div key={issue.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 ">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    issue.severity === 'high' ? 'bg-red-500' :
                    issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{issue.title}</p>
                    <p className="text-sm text-gray-600">{issue.issue}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge 
                        variant={issue.severity === 'high' ? 'destructive' : 'outline'}
                        className="text-xs"
                      >
                        {issue.severity}
                      </Badge>
                      <Button size="sm" variant="outline" className="text-xs">
                        Fix Issue
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SEO Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Top Performing Content</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">React Hooks Guide</p>
                  <p className="text-xs text-gray-600">SEO Score: 98/100</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">2.8K views</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">API Development</p>
                  <p className="text-xs text-gray-600">SEO Score: 95/100</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">2.1K views</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">CSS Layout Guide</p>
                  <p className="text-xs text-gray-600">SEO Score: 92/100</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">1.9K views</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Audit Table */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Audit Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>SEO Score</TableHead>
                <TableHead>Issues</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seoIssues.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-full rounded-full ${
                            item.severity === 'high' ? 'bg-red-500 w-4' :
                            item.severity === 'medium' ? 'bg-yellow-500 w-8' : 
                            'bg-green-500 w-11'
                          }`}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {item.severity === 'high' ? '45' : item.severity === 'medium' ? '72' : '95'}/100
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{item.issue}</span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={item.status === 'optimized' ? 'default' : 'secondary'}
                    >
                      {item.status === 'optimized' ? 'Optimized' : 'Needs Attention'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOManager;
