import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogApi } from '../lib/api';

export default function ProjectDetails() {
    const { id } = useParams();
    const { data: project, isLoading } = useQuery({
        queryKey: ['project', id],
        queryFn: () => blogApi.getProject(id!)
    });

    if (isLoading) {
        return <div className="max-w-4xl mx-auto px-6 py-16">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold mb-6">{project?.data.name}</h1>
            <div className="prose max-w-none">
                {project?.data.description}
            </div>
        </div>
    );
}