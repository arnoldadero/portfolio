import { useState, useEffect } from 'react';

type Skill = {
  id: string;
  name: string;
  level: number;
  category?: string;
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { blogApi } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { AdminContent } from '../../components/AdminContent';
import { validateSkill } from '../../lib/validations';
import { FormField } from '../../components/ui/FormField';
import { useSorting } from '../../hooks/useSorting';
import { SortableHeader } from '../../components/ui/SortableHeader';
import { useToast } from '../../hooks/useToast';

export default function AdminSkills() {
  const [editing, setEditing] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { data: skills, isLoading, error } = useQuery({ 
    queryKey: ['skills'], 
    queryFn: () => blogApi.getSkills() 
  });

  const createMutation = useMutation({
    mutationFn: blogApi.createSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Skill> }) => 
        blogApi.updateSkill(id, {
          name: data.name || '',
          level: data.level || 0
        }),
    onMutate: async ({ id, data }) => {
        await queryClient.cancelQueries({ queryKey: ['skills'] });
        const previousSkills = queryClient.getQueryData(['skills']);
        
        queryClient.setQueryData(['skills'], (old: { data: Skill[] }) => ({
            ...old,
            data: old.data.map((skill: Skill) => 
                skill.id === id ? { ...skill, ...data } : skill
            )
        }));

        return { previousSkills };
    },
    onError: (_err, _variables, context) => {
        if (context?.previousSkills) {
            queryClient.setQueryData(['skills'], context.previousSkills);
        }
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['skills'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: blogApi.deleteSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] })
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data: searchResults } = useQuery({
    queryKey: ['skills', 'search', searchQuery],
    queryFn: () => blogApi.searchSkills(searchQuery),
    enabled: searchQuery.length > 2
  });

  // Use search results if available, otherwise use regular skills
  const displayedSkills = searchQuery.length > 2 ? searchResults?.data : skills?.data;

  const batchUpdateMutation = useMutation({
    mutationFn: blogApi.batchUpdateSkills,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      setSelectedItems([]);
    }
  });

  const handleBatchUpdate = (data: { level: number }) => {
    const skillsToUpdate = selectedItems.map(id => {
      const skill = skills?.data?.data.find((s: Skill) => s.id === id);
      return {
        id,
        data: {
          name: skill?.name || '',
          level: data.level
        }
      };
    });
    batchUpdateMutation.mutate(skillsToUpdate);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      level: parseInt(formData.get('level') as string, 10)
    };

    const errors = validateSkill(data);
    if (errors.length > 0) {
      errors.forEach(error => {
        showToast(error.message, 'error');
      });
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: editing as string,
        data
      });
      showToast('Skill updated successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update skill';
      showToast(errorMessage, 'error');
    }
    setEditing(null);
  };

  const { items: sortedSkills, sortConfig, requestSort } = useSorting<Skill>(
    (displayedSkills || []) as Skill[],
    { key: 'name', direction: 'asc' }
  );

  const handleFieldChange = (field: string, value: string | number) => {
    // Update the skills data directly through the mutation
    if (editing) {
      updateMutation.mutate({
        id: editing,
        data: { [field]: value }
      });
    }
  };

  const handleCreateSkill = () => {
    const newSkill = {
      name: 'New Skill',
      level: 0,
      category: 'Other'
    };
    
    try {
      createMutation.mutate(newSkill);
      showToast('Skill created successfully', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create skill';
      showToast(errorMessage, 'error');
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        handleCreateSkill();
      }
      if (e.key === 'Escape') {
        setEditing(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button onClick={handleCreateSkill} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Skill <kbd className="ml-2 text-xs">⌘N</kbd>
          </Button>
          {selectedItems.length > 0 && (
            <Button onClick={() => handleBatchUpdate({ level: 80 })}>
              Update Selected ({selectedItems.length})
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input w-64"
          />
          <div className="flex gap-2">
            <SortableHeader
              label="Name"
              sortKey="name"
              currentSort={sortConfig}
              onSort={requestSort}
            />
            <SortableHeader
              label="Level"
              sortKey="level"
              currentSort={sortConfig}
              onSort={requestSort}
            />
          </div>
        </div>
      </div>
      <AdminContent
        data={sortedSkills}
        queryKey={['skills']}
        isLoading={isLoading}
        error={error as Error}
        onSelect={(id) => setSelectedItems(prev => 
          prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )}
        selectedItems={selectedItems}
        renderItem={(skill: Skill) => (
          <div key={skill.id} className="bg-white p-6 rounded-xl shadow-sm">
            {editing === skill.id ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <FormField
                    label="Skill Name"
                    name="name"
                    value={skill.name}
                    onChange={(value) => handleFieldChange('name', value)}
                  />
                  <FormField
                    label="Skill Level"
                    name="level"
                    type="number"
                    value={skill.level}
                    onChange={(value) => handleFieldChange('level', parseInt(value, 10))}
                  />
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
                <p className="text-gray-600">Level: {skill.level}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditing(skill.id)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700" // Replace styles.textRed with direct Tailwind classes
                  onClick={() => deleteMutation.mutate(skill.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}