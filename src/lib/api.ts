import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, null, { synchronous: true });

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  socialLinks: {
    facebook?: string;
    linkedin?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

export interface Activity {
  id: string;
  type: 'code' | 'blog' | 'learning';
  description: string;
  createdAt: string;
  links?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export const blogApi = {
  // Auth endpoints
  login: (emailOrUsername: string, password: string): Promise<AxiosResponse<any>> => 
    api.post('/auth/login', { emailOrUsername, password }),
  
  // Skills endpoints
  getSkills: (params?: { 
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
  }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.sortBy) query.append('sortBy', params.sortBy);
    if (params?.sortOrder) query.append('sortOrder', params.sortOrder);
    if (params?.search) query.append('q', params.search);
    return api.get<{ data: Skill[]; total: number; page: number; limit: number; totalPages: number }>(
      `/skills?${query}`
    );
  },
  createSkill: (data: { name: string; level: number }) => api.post('/skills', data),
  updateSkill: (id: string, data: { name: string; level: number }) => api.put(`/skills/${id}`, data),
  deleteSkill: (id: string) => api.delete(`/skills/${id}`),

  // Projects endpoints
  getProjects: () => api.get('/projects'),
  getProject: (id: string) => api.get(`/projects/${id}`),
  updateProject: (id: string, data: { name: string; description: string; url?: string }) => api.put(`/projects/${id}`, data),
  createProject: (data: { name: string; description: string; url?: string }) => api.post('/projects', data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),

  // Posts
  getPosts: () => api.get<Post[]>('/posts'),
  getPost: (slug: string) => api.get<Post>(`/posts/${slug}`),
  createPost: (data: Pick<Post, 'title' | 'content' | 'excerpt' | 'tags'> & { authorId: string }) => api.post('/posts', data),
  updatePost: (slug: string, data: { title?: string; content?: string; excerpt?: string; tags?: string[]; socialLinks?: { facebook?: string; linkedin?: string } }) => 
    api.put(`/posts/${slug}`, data),
  deletePost: (slug: string) => api.delete(`/posts/${slug}`),

  // Activities
  getActivities: () => api.get<Activity[]>('/activities'),
  createActivity: (data: { type: 'code' | 'blog' | 'learning'; description: string; links?: string[] }) =>
    api.post('/activities', data),

  // Social
  shareToFacebook: (postId: string) => 
    api.post(`/posts/${postId}/share/facebook`),
  shareToLinkedIn: (postId: string) =>
    api.post(`/posts/${postId}/share/linkedin`),

  // Batch operations
  batchUpdateSkills: (updates: { id: string; data: { name: string; level: number } }[]) => 
    api.post('/skills/batch', { updates }),
  
  batchDeleteSkills: (ids: string[]) => 
    api.post('/skills/batch-delete', { ids }),
  
  // Search endpoints
  searchSkills: (query: string) => 
    api.get(`/skills/search?q=${encodeURIComponent(query)}`),
  
  searchProjects: (query: string) => 
    api.get(`/projects/search?q=${encodeURIComponent(query)}`),
};