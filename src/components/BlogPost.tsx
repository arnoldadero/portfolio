// src/components/BlogPost.tsx
import React from 'react';
import { Post } from '../types/blog';

interface BlogPostProps {
    post: Post;
}

export const BlogPost = ({ post }: BlogPostProps) => (
    <article className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="mt-2">{post.excerpt}</p>
    </article>
);