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
      if (!data.user.isAdmin) {
        throw new Error('Unauthorized access');
      }
      localStorage.setItem('auth_token', data.token);
      set({ user: data.user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Invalid credentials', 
        isLoading: false 
      });
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({ user: null });
  }
}));