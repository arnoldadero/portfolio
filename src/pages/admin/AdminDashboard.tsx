
import { useQuery } from '@tanstack/react-query';
import { FileText, Briefcase, Code2 } from 'lucide-react';
import { blogApi } from '../../lib/api';

export default function AdminDashboard() {
  const { data: posts } = useQuery({ queryKey: ['posts'], queryFn: () => blogApi.getPosts() });
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: () => blogApi.getProjects() });
  const { data: skills } = useQuery({ queryKey: ['skills'], queryFn: () => blogApi.getSkills() });

  const stats = [
    { label: 'Blog Posts', value: posts?.data.length || 0, icon: FileText },
    { label: 'Projects', value: projects?.data.length || 0, icon: Briefcase },
    { label: 'Skills', value: skills?.data.length || 0, icon: Code2 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <stat.icon className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}