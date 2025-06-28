import React, { useEffect, useState } from 'react';
import {
  MessageSquare,
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  Flag,
  User,
  Clock,
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
import { useParams } from 'react-router-dom';
import { articlesApi } from '@/Services/api';
import type { Comment } from '@/types/api';
import LoadingScreen from '@/pages/LoadingMessage';

const CommentsManagement: React.FC = () => {
  const { id: articleId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await articlesApi.getComments(articleId || '');
        setComments(fetchedComments);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const filteredComments = comments.filter((comment) =>
    comment.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const approvedCount = comments.filter((c) => c.approved).length;
  const pendingCount = comments.filter((c) => !c.approved).length;
  const spamCount = 0; // Placeholder for now

if (loading) {
  return (
      <div className="flex items-center justify-center h-[50vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading Comments...</p>
      </div>
    </div>
  );
}
console.log(comments)
console.log(filteredComments)
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
                <p className="text-2xl font-bold text-gray-900">{comments.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
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
                <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
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
                <p className="text-2xl font-bold text-gray-900">{spamCount}</p>
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
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No comments found.
                  </TableCell>
                </TableRow>
              ) : (
                comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell className="max-w-xs">{comment.message}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        {comment.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={comment.approved ? 'text-green-600 border-green-600' : 'text-yellow-600 border-yellow-600'}
                      >
                        {comment.approved ? 'Approved' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(comment.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsManagement;