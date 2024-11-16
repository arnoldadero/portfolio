import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
}

export interface Activity {
  id: string;
  type: 'code' | 'blog' | 'learning';
  description: string;
  createdAt: string;
  links?: string[];
}

export const blogApi = {
  // Auth
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),

  // Posts
  getPosts: (page = 1, limit = 10) =>
    api.get<Post[]>('/posts', {
      params: { page, limit },
    }),
  getPost: (slug: string) => api.get<Post>(`/posts/${slug}`),
  createPost: (data: Partial<Post>) => api.post('/posts', data),
  updatePost: (slug: string, data: Partial<Post>) => 
    api.put(`/posts/${slug}`, data),
  deletePost: (slug: string) => api.delete(`/posts/${slug}`),

  // Activities
  getActivities: () => api.get<Activity[]>('/activities'),
  createActivity: (data: Omit<Activity, 'id' | 'createdAt'>) =>
    api.post('/activities', data),

  // Social
  shareToFacebook: (postId: string) => 
    api.post(`/posts/${postId}/share/facebook`),
  shareToLinkedIn: (postId: string) =>
    api.post(`/posts/${postId}/share/linkedin`),
};