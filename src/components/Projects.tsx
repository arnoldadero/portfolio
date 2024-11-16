import { format } from 'date-fns';
import { ExternalLink, Github, Star, Code, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useGitHubProjects } from '../hooks/useGitHubProjects';

interface GitHubProject {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  updated_at: string;
  thumbnail?: string;
  status?: string;
}

interface ProjectCardProps {
  project: GitHubProject;
}

function formatDate(dateString: string) {
  return format(new Date(dateString), 'MMM d, yyyy');
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Project Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-4xl text-white font-bold">{project.name[0]}</span>
          </div>
        )}
        
        {/* Status Badge */}
        {project.status && (
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-indigo-600">
            {project.status}
          </span>
        )}
      </div>

      <div className="p-6">
        {/* Project Title & Description */}
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {project.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.topics.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 text-sm rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {project.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <Code className="w-4 h-4" />
            {project.language}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a 
            href={project.html_url}
            className="flex-1 text-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code
          </a>
          {project.homepage && (
            <a 
              href={project.homepage}
              className="flex-1 text-center px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [retrying, setRetrying] = useState(false);
  const { 
    data: projects, 
    isLoading, 
    error, 
    refetch 
  } = useGitHubProjects('arnoldadero');

  const handleRetry = async () => {
    setRetrying(true);
    try {
      await refetch();
    } catch (err) {
      console.error('Retry failed:', err);
    } finally {
      setRetrying(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <p className="text-red-500 mb-4">
              {error instanceof Error ? error.message : 'Failed to load projects'}
            </p>
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
              {retrying ? 'Retrying...' : 'Retry'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Notable Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project: GitHubProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}