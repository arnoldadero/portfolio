import axios from 'axios';
import { PostsResponse } from '../types/blog';

const BASE_URL = process.env.REACT_APP_API_URL;

export const blogApi = {
    getPosts: async (page: number = 1, limit: number = 10): Promise<PostsResponse> => {
        const response = await axios.get(
            `${BASE_URL}/api/posts?page=${page}&limit=${limit}`
        );
        return response.data;
    }
};