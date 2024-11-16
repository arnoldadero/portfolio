import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { blogApi } from '../api/blogApi';
import { PostsResponse } from '../types/blog';

export const useInfinitePosts = () => {
    return useInfiniteQuery<PostsResponse, Error, InfiniteData<PostsResponse>, string[], number>({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1 }) => blogApi.getPosts(pageParam),
        getNextPageParam: (lastPage) => lastPage.nextCursor ? Number(lastPage.nextCursor) : undefined,
        initialPageParam: 1
    });
};