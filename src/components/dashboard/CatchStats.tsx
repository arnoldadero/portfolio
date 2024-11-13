import React from 'react';
import { Fish, DollarSign, Scale, Thermometer } from 'lucide-react';

const stats = [
  { name: 'Total Catch', value: '2,450 kg', icon: Fish, color: 'text-blue-600' },
  { name: 'Revenue', value: '$12,450', icon: DollarSign, color: 'text-green-600' },
  { name: 'Compliance Score', value: '98%', icon: Scale, color: 'text-purple-600' },
  { name: 'Temperature', value: '2.4°C', icon: Thermometer, color: 'text-red-600' },
];

export function CatchStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}