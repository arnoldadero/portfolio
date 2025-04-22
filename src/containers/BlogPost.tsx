import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, User, Share2 } from 'lucide-react';
import { blogApi } from '../lib/api';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Button } from '../components/ui/Button';
import Tag from '../components/ui/Tag';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => blogApi.getPost(slug!)
  });

  const handleShare = async (platform: 'facebook' | 'linkedin') => {
    if (!post?.data) return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.data.title);
    
    try {
      if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
      } else {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
      }
    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post?.data) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <article className="prose lg:prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.data.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {format(new Date(post.data.createdAt), 'MMM dd, yyyy')}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {format(new Date(post.data.createdAt), 'HH:mm')}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.data.author.name}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.data.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        <div className="mb-12">
          <ReactMarkdown>{post.data.content}</ReactMarkdown>
        </div>

        <div className="flex items-center gap-4 border-t pt-8">
          <span className="font-medium text-gray-700 flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share this post:
          </span>
          <Button
            variant="outline"
            onClick={() => handleShare('facebook')}
          >
            Share on Facebook
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare('linkedin')}
          >
            Share on LinkedIn
          </Button>
        </div>
      </article>
    </div>
  );
}