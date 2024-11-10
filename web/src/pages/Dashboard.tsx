import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Project } from '../types/project';
import { projectApi } from '../api/projects';
import { ProjectCard } from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import { ProjectFilters } from '../components/ProjectFilters';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'title' | 'createdAt'>('title');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectApi.getAll();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    navigate(`/projects/edit/${project.id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectApi.delete(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortField === 'title') {
          return a.title.localeCompare(b.title);
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [projects, searchTerm, sortField]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => navigate('/projects/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Project
        </button>
      </div>

      <ProjectFilters
        onSearch={setSearchTerm}
        onSortChange={setSortField}
        sortField={sortField}
      />

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          {searchTerm ? 'No matching projects found' : 'No projects yet'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};