import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, ExternalLink, Github } from 'lucide-react';
import { blogApi } from '../../lib/api';
import { Button } from '../../components/ui/Button';

export default function AdminProjects() {
  const [editing, setEditing] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  const { data: projects } = useQuery({ 
    queryKey: ['projects'], 
    queryFn: () => blogApi.getProjects() 
  });

  const createMutation = useMutation({
    mutationFn: blogApi.createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => blogApi.updateProject(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
  });

  const deleteMutation = useMutation({
    mutationFn: blogApi.deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Button onClick={() => setEditing('new')} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {editing === 'new' && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            createMutation.mutate({
              title: formData.get('title') as string,
              description: formData.get('description') as string,
              github: formData.get('github') as string,
              demo: formData.get('demo') as string,
            });
            setEditing(null);
          }}>
            <div className="space-y-4">
              <input name="title" placeholder="Project Title" className="w-full p-2 border rounded" />
              <textarea name="description" placeholder="Description" className="w-full p-2 border rounded" />
              <input name="github" placeholder="GitHub URL" className="w-full p-2 border rounded" />
              <input name="demo" placeholder="Demo URL" className="w-full p-2 border rounded" />
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {projects?.data.map((project: any) => (
          <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm">
            {editing === project.id ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateMutation.mutate({
                  id: project.id,
                  data: {
                    title: formData.get('title') as string,
                    description: formData.get('description') as string,
                    github: formData.get('github') as string,
                    demo: formData.get('demo') as string,
                  }
                });
                setEditing(null);
              }}>
                <div className="space-y-4">
                  <input name="title" defaultValue={project.title} className="w-full p-2 border rounded" />
                  <textarea name="description" defaultValue={project.description} className="w-full p-2 border rounded" />
                  <input name="github" defaultValue={project.github} className="w-full p-2 border rounded" />
                  <input name="demo" defaultValue={project.demo} className="w-full p-2 border rounded" />
                  <div className="flex gap-2">
                    <Button type="submit">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  <div className="flex gap-4">
                    <a href={project.github} className="flex items-center gap-1 text-gray-600">
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                    <a href={project.demo} className="flex items-center gap-1 text-gray-600">
                      <ExternalLink className="w-4 h-4" /> Demo
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setEditing(project.id)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-600" 
                    onClick={() => deleteMutation.mutate(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}