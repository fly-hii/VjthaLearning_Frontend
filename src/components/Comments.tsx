
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Send, User } from 'lucide-react';
import { articlesApi } from '@/Services/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { Comment, CreateCommentData } from '@/types/api';

interface CommentsProps {
  articleId: string;
}

const Comments = ({ articleId }: CommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', articleId],
    queryFn: () => articlesApi.getComments(articleId),
  });

  const addCommentMutation = useMutation({
    mutationFn: (data: CreateCommentData) => articlesApi.addComment(articleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', articleId] });
      setNewComment('');
      toast.success('Comment added successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add comment');
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    if (!user) {
      toast.error('Please login to comment');
      return;
    }

    addCommentMutation.mutate({
      name: user.name,
      email: user.email,
      message: newComment.trim(),
    });
  };

  if (isLoading) {
    return (
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold">Comments</h3>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-6 h-6" />
        <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
      </div>

      {/* Add Comment Form */}
      {user ? (
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this article..."
                rows={4}
                className="w-full"
              />
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={addCommentMutation.isPending || !newComment.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {addCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">Please login to leave a comment.</p>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No comments yet. Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment: Comment) => (
            <Card key={comment._id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{comment.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
