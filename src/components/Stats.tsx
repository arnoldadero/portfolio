import React from 'react';

export function Stats() {
  const stats = [
    { value: "100+", label: "Active Fisheries" },
    { value: "10K+", label: "Tracked Shipments" },
    { value: "99.9%", label: "Traceability Rate" },
    { value: "50K+", label: "Products Sold" }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 rounded-lg bg-white/10">
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}