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
import { Code2, Database, Layout, Server } from 'lucide-react';

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
                    key={item.name} 
                    className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full
                             hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-300
                             flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4" />
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