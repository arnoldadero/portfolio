import { create } from 'zustand';
import { blogApi } from '../lib/api';

interface AuthState {
  user: null | {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isAdmin: boolean;
  };
  isLoading: boolean;
  error: string | null;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (emailOrUsername, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await blogApi.login(emailOrUsername, password);
      localStorage.setItem('auth_token', data.token);
      set({ user: data.user, isLoading: false });
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      set({ 
        error: error.response?.data?.error || error.message || 'Server connection failed',
        isLoading: false 
      });
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({ user: null });
  }
}));