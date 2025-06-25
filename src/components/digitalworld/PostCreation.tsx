
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Image, Video } from 'lucide-react';

interface PostCreationProps {
  onCreatePost: (post: {
    author: string;
    avatar: string;
    content: string;
    media?: string;
    mediaType?: 'image' | 'video';
    timestamp: string;
  }) => void;
}

const PostCreation = ({ onCreatePost }: PostCreationProps) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    onCreatePost({
      author,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`,
      content,
      media: mediaUrl || undefined,
      mediaType: mediaUrl ? mediaType : undefined,
      timestamp: 'Just now'
    });

    setContent('');
    setAuthor('');
    setMediaUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="author">Author Name</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>

      <div>
        <Label htmlFor="content">Post Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="media">Media URL (optional)</Label>
        <Input
          id="media"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Enter image or video URL"
        />
      </div>

      {mediaUrl && (
        <div className="flex space-x-2">
          <Button
            type="button"
            variant={mediaType === 'image' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMediaType('image')}
          >
            <Image className="w-4 h-4 mr-2" />
            Image
          </Button>
          <Button
            type="button"
            variant={mediaType === 'video' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMediaType('video')}
          >
            <Video className="w-4 h-4 mr-2" />
            Video
          </Button>
        </div>
      )}

      <Button type="submit" className="w-full">
        Create Post
      </Button>
    </form>
  );
};

export default PostCreation;
