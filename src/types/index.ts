// User related types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// Blog related types
export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  tags: string[];
  likes: number;
  views: number;
  readTime: number;
  links?: string[];
}

export interface PostsResponse {
  posts: Post[];
  nextPage?: number;
  hasMore: boolean;
}

// Project related types
export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  isVisible: boolean;
  category: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  shortDescription: string;
  imageUrl?: string;
  technologies: string | string[];
  githubUrl?: string;
  liveUrl?: string;
  isVisible: boolean;
  category: string;
  priority: number;
}

// Activity related types
export interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'work' | 'education' | 'achievement';
  createdAt: string;
}
