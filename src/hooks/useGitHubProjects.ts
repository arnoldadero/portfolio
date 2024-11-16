// src/hooks/useGitHubProjects.ts
import { useQuery } from '@tanstack/react-query';

export const useGitHubProjects = (username: string) => {
  // Use import.meta.env instead of process.env for Vite
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  return useQuery({
    queryKey: ['github-projects', username],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      return response.json();
    },
    retry: 2,
  });
};