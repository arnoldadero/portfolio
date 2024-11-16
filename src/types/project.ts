// src/types/project.ts
export interface GitHubProject {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  updated_at: string;
}

export interface ProjectCardProps {
  project: GitHubProject & {
    thumbnail?: string;      // Project preview image
    category?: string;       // Project category/type
    stack?: string[];       // Technology stack used
    status?: 'active' | 'completed' | 'in-progress';
    demoUrl?: string;       // Live demo link
    highlights?: string[];  // Key project features
  };
}