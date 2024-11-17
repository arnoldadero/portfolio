import { useInfiniteQuery } from '@tanstack/react-query';
import { Post } from '../types/blog';

interface PostsResponse {
  data: Post[];
  nextPage: number | null;
}

export const useInfinitePosts = () => {
  return useInfiniteQuery<PostsResponse>({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/posts?page=${pageParam}`);
      return response.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};