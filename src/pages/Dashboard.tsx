import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  PenSquare
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { blogApi } from '../services/blogApi';
import type { Post } from '../services/blogApi';

export default function Dashboard() {
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => blogApi.getPosts()
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => blogApi.getActivities(),
    networkMode: 'always',
    retry: 3
  });
  const containerClass = "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8";
  // Using the Activity type from the API
  // Using the Activity type from the API
  type Activity = Awaited<ReturnType<typeof blogApi.getActivities>>['data'][number];

  interface LoadingOrContentProps<T> {
    isLoading: boolean;
    data: T[];
    renderItem: (item: T) => React.ReactNode;
  }

  const LoadingOrContent = <T,>({ isLoading, data, renderItem }: LoadingOrContentProps<T>) => (
    isLoading ? (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 rounded" />
        ))}
      </div>
    ) : (
      <div className="space-y-4">
        {data.map(renderItem)}
      </div>
    )
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Link to="/new-post">
            <Button>
              <PenSquare className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Posts */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <LoadingOrContent<Post>
                isLoading={postsLoading}
                data={posts?.data ?? []}
                renderItem={(post: Post) => (
                  <div key={post.id} className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-indigo-600">
                        {post.title}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{post.excerpt}</p>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <LoadingOrContent<Activity>
                isLoading={activitiesLoading}
                data={activities?.data ?? []}
                renderItem={(activity: Activity) => (
                  <div
                    key={activity.id}
                    className="p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-indigo-600">
                        {activity.type}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{activity.description}</p>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
