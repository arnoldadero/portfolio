import { create } from 'zustand';
import { blogApi } from '../api';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,

  verifyAuth: async () => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      set({ isLoading: false, isAuthenticated: false });
      return;
    }

    try {
      const response = await blogApi.verifyAuth();
      set({
        isAuthenticated: true,
        user: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      localStorage.removeItem('auth_token');
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: 'Authentication failed',
      });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await blogApi.login(email, password);
      const { token, user } = response.data;
      
      // Store token with Bearer prefix
      localStorage.setItem('auth_token', `Bearer ${token}`);
      
      set({
        isAuthenticated: true,
        user,
        isLoading: false,
        error: null,
      });
    } catch (error: Error & { response?: { data?: { message?: string } } }) {
      localStorage.removeItem('auth_token');
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error.response?.data?.message || 'Login failed',
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
    });
  },
}));