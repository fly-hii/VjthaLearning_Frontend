
import { useState } from 'react';
import { Plus, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PostCreation from './PostCreation';
import PostDetail from './PostDetail';

interface Post {
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
}

const TechHub = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Tech Innovator',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      content: 'Just built an amazing AI-powered web application! The future is here 🚀',
      media: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
      mediaType: 'image',
      likes: 42,
      comments: 8,
      shares: 5,
      timestamp: '2 hours ago',
      isLiked: false
    },
    {
      id: 2,
      author: 'Code Master',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      content: 'Working on a new React component library. Clean code is beautiful code! ✨',
      likes: 28,
      comments: 12,
      shares: 3,
      timestamp: '4 hours ago',
      isLiked: true
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'shares' | 'isLiked'>) => {
    const post: Post = {
      ...newPost,
      id: posts.length + 1,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false
    };
    setPosts([post, ...posts]);
    setShowCreatePost(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post Button */}
      <Card className="p-4">
        <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <PostCreation onCreatePost={handleCreatePost} />
          </DialogContent>
        </Dialog>
      </Card>

      {/* Posts Feed */}
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            {/* Post Header */}
            <div className="p-4 flex items-center space-x-3">
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
            <div className="px-4 pb-4">
              <p className="text-gray-800 mb-3">{post.content}</p>
              {post.media && (
                <div 
                  className="cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.mediaType === 'image' ? (
                    <img
                      src={post.media}
                      alt="Post media"
                      className="w-full rounded-lg object-cover max-h-80"
                    />
                  ) : (
                    <video
                      src={post.media}
                      className="w-full rounded-lg object-cover max-h-80"
                      controls
                    />
                  )}
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                <button 
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={() => handleLike(selectedPost.id)}
        />
      )}
    </div>
  );
};

export default TechHub;
