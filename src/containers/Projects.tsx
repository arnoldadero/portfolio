import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Star, Clock, Code, ExternalLink, RefreshCw } from 'lucide-react';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGo,
  SiRust,
  SiHtml5,
  SiCss3,
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiNodedotjs,
  SiDart,
  SiPhp,
  SiKotlin,
  SiSwift,
  SiCplusplus,
  SiC,
  SiOpenjdk
} from '@icons-pack/react-simple-icons';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import { useInView } from 'react-intersection-observer';

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
  languages: Array<{
    name: string;
    color: string;
    percentage: string;
  }>;
}

interface ProjectCardProps {
  project: GitHubProject;
}

const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'MMM d, yyyy');
};

// Update the language icons mapping
const languageIcons: { [key: string]: React.ElementType } = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Go: SiGo,
  Rust: SiRust,
  HTML: SiHtml5,
  CSS: SiCss3,
  React: SiReact,
  Vue: SiVuedotjs,
  Angular: SiAngular,
  'Node.js': SiNodedotjs,
  Dart: SiDart,
  PHP: SiPhp,
  Kotlin: SiKotlin,
  Swift: SiSwift,
  'C++': SiCplusplus,
  C: SiC,
  Java: SiOpenjdk
};

// Add GitHub's official language colors
const languageColors: { [key: string]: string } = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  React: '#61dafb',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB'
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    // Initial animation
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []); // Remove hasAnimated dependency

  // Add effect to handle hash change
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#projects') {
        setIsAnimating(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Check hash on mount
    if (window.location.hash === '#projects') {
      setIsAnimating(true);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  const handleAnimationEnd = () => {
    setHasAnimated(true);
    setIsAnimating(false);
  };

  const processLanguages = () => {
    if (!project.languages) return [];
    
    if (Array.isArray(project.languages)) {
      return project.languages;
    }

    // Use GitHub's official colors when processing REST API response
    if (typeof project.languages === 'object') {
      const total = Object.values(project.languages as Record<string, number>).reduce((sum, count) => sum + (count as number), 0);
      return Object.entries(project.languages).map(([name, count]) => ({
        name,
        color: languageColors[name] || '#666', // Use official GitHub colors
        percentage: ((count as number / total) * 100).toFixed(1)
      }));
    }

    return [];
  };

  const languages = processLanguages();

  return (
    <div className="project-card" onClick={handleClick}>
      <div className="project-thumbnail">
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.name}
            className="project-thumbnail-image"
          />
        ) : (
          <div className="project-thumbnail-placeholder">
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

      <div className="p-6 flex-grow flex flex-col"> {/* Added flex flex-col */}
        <div className="flex-grow"> {/* This div wraps all content except actions */}
          {/* Project Title & Description */}
          <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-indigo-600 
                       transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

          {/* Languages with Icons - Keep only this section */}
          <div className="flex flex-wrap gap-3 mb-4">
            {languages.map(({ name, color, percentage }) => {
              const LangIcon = languageIcons[name] || Code;
              const scale = hasAnimated && !isAnimating ? parseFloat(percentage) / 100 : undefined;
              
              return (
                <span key={name} className="language-tag">
                  <div
                    className={`language-tag-fill ${isAnimating ? 'animate-fill' : ''}`}
                    style={{
                      backgroundColor: color,
                      '--percentage': parseFloat(percentage) / 100,
                      transform: scale ? `scaleX(${scale})` : undefined
                    } as React.CSSProperties}
                    onAnimationEnd={handleAnimationEnd}
                  />
                  <LangIcon className="language-icon z-10" style={{ color }} />
                  <span className="z-10">{name}</span>
                  <span className="text-gray-400 text-xs z-10">({percentage}%)</span>
                </span>
              );
            })}
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.map((tech) => (
              <span key={tech} className="topic-tag">{tech}</span>
            ))}
          </div>

          {/* Project Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
              <Star className="w-4 h-4" />
              {project.stargazers_count}
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <Clock className="w-4 h-4" />
              {formatDate(project.updated_at)}
            </span>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex gap-3 mt-4">
          <a 
            href={project.html_url}
            className="project-action-button project-action-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code className="w-4 h-4" />
            View Code
          </a>
          {project.homepage && (
            <a 
              href={project.homepage}
              className="project-action-button project-action-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [retrying, setRetrying] = useState(false);
  const { 
    data: projects, 
    isLoading, 
    error, 
    refetch 
  } = useGitHubProjects('arnoldadero');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
        <div 
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${inView ? 'animate-languages' : ''}`}
        >
          {projects?.map((project: GitHubProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;