
import { useQuery } from '@tanstack/react-query';
import { FileText, Briefcase, Code2 } from 'lucide-react';
import { blogApi } from '../../lib/api';

/**
 * AdminDashboard component fetches and displays posts, projects, and skills data.
 * It uses the react-query library to fetch data from the blogApi.
 * The data is then displayed in a grid layout with statistics.
 */
export default function AdminDashboard() {
  const fetchDashboardData = async () => {
    try {
      const [posts, projects, skills] = await Promise.all([
        blogApi.getPosts(),
        blogApi.getProjects(),
        blogApi.getSkills()
      ]);
      return {
        posts: posts.data,
        projects: projects.data,
        skills: skills.data
      };
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      return { posts: [], projects: [], skills: [] };
    }
  };

  const { data } = useQuery({ queryKey: ['dashboardData'], queryFn: fetchDashboardData });

  const stats = [
    { label: 'Total Posts', value: data?.posts?.length ?? 0, icon: FileText },
    { label: 'Total Projects', value: data?.projects?.length ?? 0, icon: Briefcase },
    { label: 'Total Skills', value: data?.skills?.length ?? 0, icon: Code2 }
  ];

  const cardClass = "bg-white p-6 rounded-xl shadow-sm";
  const iconClass = "w-8 h-8 text-indigo-600";
  const labelClass = "text-sm text-gray-600";
  const valueClass = "text-2xl font-bold text-gray-900";

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className={cardClass}>
            <div className="flex items-center gap-4">
              <Icon className={iconClass} />
              <div>
                <p className={labelClass}>{label}</p>
                <p className={valueClass}>{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}