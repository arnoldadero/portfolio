// types/blog.ts

// Interface for API response containing blog posts
export interface PostsResponse {
  posts: Post[];
  total: number;
  page: number;
  pageSize: number;
}

// Interface for individual blog post
export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  tags?: string[];
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  isPublished: boolean;
}

// Interface for post author
export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}