export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    createdAt: string;
}

interface Activity {
    id: string;
    type: string;
    description: string;
    createdAt: string;
}

export const blogApi = {
    async getPosts(): Promise<{ data: Post[] }> {
        // Implement your API call here
        return { data: [] };
    },

    async getActivities(): Promise<{ data: Activity[] }> {
        // Implement your API call here
        return { data: [] };
    }
};