import { create } from 'zustand';
import { blogApi } from '../lib/api';

interface AuthState {
  user: null | {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await blogApi.login(email, password);
      localStorage.setItem('auth_token', data.token);
      set({ user: data.user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed', 
        isLoading: false 
      });
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({ user: null });
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await blogApi.register(name, email, password);
      localStorage.setItem('auth_token', data.token);
      set({ user: data.user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Registration failed', 
        isLoading: false 
      });
    }
  },
}));