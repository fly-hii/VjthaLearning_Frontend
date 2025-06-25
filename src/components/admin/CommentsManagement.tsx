
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Flag,
  User,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const CommentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const comments = [
    {
      id: 1,
      content: 'Great article! This really helped me understand React hooks better.',
      author: 'John Doe',
      articleTitle: 'Introduction to React Hooks',
      status: 'approved',
      postedDate: '2024-01-20',
      isSpam: false
    },
    {
      id: 2,
      content: 'This is spam content with promotional links...',
      author: 'Spam User',
      articleTitle: 'Building Scalable APIs',
      status: 'pending',
      postedDate: '2024-01-20',
      isSpam: true
    },
    {
      id: 3,
      content: 'Could you explain more about the performance implications?',
      author: 'Sarah Smith',
      articleTitle: 'CSS Grid vs Flexbox',
      status: 'pending',
      postedDate: '2024-01-19',
      isSpam: false
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comments Management</h1>
          <p className="text-gray-600 mt-1">Moderate user comments and feedback</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">1,198</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 hover:shadow-lg hover:shadow-blue-400/40">
            <div className="flex items-center space-x-3">
              <Flag className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Spam</p>
                <p className="text-2xl font-bold text-gray-900">26</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search comments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comment</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Article</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="max-w-xs">
                    <div className="flex items-start space-x-2">
                      {comment.isSpam && (
                        <Flag className="w-4 h-4 text-red-500 mt-1" />
                      )}
                      <p className="text-sm truncate">{comment.content}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{comment.author}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm truncate">{comment.articleTitle}</p>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        comment.status === 'approved' ? 'default' : 
                        comment.status === 'pending' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {comment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(comment.postedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {comment.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline" title="Approve">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button size="sm" variant="outline" title="Reject">
                            <XCircle className="w-4 h-4 text-red-600" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" title="Flag as Spam">
                        <Flag className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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

export default CommentsManagement;
