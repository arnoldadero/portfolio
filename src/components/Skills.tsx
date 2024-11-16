import React from 'react';
import { Code2, Database, Globe, Layout, Server, Shield } from 'lucide-react';

const skills = [
  {
    category: "Backend Development",
    icon: Server,
    items: ["Golang", "Rust", "Node.js", "PostgreSQL", "Redis", "gRPC"]
  },
  {
    category: "Frontend Development",
    icon: Layout,
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "WebAssembly"]
  },
  {
    category: "System Design",
    icon: Database,
    items: ["Microservices", "Docker", "Kubernetes", "AWS", "System Architecture"]
  },
  {
    category: "API Development",
    icon: Globe,
    items: ["RESTful APIs", "GraphQL", "API Gateway", "OpenAPI", "Protocol Buffers"]
  },
  {
    category: "Security",
    icon: Shield,
    items: ["OAuth 2.0", "JWT", "HTTPS", "Security Best Practices"]
  },
  {
    category: "Tools & Practices",
    icon: Code2,
    items: ["Git", "CI/CD", "TDD", "Agile", "Performance Optimization"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Technical Expertise</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={skill.category}
              className="p-6 rounded-xl border border-gray-800/5 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
              style={{
                animation: 'fade-in-up 0.5s ease-out forwards',
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="skill-icon">
                  <skill.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{skill.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span 
                    key={item} 
                    className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full
                             hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}