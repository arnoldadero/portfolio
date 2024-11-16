import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PenSquare, Activity, Calendar } from 'lucide-react';
import { blogApi } from '../lib/api';
import { Button } from '../components/ui/Button';

export default function Dashboard() {
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => blogApi.getPosts()
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: () => blogApi.getActivities()
  });

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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Posts</h2>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              {postsLoading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {posts?.data.map((post) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.slug}`}
                      className="block p-4 rounded-lg border hover:border-indigo-500 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              {activitiesLoading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {activities?.data.map((activity) => (
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}