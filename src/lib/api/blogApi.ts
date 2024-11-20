import axios from 'axios';
import type { Post, PostsResponse } from '../../types';

const BASE_URL = process.env.REACT_APP_API_URL || '';

interface PostsApiResponse {
    data: Post[];
    total: number;
    page: number;
    pageSize: number;
}

export const blogApi = {
    getPosts: async (page: number = 1, limit: number = 10): Promise<PostsResponse> => {
        const response = await axios.get<PostsApiResponse>(
            `${BASE_URL}/api/posts?page=${page}&limit=${limit}`
        );
        
        const { data, total, pageSize } = response.data;
        const totalPages = Math.ceil(total / pageSize);
        
        return {
            posts: data,
            hasMore: page < totalPages,
            nextPage: page < totalPages ? page + 1 : undefined
        };
    },
    getPost: async (slug: string) => {
        const response = await axios.get<Post>(
            `${BASE_URL}/api/posts/${slug}`
        );
        return response;
    }
};