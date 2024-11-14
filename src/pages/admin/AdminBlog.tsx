// pages/admin/AdminBlog.tsx

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { blogApi } from '../../lib/api';
import { Button } from '../../components/ui/Button';

export default function AdminBlog() {
  const [editing, setEditing] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => blogApi.getPosts()
  });

  const createMutation = useMutation({
    mutationFn: blogApi.createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
  });

  const deleteMutation = useMutation({
    mutationFn: blogApi.deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">
          {editing === 'new' ? 'Create New Post' : 'Edit Post'}
        </h2>
        {/* Add your edit form here */}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts Management</h1>
        <Button 
          onClick={() => createMutation.mutate({ title: 'New Post', content: '', excerpt: 'New post excerpt', tags: [], authorId: '1' })} 
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts?.data.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-500">No posts found. Create your first post!</p>
          </div>
        ) : (
          posts?.data.map((post: any) => (
            <div 
              key={post.id} 
              className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <div className="flex gap-2">
                    {post.tags.map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setEditing(post.id)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-600" 
                    onClick={() => deleteMutation.mutate(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}