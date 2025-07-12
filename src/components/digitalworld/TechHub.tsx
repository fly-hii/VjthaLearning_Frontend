import { useEffect, useState } from 'react';
import {
  Plus, Heart, MessageCircle, Share2, Bookmark,
  MoreHorizontal, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import PostCreation from './PostCreation';
import PostDetail from './PostDetail';
import Navigation from '../Navigation';
import { techPostApi } from '../../Services/api';
import { useAuth } from '@/hooks/useAuth';

const TechHub = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await techPostApi.getAll();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleLike = async (post) => {
    const updatedPost = {
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    };
    try {
      await techPostApi.update(post._id, {
        isLiked: updatedPost.isLiked,
        likes: updatedPost.likes,
      });
      setPosts(posts.map((p) => (p._id === post._id ? updatedPost : p)));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleBookmark = async (post) => {
    const updatedPost = { ...post, isBookmarked: !post.isBookmarked };
    try {
      await techPostApi.update(post._id, { isBookmarked: updatedPost.isBookmarked });
      setPosts(posts.map((p) => (p._id === post._id ? updatedPost : p)));
    } catch (err) {
      console.error('Error bookmarking post:', err);
    }
  };

const handleCreatePost = async (newPost) => {
  try {
    const formData = new FormData();
    formData.append('content', newPost.content);
    formData.append('mediaType', newPost.mediaType || 'image');

    if (newPost.mediaFile) {
      formData.append('media', newPost.mediaFile);
    }

    if (newPost.tags) {
      formData.append('tags', newPost.tags.join(','));
    }

    await techPostApi.create(formData); // send FormData directly
    fetchPosts(); // reload posts
    setShowCreatePost(false);
  } catch (err) {
    console.error('Error creating post:', err);
  }
};


  const handleDeletePost = async (postId) => {
    try {
      await techPostApi.delete(postId);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <>
      <Navigation />
      <div className="max-w-7xl mx-auto space-y-6 px-4">
        <div className="py-4 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl text-white mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-2">Tech Hub</h2>
              <p className="text-lg opacity-90">Share your innovations, inspire others</p>
            </div>
            <div className="flex flex-wrap items-center justify-start md:justify-end gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white">🚀 Innovation</Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">💡 Ideas</Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Sparkles className="w-4 h-4 mr-1" /> Trending
              </Badge>
            </div>
            <Button
              onClick={() => setShowCreatePost(true)}
              className="w-42 h-14 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-all"
            >
              <Plus className="w-6 h-6 mr-2" /> Share Your Innovation
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post._id} className="overflow-hidden hover:shadow-2xl">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img src={post.author?.avatar || '/default-avatar.png'} alt={post.author?.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{post.author?.name || 'Anonymous'}</h4>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleDeletePost(post._id)} variant="ghost" size="sm">
                    <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-red-500" />
                  </Button>
                </div>

                <div className="px-6 pb-4 flex-1">
                  <p className="text-gray-800 text-lg mb-4">{post.content}</p>
                  {post.media && (
                    post.mediaType === 'image'
                      ? <img src={post.media} alt="Post media" className="rounded-xl" />
                      : <video src={post.media} controls className="rounded-xl" />
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags?.map((tag, i) => (
                      <Badge key={i} className="bg-blue-100 text-blue-700">#{tag}</Badge>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-4 border-t bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-8">
                      <button onClick={() => handleLike(post)} className={`flex items-center ${post.isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                        <Heart className="w-6 h-6 mr-1" /> {post.likes}
                      </button>
                      <button onClick={() => setSelectedPost(post)} className="flex items-center text-gray-500">
                        <MessageCircle className="w-6 h-6 mr-1" /> {post.comments}
                      </button>
                      <button className="flex items-center text-gray-500">
                        <Share2 className="w-6 h-6 mr-1" /> {post.shares}
                      </button>
                    </div>
                    <button onClick={() => handleBookmark(post)} className={`${post.isBookmarked ? 'text-blue-500' : 'text-gray-400'}`}>
                      <Bookmark className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPost && (
          <PostDetail
            post={selectedPost}
            isOpen={!!selectedPost}
            onClose={() => setSelectedPost(null)}
            onLike={() => handleLike(selectedPost)}
          />
        )}

        <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create New Post</DialogTitle>
            </DialogHeader>
            <PostCreation onCreatePost={handleCreatePost} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TechHub;
