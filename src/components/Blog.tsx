import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfinitePosts } from '../hooks/useInfinitePosts';
import { BlogPost } from './BlogPost';
import { LoadingSpinner } from './LoadingSpinner';
import { Post } from '../types/blog';

export const Blog = () => {
    const { ref, inView } = useInView();
    const { 
        data, 
        fetchNextPage, 
        hasNextPage, 
        isLoading, 
        isFetchingNextPage 
    } = useInfinitePosts() as {
        data?: { pages: Post[][] };
        fetchNextPage: () => void;
        hasNextPage: boolean;
        isLoading: boolean;
        isFetchingNextPage: boolean;
    };

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {data?.pages.map((page, pageIndex) => (
                        <div key={pageIndex} className="space-y-8">
                            {page.map((post: Post) => (
                                <BlogPost key={post.id} post={post} />
                            ))}
                        </div>
                    ))}
                    <div ref={ref} className="h-10" />
                    {isFetchingNextPage && <LoadingSpinner />}
                </>
            )}
        </div>
    );
};