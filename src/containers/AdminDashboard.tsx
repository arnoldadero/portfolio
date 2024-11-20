import React from 'react';
import { useAuthStore } from '../lib/stores/authStore';

export default function AdminDashboard() {
  // Remove unused user variable
  // const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects Management Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <p className="text-gray-600 mb-4">Manage your portfolio projects</p>
            <button className="btn-primary">
              Manage Projects
            </button>
          </div>

          {/* Blog Management Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
            <p className="text-gray-600 mb-4">Manage your blog posts</p>
            <button className="btn-primary">
              Manage Posts
            </button>
          </div>

          {/* Skills Management Card */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <p className="text-gray-600 mb-4">Update your skills and technologies</p>
            <button className="btn-primary">
              Manage Skills
            </button>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-indigo-600 font-medium">Total Projects</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 font-medium">Blog Posts</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-600 font-medium">Skills</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
