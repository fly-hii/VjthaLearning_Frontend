
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface PostDetailProps {
  post: {
    id: number;
    author: string;
    avatar: string;
    content: string;
    media?: string;
    mediaType?: 'image' | 'video';
    likes: number;
    comments: number;
    shares: number;
    timestamp: string;
    isLiked: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
  onLike: () => void;
}

const PostDetail = ({ post, isOpen, onClose, onLike }: PostDetailProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'John Doe',
      content: 'This is amazing! Great work!',
      timestamp: '1 hour ago'
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'Love the innovation here. Keep it up!',
      timestamp: '2 hours ago'
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: comments.length + 1,
      author: 'You',
      content: newComment,
      timestamp: 'Just now'
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Media Section */}
          {post.media && (
            <div className="bg-black flex items-center justify-center">
              {post.mediaType === 'image' ? (
                <img
                  src={post.media}
                  alt="Post media"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <video
                  src={post.media}
                  className="max-w-full max-h-full object-contain"
                  controls
                />
              )}
            </div>
          )}

          {/* Content Section */}
          <div className={`flex flex-col h-full ${!post.media ? 'col-span-2' : ''}`}>
            {/* Post Header */}
            <div className="p-4 border-b flex items-center space-x-3">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{post.author}</h4>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4 border-b">
              <p className="text-gray-800">{post.content}</p>
            </div>

            {/* Post Stats */}
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={onLike}
                  className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-500">
                  <MessageCircle className="w-5 h-5" />
                  <span>{comments.length}</span>
                </div>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-800">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={2}
                  className="flex-1"
                />
                <Button onClick={handleAddComment} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetail;
