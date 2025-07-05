import { useState } from 'react';
import { Plus, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import PostCreation from './PostCreation';
import PostDetail from './PostDetail';
import Navigation from '../Navigation';

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
  isBookmarked: boolean;
  tags: string[];
  trending?: boolean;
}

const TechHub = () => {
  const [posts, setPosts] = useState<Post[]>([
     {
      id: 1,
      author: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      content: 'Just launched my AI-powered web application! 🚀 It uses machine learning to predict user behavior and provides personalized recommendations. The future of web development is here!',
      media: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      mediaType: 'image',
      likes: 142,
      comments: 28,
      shares: 15,
      timestamp: '2 hours ago',
      isLiked: false,
      isBookmarked: false,
      tags: ['AI', 'WebDev', 'Innovation'],
      trending: true
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      content: 'Clean code is poetry in motion ✨ Working on a new React component library that focuses on accessibility and performance. Every line matters!',
      media: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      mediaType: 'image',
      likes: 89,
      comments: 22,
      shares: 8,
      timestamp: '4 hours ago',
      isLiked: true,
      isBookmarked: true,
      tags: ['React', 'CleanCode', 'A11y']
    },
    {
      id: 3,
      author: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      content: 'Behind the scenes of our latest mobile app development! 📱 Using Flutter to create stunning cross-platform experiences. The journey from idea to app store is incredible.',
      media: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      mediaType: 'image',
      likes: 67,
      comments: 15,
      shares: 12,
      timestamp: '6 hours ago',
      isLiked: false,
      isBookmarked: false,
      tags: ['Flutter', 'Mobile', 'CrossPlatform']
    },
    {
      id: 4,
      author: 'Emma Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      content: 'Data visualization magic! 📊 Created this interactive dashboard showing real-time analytics. The power of D3.js never ceases to amaze me.',
      media: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      mediaType: 'image',
      likes: 234,
      comments: 45,
      shares: 28,
      timestamp: '8 hours ago',
      isLiked: true,
      isBookmarked: false,
      tags: ['DataViz', 'D3js', 'Analytics'],
      trending: true
    },
    {
      id: 5,
      author: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      content: 'Blockchain meets sustainability! 🌱 Working on a decentralized platform for carbon credit trading. Technology for a better world!',
      likes: 156,
      comments: 33,
      shares: 19,
      timestamp: '12 hours ago',
      isLiked: false,
      isBookmarked: true,
      tags: ['Blockchain', 'Sustainability', 'DeFi']
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

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'likes' | 'comments' | 'shares' | 'isLiked' | 'isBookmarked' | 'tags'>) => {
    const post: Post = {
      ...newPost,
      id: posts.length + 1,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
      tags: ['New']
    };
    setPosts([post, ...posts]);
    setShowCreatePost(false);
  };

  return (
          <><Navigation />
    <div className="max-w-7xl mx-auto space-y-6 px-4">
      {/* Header */}
      <div className="py-4 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl text-white mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Left side: Title and description */}
          <div>
            <h2 className="text-4xl font-bold mb-2">Tech Hub</h2>
            <p className="text-lg opacity-90">Share your innovations, inspire others</p>
          </div>

          {/* Right side: Badges */}
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 mt-2 md:mt-0">
            <Badge variant="secondary" className="bg-white/20 text-white border-none">
              <Sparkles className="w-4 h-4 mr-1" />
              Trending
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-none">
              🚀 Innovation
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-none">
              💡 Ideas
            </Badge>
          </div>
          <Button
            onClick={() => setShowCreatePost(true)}
            className="w-42 h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-6 h-6 mr-2" />
            Share Your Innovation
          </Button>

        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-l-4 border-l-gradient-to-b from-blue-500 to-purple-500">
            <CardContent className="p-0 flex flex-col h-full">
              {/* Header */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200" />
                    {post.trending && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{post.author}</h4>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="px-6 pb-4 flex-1">
                <p className="text-gray-800 text-lg leading-relaxed mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {post.media && (
                  <div className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.mediaType === 'image' ? (
                      <img src={post.media} alt="Post media" className="w-full object-cover max-h-60 hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <video src={post.media} className="w-full object-cover max-h-60" controls />
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <button onClick={() => handleLike(post.id)}
                      className={`group flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-all duration-200`}>
                      <Heart className={`w-6 h-6 group-hover:scale-110 transition-transform ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">{post.likes}</span>
                    </button>
                    <button onClick={() => setSelectedPost(post)}
                      className="group flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-all duration-200">
                      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{post.comments}</span>
                    </button>
                    <button className="group flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-all duration-200">
                      <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{post.shares}</span>
                    </button>
                  </div>
                  <button onClick={() => handleBookmark(post.id)}
                    className={`${post.isBookmarked ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500 transition-colors`}>
                    <Bookmark className={`w-6 h-6 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post Detail Dialog */}
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={() => handleLike(selectedPost.id)} />
      )}
      <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
        <DialogTrigger asChild>
          <Button
            className="w-42 h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-6 h-6 mr-2" />
            Share Your Innovation
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create New Post
            </DialogTitle>
          </DialogHeader>
          <PostCreation onCreatePost={handleCreatePost} />
        </DialogContent>
      </Dialog>

    </div></>
  );
};

export default TechHub;
