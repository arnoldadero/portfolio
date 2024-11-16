export interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: {
        name: string;
    };
    slug: string;
    excerpt: string;
    tags: string[];
    socialLinks: {
        facebook?: string;
        linkedin?: string;
    };
}

export interface PostsResponse {
    data: Post[];
    nextCursor?: string;
}