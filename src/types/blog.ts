export interface Post {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    createdAt: string;
    slug: string;
}

export interface PostsResponse {
    data: Post[];
    nextCursor?: string;
}