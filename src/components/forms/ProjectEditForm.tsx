
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { blogApi } from '../../lib/api';
import type { Project, ProjectFormData } from '../../types';

interface ProjectEditFormProps {
  project?: Project;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProjectEditForm({ project, onSuccess, onCancel }: ProjectEditFormProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: project ? {
      ...project,
      technologies: Array.isArray(project.technologies) 
        ? project.technologies.join(', ')
        : project.technologies || '',
    } : {
      title: '',
      description: '',
      shortDescription: '',
      imageUrl: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      isVisible: true,
      category: 'other',
      priority: 0,
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: (data: ProjectFormData) => {
      const formattedData = {
        ...data,
        technologies: typeof data.technologies === 'string' 
          ? data.technologies.split(',').map(tech => tech.trim()).filter(Boolean)
          : data.technologies,
      };
      return project 
        ? blogApi.updateProject(project.id, formattedData)
        : blogApi.createProject(formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      onSuccess?.();
      onCancel?.();
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    updateProjectMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {project ? 'Edit Project' : 'Create Project'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <Input
                {...register('title', { required: 'Title is required' })}
                className="mt-1"
                error={errors.title?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Short Description</label>
              <Input
                {...register('shortDescription', { required: 'Short description is required' })}
                className="mt-1"
                error={errors.shortDescription?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Description</label>
              <Textarea
                {...register('description', { required: 'Description is required' })}
                className="mt-1"
                rows={4}
                error={errors.description?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Technologies</label>
              <Input
                {...register('technologies')}
                className="mt-1"
                placeholder="React, TypeScript, Node.js"
                error={errors.technologies?.message}
              />
              <p className="mt-1 text-sm text-gray-500">Separate technologies with commas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                <Input
                  {...register('githubUrl')}
                  className="mt-1"
                  error={errors.githubUrl?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Live URL</label>
                <Input
                  {...register('liveUrl')}
                  className="mt-1"
                  error={errors.liveUrl?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  {...register('category')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="desktop">Desktop Application</option>
                  <option value="backend">Backend</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <Input
                  type="number"
                  {...register('priority', { valueAsNumber: true })}
                  className="mt-1"
                  error={errors.priority?.message}
                />
              </div>

              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  {...register('isVisible')}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Visible on portfolio
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={updateProjectMutation.isPending}
              >
                {project ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
