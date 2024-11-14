import { Code2, Globe, Layout, Server, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface SkillProject {
  name: string;
  description: string;
  link: string;
}

interface SkillItem {
  name: string;
  logo: string;
  projects: SkillProject[];
}

interface Skill {
  category: string;
  icon: any;
  items: SkillItem[];
}

const skills: Skill[] = [
  {
    category: "Backend Development",
    icon: Server,
    items: [
      {
        name: "Golang",
        logo: "https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg",
        projects: [
          { 
            name: "Distributed Task Scheduler",
            description: "High-performance distributed task scheduling system with fault tolerance and horizontal scaling capabilities",
            link: "/projects/task-scheduler"
          }
        ]
      },
      {
        name: "Rust",
        logo: "https://rustacean.net/assets/rustacean-flat-happy.svg",
        projects: [
          { 
            name: "Real-time Analytics Platform",
            description: "Sub-millisecond latency data processing engine for complex analytics",
            link: "/projects/analytics"
          }
        ]
      },
      {
        name: "Node.js",
        logo: "https://nodejs.org/static/images/logo.svg",
        projects: [
          { 
            name: "API Gateway",
            description: "Scalable API gateway with rate limiting and caching",
            link: "/projects/api-gateway"
          }
        ]
      },
      {
        name: "PostgreSQL",
        logo: "https://www.postgresql.org/media/img/about/press/elephant.png",
        projects: [
          { 
            name: "Database Optimization",
            description: "Performance tuning and query optimization for large datasets",
            link: "/projects/db-optimization"
          }
        ]
      },
      {
        name: "Redis",
        logo: "https://redis.io/images/redis-white.png",
        projects: [
          { 
            name: "Caching Layer",
            description: "Implemented distributed caching with Redis Cluster",
            link: "/projects/redis-cache"
          }
        ]
      },
      {
        name: "gRPC",
        logo: "https://grpc.io/img/logos/grpc-icon-color.png",
        projects: [
          { 
            name: "Microservices Communication",
            description: "High-performance service mesh using gRPC",
            link: "/projects/grpc-mesh"
          }
        ]
      }
    ]
  },
  {
    category: "Frontend Development",
    icon: Layout,
    items: [
      {
        name: "React",
        logo: "https://reactjs.org/icons/icon-512x512.png",
        projects: [
          { 
            name: "Dashboard UI",
            description: "Real-time monitoring dashboard with interactive charts",
            link: "/projects/dashboard"
          }
        ]
      },
      {
        name: "TypeScript",
        logo: "https://typescript.org/images/logo.svg",
        projects: [
          { 
            name: "Type-safe SDK",
            description: "Developer toolkit with full type safety and documentation",
            link: "/projects/typescript-sdk"
          }
        ]
      },
      {
        name: "Next.js",
        logo: "https://nextjs.org/static/favicon/favicon-32x32.png",
        projects: [
          { 
            name: "E-commerce Platform",
            description: "High-performance e-commerce site with SSR",
            link: "/projects/nextjs-commerce"
          }
        ]
      },
      {
        name: "Tailwind CSS",
        logo: "https://tailwindcss.com/favicons/apple-touch-icon.png",
        projects: [
          { 
            name: "Design System",
            description: "Comprehensive UI component library with Tailwind",
            link: "/projects/design-system"
          }
        ]
      },
      {
        name: "WebAssembly",
        logo: "https://webassembly.org/css/webassembly.svg",
        projects: [
          { 
            name: "Browser Computing",
            description: "CPU-intensive calculations in the browser",
            link: "/projects/wasm-compute"
          }
        ]
      }
    ]
  },
  {
    category: "API Development",
    icon: Globe,
    items: [
      {
        name: "RESTful APIs",
        logo: "https://www.vectorlogo.zone/logos/raspberrypi/raspberrypi-icon.svg",
        projects: [
          { 
            name: "REST Architecture",
            description: "Scalable REST API with comprehensive documentation",
            link: "/projects/rest-api"
          }
        ]
      },
      {
        name: "GraphQL",
        logo: "https://graphql.org/img/logo.svg",
        projects: [
          { 
            name: "GraphQL Gateway",
            description: "Unified GraphQL API for microservices",
            link: "/projects/graphql-gateway"
          }
        ]
      },
      {
        name: "API Gateway",
        logo: "https://www.svgrepo.com/show/331552/api.svg",
        projects: [
          { 
            name: "API Management",
            description: "Central API gateway with authentication and monitoring",
            link: "/projects/api-management"
          }
        ]
      },
      {
        name: "OpenAPI",
        logo: "https://www.openapis.org/wp-content/uploads/sites/3/2016/11/favicon.png",
        projects: [
          { 
            name: "API Documentation",
            description: "Auto-generated API documentation with OpenAPI",
            link: "/projects/openapi-docs"
          }
        ]
      }
    ]
  },
  {
    category: "Tools & Practices",
    icon: Code2,
    items: [
      {
        name: "Git",
        logo: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
        projects: [
          { 
            name: "Git Workflow",
            description: "Implemented GitOps workflow for continuous deployment",
            link: "/projects/gitops"
          }
        ]
      },
      {
        name: "CI/CD",
        logo: "https://about.gitlab.com/images/ci/gitlab-ci-cd-logo_2x.png",
        projects: [
          { 
            name: "Pipeline Automation",
            description: "Automated deployment pipeline with testing and monitoring",
            link: "/projects/cicd"
          }
        ]
      },
      {
        name: "TDD",
        logo: "https://www.svgrepo.com/show/374037/testing-library.svg",
        projects: [
          { 
            name: "Test Framework",
            description: "Comprehensive testing suite with TDD methodology",
            link: "/projects/tdd"
          }
        ]
      },
      {
        name: "Agile",
        logo: "https://www.svgrepo.com/show/378796/agile.svg",
        projects: [
          { 
            name: "Agile Implementation",
            description: "Agile transformation and process optimization",
            link: "/projects/agile"
          }
        ]
      }
    ]
  }
];

function ProjectModal({ projects, onClose }: { projects: SkillProject[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.name} className={`${index > 0 ? "pt-6 border-t" : ""}`}>
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <a 
                href={project.link}
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6 pt-6 border-t">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [selectedProjects, setSelectedProjects] = useState<SkillProject[] | null>(null);

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
                  <button
                    key={item.name}
                    onClick={() => item.projects.length && setSelectedProjects(item.projects)}
                    className="group/item px-4 py-2 bg-gradient-to-r from-gray-50 to-white
                             rounded-lg border border-gray-100 hover:border-indigo-200 
                             hover:shadow-md transition-all duration-300"
                    style={{
                      animation: 'fade-in 0.5s ease-out forwards',
                      animationDelay: `${(index * 200) + (itemIndex * 100)}ms`,
                      opacity: 0
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <img 
                        src={item.logo} 
                        alt={`${item.name} logo`}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover/item:text-indigo-700">
                        {item.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProjects && (
        <ProjectModal 
          projects={selectedProjects} 
          onClose={() => setSelectedProjects(null)} 
        />
      )}
      
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