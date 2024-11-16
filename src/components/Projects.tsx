import React, { useState } from 'react';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: "Distributed Task Scheduler",
    description: "Built a high-performance distributed task scheduling system using Golang and Redis, capable of handling millions of tasks per day with fault tolerance and horizontal scaling capabilities.",
    tech: ["Golang", "Redis", "gRPC", "Docker"],
    metrics: "Processes 2M+ tasks daily with 99.99% reliability",
    link: "https://github.com",
    demo: "https://example.com",
    details: [
      "Implemented distributed locking mechanism for task coordination",
      "Designed fault-tolerant architecture with automatic failover",
      "Built real-time monitoring dashboard for system health",
      "Achieved sub-100ms task distribution latency"
    ]
  },
  {
    title: "Real-time Analytics Platform",
    description: "Developed a real-time analytics platform using Rust for data processing and React for visualization, achieving sub-millisecond latency for complex data aggregations.",
    tech: ["Rust", "React", "WebSocket", "TimescaleDB"],
    metrics: "Reduced processing latency by 80%",
    link: "https://github.com",
    demo: "https://example.com",
    details: [
      "Optimized data pipeline for real-time processing",
      "Implemented custom WebSocket protocol for efficient data transfer",
      "Created dynamic visualization components with D3.js",
      "Designed time-series data storage architecture"
    ]
  },
  {
    title: "Cloud Infrastructure Manager",
    description: "Created a cloud infrastructure management tool that automates deployment and scaling of microservices across multiple cloud providers.",
    tech: ["TypeScript", "Node.js", "AWS", "Kubernetes"],
    metrics: "Reduced deployment time by 65%",
    link: "https://github.com",
    demo: "https://example.com",
    details: [
      "Automated infrastructure provisioning across multiple clouds",
      "Implemented cost optimization algorithms",
      "Built extensible plugin system for cloud providers",
      "Created intuitive CLI interface for operations"
    ]
  }
];

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Notable Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.title}
              className="bg-white rounded-xl p-6 card-hover border border-gray-100/50"
            >
              <h3 className="text-xl font-semibold gradient-text mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-indigo-600 font-medium mb-4">{project.metrics}</p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setExpandedProject(
                    expandedProject === project.title ? null : project.title
                  )}
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  <ChevronRight 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedProject === project.title ? 'rotate-90' : ''
                    }`}
                  />
                  {expandedProject === project.title ? 'Hide Details' : 'View Details'}
                </button>
                
                <div className={`grid transition-all duration-300 ${
                  expandedProject === project.title ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}>
                  <div className="overflow-hidden">
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 pt-2">
                      {project.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-4 pt-4 border-t">
                <a 
                  href={project.link}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
                <a 
                  href={project.demo}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}