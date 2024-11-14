
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Code2, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function AdminLayout() {
  const location = useLocation();
  const { logout } = useAuthStore();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/blog', icon: FileText, label: 'Blog Posts' },
    { path: '/admin/projects', icon: Briefcase, label: 'Projects' },
    { path: '/admin/skills', icon: Code2, label: 'Skills' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 h-full w-64 bg-white border-r shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        </div>
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${location.pathname === item.path 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
                text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}