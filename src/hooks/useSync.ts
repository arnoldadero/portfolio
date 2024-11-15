
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useSync(queryKey: string[], invalidateCallback?: () => void) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey });
      invalidateCallback?.();
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(interval);
  }, [queryKey, queryClient, invalidateCallback]);
}