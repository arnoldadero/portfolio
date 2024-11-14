import { Code2, Globe, Layout, Server } from 'lucide-react';

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
    category: "API Development",
    icon: Globe,
    items: ["RESTful APIs", "GraphQL", "API Gateway", "OpenAPI", "Protocol Buffers"]
  },
  {
    category: "Tools & Practices",
    icon: Code2,
    items: ["Git", "CI/CD", "TDD", "Agile", "Performance Optimization"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-70 
                      bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Technical Expertise</h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Specialized in modern web technologies and scalable architecture
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={skill.category}
              className="group p-8 rounded-xl bg-white shadow-sm 
                       hover:shadow-xl transition-all duration-500 hover:-translate-y-1
                       relative before:absolute before:inset-0 before:rounded-xl
                       before:border-2 before:border-transparent before:bg-gradient-to-r
                       before:from-indigo-500 before:to-purple-500 before:[background-clip:padding-box]
                       before:p-1 before:-z-10 isolate overflow-hidden"
              style={{
                animation: 'fade-in-up 0.8s ease-out forwards',
                animationDelay: `${index * 200}ms`,
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 
                              group-hover:scale-110 transition-transform duration-500">
                  <skill.icon className="w-6 h-6 text-indigo-600 group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{skill.category}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {skill.items.map((item, itemIndex) => (
                  <span 
                    key={item} 
                    className="px-4 py-2 bg-gradient-to-r from-gray-50 to-white text-gray-700
                             rounded-lg border border-gray-100 text-sm font-medium
                             hover:border-indigo-200 hover:text-indigo-700 
                             hover:shadow-md hover:scale-105 transition-all duration-300"
                    style={{
                      animation: 'fade-in 0.5s ease-out forwards',
                      animationDelay: `${(index * 200) + (itemIndex * 100)}ms`,
                      opacity: 0
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}