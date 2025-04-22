import React from 'react';
import {
  SiGo,
  SiRust,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiTrpc,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiWebassembly,
  SiDocker,
  SiAmazon,
  SiKubernetes,
  SiGit
} from '@icons-pack/react-simple-icons';
import { Database, Layout, Server } from 'lucide-react';

interface SkillItem {
  name: string;
  icon: React.ElementType;
}

interface SkillGroup {
  category: string;
  icon: React.ElementType;
  items: SkillItem[];
}

const skills: SkillGroup[] = [
  {
    category: "Backend Development",
    icon: Server,
    items: [
      { name: "Golang", icon: SiGo },
      { name: "Rust", icon: SiRust },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
      { name: "gRPC", icon: SiTrpc }
    ]
  },
  {
    category: "Frontend Development",
    icon: Layout,
    items: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "WebAssembly", icon: SiWebassembly }
    ]
  },
  {
    category: "DevOps & Tools",
    icon: Database,
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "AWS", icon: SiAmazon },
      { name: "Git", icon: SiGit }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-100/50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={skill.category}
              className="group p-8 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm 
                       hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/50
                       shadow-lg hover:shadow-xl transition-all duration-300
                       transform hover:-translate-y-1"
              style={{
                animation: 'fade-in-up 0.5s ease-out forwards',
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                  <skill.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{skill.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {skill.items.map((item) => (
                  <span 
                    key={item.name} 
                    className="px-4 py-2 bg-gray-50 text-gray-700 text-sm rounded-xl
                             hover:bg-indigo-50 hover:text-indigo-700 
                             border border-gray-100 hover:border-indigo-100
                             transition-all duration-300 ease-in-out
                             flex items-center gap-2 group/item"
                  >
                    <item.icon className="w-4 h-4 group-hover/item:text-indigo-600 transition-colors" />
                    {item.name}
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