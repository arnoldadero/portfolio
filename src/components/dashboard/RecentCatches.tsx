import React from 'react';

const catches = [
  {
    id: 1,
    species: 'Atlantic Salmon',
    weight: '450 kg',
    location: 'North Sea',
    date: '2024-03-15',
    status: 'Verified',
    statusColor: 'text-green-600',
  },
  {
    id: 2,
    species: 'Cod',
    weight: '320 kg',
    location: 'Baltic Sea',
    date: '2024-03-14',
    status: 'Processing',
    statusColor: 'text-yellow-600',
  },
  {
    id: 3,
    species: 'Tuna',
    weight: '580 kg',
    location: 'Mediterranean',
    date: '2024-03-13',
    status: 'Verified',
    statusColor: 'text-green-600',
  },
];

export function RecentCatches() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Catches</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Species</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {catches.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.species}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`${item.statusColor} font-medium`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}