
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { blogApi } from '../../lib/api';
import { Button } from '../../components/ui/Button';

export default function AdminSkills() {
  const [editing, setEditing] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: skills } = useQuery({ queryKey: ['skills'], queryFn: () => blogApi.getSkills() });

  const createMutation = useMutation({
    mutationFn: blogApi.createSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => blogApi.updateSkill(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] })
  });

  const deleteMutation = useMutation({
    mutationFn: blogApi.deleteSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] })
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Skills</h1>
        <Button onClick={() => setEditing('new')} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Skill
        </Button>
      </div>

      {editing === 'new' && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            createMutation.mutate({
              name: formData.get('name') as string,
              description: formData.get('description') as string,
            });
            setEditing(null);
          }}>
            <div className="space-y-4">
              <input name="name" placeholder="Skill Name" className="w-full p-2 border rounded" />
              <textarea name="description" placeholder="Description" className="w-full p-2 border rounded" />
              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {skills?.data.map((skill: any) => (
          <div key={skill.id} className="bg-white p-6 rounded-xl shadow-sm">
            {editing === skill.id ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateMutation.mutate({
                  id: skill.id,
                  data: {
                    name: formData.get('name') as string,
                    description: formData.get('description') as string,
                  }
                });
                setEditing(null);
              }}>
                <div className="space-y-4">
                  <input name="name" defaultValue={skill.name} className="w-full p-2 border rounded" />
                  <textarea name="description" defaultValue={skill.description} className="w-full p-2 border rounded" />
                  <div className="flex gap-2">
                    <Button type="submit">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                  </div>
                </div>
              </form>
            ) : (
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                <p className="text-gray-600">{skill.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditing(skill.id)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-600" 
                  onClick={() => deleteMutation.mutate(skill.id)}
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