import React from 'react';
import { Anchor, Fish, BarChart3, Shield, Truck, Users, ShoppingCart, Database } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const features = [
    {
      icon: Anchor,
      title: "Real-time Tracking",
      description: "Monitor your catch from sea to shelf with immutable blockchain records and real-time updates."
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description: "Automated compliance monitoring and secure smart contracts ensure regulatory adherence."
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Gain valuable insights into supply chain performance, stock levels, and market trends."
    },
    {
      icon: ShoppingCart,
      title: "Direct Sales",
      description: "Connect directly with consumers through our integrated e-commerce platform."
    },
    {
      icon: Database,
      title: "Blockchain Traceability",
      description: "Every product can be traced back to its source with our blockchain technology."
    },
    {
      icon: Users,
      title: "Stakeholder Access",
      description: "Custom access levels for fishers, distributors, retailers, and consumers."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Complete Supply Chain & Marketplace Solution
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}