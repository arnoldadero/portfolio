import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectForm } from '../components/ProjectForm';
import { projectApi } from '../api/projects';
import { CreateProjectInput, Project } from '../types/project';

export const EditProject: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                if (!id) return;
                const data = await projectApi.getById(parseInt(id));
                setProject(data);
            } catch (err) {
                setError('Failed to fetch project');
            }
        };
        fetchProject();
    }, [id]);

    const handleSubmit = async (values: CreateProjectInput) => {
        setIsLoading(true);
        setError(null);
        try {
            if (!id) throw new Error('Project ID is required');
            await projectApi.update(parseInt(id), values);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to update project');
        } finally {
            setIsLoading(false);
        }
    };

    if (!project && !error) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Edit Project</h1>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <ProjectForm
                initialValues={project}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
};