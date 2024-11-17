import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { blogApi, Post } from '../lib/api';
import { format } from 'date-fns';
import LoadingSkeleton from '../components/LoadingSkeleton';
import React, { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  // Add other properties as needed
}

export default function Blog() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const response = await blogApi.getPosts();
        console.log('Raw API Response:', response);
        // Check if response has the expected structure
        if (!response?.data) {
          throw new Error('Invalid response structure');
        }
        return response;
      } catch (err) {
        console.error('API Error:', err);
        throw err;
      }
    },
    staleTime: 60000, // Cache data for 60 seconds
  });

  useEffect(() => {
    console.log('Query State:', {
      isLoading,
      error,
      posts,
    });
  }, [isLoading, error, posts]);

  const [localPosts, setLocalPosts] = useState<BlogPost[]>([]);

  // Handle pagination
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <LoadingSkeleton />
      </div>
    );
  }

  // Add error handling in the component
  if (error) {
    console.error('Query error:', error);
    return <div>Error loading blog posts</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Blog</h1>
      <div className="grid gap-12">
        {posts?.data.map((post: Post) => (
          <article 
            key={post.id}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {format(new Date(post.createdAt), 'HH:mm')}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author.name}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-6">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a 
                  href={`/blog/${post.slug}`}
                  className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                >
                  Read more →
                </a>
                {post.socialLinks.facebook && (
                  <a 
                    href={post.socialLinks.facebook}
                    className="text-blue-600 hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Share on Facebook
                  </a>
                )}
                {post.socialLinks.linkedin && (
                  <a 
                    href={post.socialLinks.linkedin}
                    className="text-blue-700 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Share on LinkedIn
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}