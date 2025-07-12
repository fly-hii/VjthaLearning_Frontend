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
    media?: string;
    mediaType?: 'image' | 'video';
    mediaFile?: File;
    timestamp: string;
  }) => void;
}

const PostCreation = ({ onCreatePost }: PostCreationProps) => {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const timestamp = new Date().toISOString();
    const post: any = {
      content,
      timestamp,
    };

    if (mediaFile) {
      post.mediaFile = mediaFile;
      post.mediaType = mediaType;
    }

    onCreatePost(post);

    setContent('');
    setMediaFile(null);
    setMediaPreview(null);
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
        <Label htmlFor="media">Upload Media (optional)</Label>
        <Input
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