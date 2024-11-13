import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { CatchStats } from './CatchStats';
import { RecentCatches } from './RecentCatches';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />
      <main className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <CatchStats />
            <RecentCatches />
          </div>
        </div>
      </main>
    </div>
  );
}