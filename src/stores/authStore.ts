import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import axiosRetry from 'axios-retry';

// Fix API URL configuration to match backend
const API_URL = (() => {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
  return url.replace(/\/+$/, '');
})();

// Update axios instance config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,  // Add this line
  timeout: 10000,
  // Add validation for self-signed certs in development
  validateStatus: (status) => status >= 200 && status < 500
});

// Enhanced retry logic
axiosRetry(api, { 
  retries: 3,
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount) + Math.random() * 1000;
  },
  retryCondition: (error: AxiosError) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
           error.code === 'ECONNREFUSED' ||
           error.code === 'ECONNABORTED';
  }
});

interface AuthStore {
  user: null | { 
    email: string;
    isAdmin: boolean; // Add isAdmin field
  };
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  init: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (credentials) => {
    try {
      // Transform credentials to match backend expectations
      const loginData = {
        emailOrUsername: credentials.email,
        password: credentials.password
      };
      
      const response = await api.post('/auth/login', loginData);
      
      if (!response.data?.token) {
        throw new Error('Invalid response from server');
      }

      // Save token to localStorage
      localStorage.setItem('auth_token', response.data.token);

      set({ 
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          console.error('Connection refused, server may be down:', API_URL);
          throw new Error('Unable to connect to server - please verify the server is running');
        }
        if (error.response?.status === 404) {
          throw new Error('Login endpoint not found - please check API configuration');
        }
        if (error.response) {
          throw new Error(error.response.data?.message || 'Login failed');
        }
        throw new Error('Network error - please check your connection');
      }
      throw new Error('Login failed - please try again');
    }
  },

  logout: () => {
    delete api.defaults.headers.common['Authorization'];
    set({ 
      user: null,
      token: null,
      isAuthenticated: false 
    });
  },

  setToken: (token: string | null) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
    set({ 
      token,
      isAuthenticated: !!token 
    });
  },

  // Initialize auth state from localStorage
  init: () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      set({ token, isAuthenticated: true });
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
}));

// Initialize auth state
useAuthStore.getState().init();

