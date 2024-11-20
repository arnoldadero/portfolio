import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { blogApi } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: typeof formData) => {
      const response = await blogApi.login(username, password);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', `Bearer ${data.token}`);
      toast.success('Welcome back, admin!');
      navigate('/admin', { replace: true });
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Invalid credentials');
      localStorage.removeItem('auth_token');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex justify-center">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="mt-4 text-center text-3xl font-bold text-white">
              Admin Portal
            </h2>
            <p className="mt-2 text-center text-sm text-white/80">
              Secure access for administrators only
            </p>
          </div>

          {/* Form Section */}
          <div className="px-8 py-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-1">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm transition-colors duration-200"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:z-10 sm:text-sm transition-colors duration-200"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
                  disabled={loginMutation.isPending}
                  isLoading={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Signing in...' : 'Sign in to Admin Panel'}
                </Button>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center">
              <a
                href="/"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                ← Return to main site
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
