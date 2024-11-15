
import { useState, useCallback } from 'react';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useToast(duration = 3000) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: ToastState['type']) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  }, [duration]);

  return {
    toast,
    showToast,
    hideToast: () => setToast(null)
  };
}