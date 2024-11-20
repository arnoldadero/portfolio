import { useInfiniteQuery } from '@tanstack/react-query';
import { blogApi } from '../lib/api/blogApi';
import type { PostsResponse } from '../types';

export function useInfinitePosts() {
  return useInfiniteQuery<PostsResponse>({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await blogApi.getPosts(pageParam);
        return response.data;
      } catch {
        throw new Error('Failed to fetch posts');
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PostsResponse): number | undefined => {
      const totalPages = Math.ceil(lastPage.total / lastPage.pageSize); // Fixed property name
      const nextPage = lastPage.page + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    }
  });
}