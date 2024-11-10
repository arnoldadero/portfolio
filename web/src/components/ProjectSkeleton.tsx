import React from 'react';

export const ProjectSkeleton: React.FC = () => {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-full mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <div className="h-4 bg-gray-200 rounded w-20 inline-block" />
          <div className="h-4 bg-gray-200 rounded w-20 inline-block" />
        </div>
        <div className="space-x-2">
          <div className="h-8 bg-gray-200 rounded w-16 inline-block" />
          <div className="h-8 bg-gray-200 rounded w-16 inline-block" />
        </div>
      </div>
    </div>
  );
};