import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectForm } from '../components/ProjectForm';
import { projectApi } from '../api/projects';
import { CreateProjectInput } from '../types/project';

export const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: CreateProjectInput) => {
    setIsLoading(true);
    setError(null);
    try {
      await projectApi.create(values);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Project</h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};