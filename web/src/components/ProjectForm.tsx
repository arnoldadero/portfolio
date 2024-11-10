import React, { useState } from 'react';
import { CreateProjectInput, Project } from '../types/project';

interface ProjectFormProps {
  initialValues?: Project;
  onSubmit: (values: CreateProjectInput) => Promise<void>;
  isLoading?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialValues,
  onSubmit,
  isLoading = false,
}) => {
  const [values, setValues] = useState<CreateProjectInput>({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    imageUrl: initialValues?.imageUrl || '',
    liveUrl: initialValues?.liveUrl || '',
    githubUrl: initialValues?.githubUrl || '',
    techStack: initialValues?.techStack || ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateProjectInput, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateProjectInput, string>> = {};
    
    if (!values.title) newErrors.title = 'Title is required';
    if (!values.description) newErrors.description = 'Description is required';
    if (!values.techStack) newErrors.techStack = 'Tech stack is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreateProjectInput]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } shadow-sm`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } shadow-sm`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">
          Tech Stack *
        </label>
        <input
          type="text"
          id="techStack"
          name="techStack"
          value={values.techStack}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md ${
            errors.techStack ? 'border-red-500' : 'border-gray-300'
          } shadow-sm`}
        />
        {errors.techStack && (
          <p className="text-red-500 text-sm mt-1">{errors.techStack}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={values.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">
            Live URL
          </label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            value={values.liveUrl}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
          GitHub URL
        </label>
        <input
          type="url"
          id="githubUrl"
          name="githubUrl"
          value={values.githubUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white ${
            isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Saving...' : initialValues ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};