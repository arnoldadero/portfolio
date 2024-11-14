import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { blogApi, Post } from '../lib/api';
import { format } from 'date-fns';

export default function Blog() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => blogApi.getPosts()
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="animate-pulse space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
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