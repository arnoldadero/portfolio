import { useEffect } from 'react';
import { useAuthStore } from '../lib/stores/authStore';
import type { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth(): AuthState {
  const { user, isLoading, error, isAuthenticated, verifyAuth } = useAuthStore();

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return {
    isAuthenticated,
    user,
    loading: isLoading,
    error
  };
}
