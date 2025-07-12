
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Image, Video } from 'lucide-react';

interface PostCreationProps {
  onCreatePost: (post: {
    content: string;
    mediaFile?: File;
    mediaType?: 'image' | 'video';
    tags?: string[];
  }) => void;
}

const PostCreation = ({ onCreatePost }: PostCreationProps) => {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const post: any = {
      content,
    };

    if (mediaFile) {
      post.mediaFile = mediaFile;
      post.mediaType = mediaType;
    }

    if (tags.trim()) {
      post.tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }

    onCreatePost(post);

    // Reset form
    setContent('');
    setMediaFile(null);
    setMediaPreview(null);
    setTags('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
    setMediaType(file.type.startsWith('video') ? 'video' : 'image');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="technology, innovation, coding"
        />
      </div>

      <div>
        <Label htmlFor="media">Upload Media (optional)</Label>
        <Input
          id="media"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />
      </div>

      {mediaPreview && (
        <div className="mt-2">
          {mediaType === 'image' ? (
            <img src={mediaPreview} alt="Preview" className="max-h-64 rounded-lg" />
          ) : (
            <video src={mediaPreview} controls className="max-h-64 rounded-lg" />
          )}
        </div>
      )}

      <Button type="submit" className="w-full">
        Create Post
      </Button>
    </form>
  );
};

export default PostCreation;
