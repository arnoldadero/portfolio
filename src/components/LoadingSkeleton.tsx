// src/components/LoadingSkeleton.tsx

import React from 'react';

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    {/* Skeleton elements */}
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
  </div>
);

export default LoadingSkeleton;