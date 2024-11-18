import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { User, Post, Project, Activity } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor with debug logging
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  return config;
}, (error: AxiosError) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Add response interceptor with debug logging
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

interface LoginResponse {
  token: string;
  user: User;
}

interface UploadResponse {
  url: string;
}

export const blogApi = {
  // Auth
  login: (email: string, password: string) => 
    api.post<LoginResponse>('/auth/login', { email, password }),
    
  verifyAuth: () => 
    api.get<User>('/auth/verify'),

  // Posts
  getPosts: () => 
    api.get<Post[]>('/posts'),
    
  getPost: (slug: string) => 
    api.get<Post>(`/posts/${slug}`),
    
  createPost: (data: Partial<Post>) => 
    api.post<Post>('/posts', data),
    
  updatePost: (slug: string, data: Partial<Post>) => 
    api.put<Post>(`/posts/${slug}`, data),
    
  deletePost: (slug: string) => 
    api.delete(`/posts/${slug}`),

  // Projects
  getProjects: () => 
    api.get<Project[]>('/projects'),
    
  getProject: (id: number) => 
    api.get<Project>(`/projects/${id}`),
    
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Project>('/projects', project),
    
  updateProject: (id: number, project: Partial<Project>) => 
    api.put<Project>(`/projects/${id}`, project),
    
  deleteProject: (id: number) => 
    api.delete(`/projects/${id}`),

  // File Upload
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post<UploadResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Activities
  getActivities() {
    return api.get<Activity[]>('/activities');
  },
  createActivity(data: Omit<Activity, 'id' | 'createdAt'>) {
    return api.post<Activity>('/activities', data);
  },
};