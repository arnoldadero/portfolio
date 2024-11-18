import { useInfiniteQuery } from '@tanstack/react-query';
import type { PostsResponse } from '../types';

export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/posts?page=${pageParam}`);
      return response.json() as Promise<PostsResponse>;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}