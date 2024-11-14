import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Mail, User } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    await registerUser(data.name, data.email, data.password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  className="block w-full rounded-lg border pl-10 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  className="block w-full rounded-lg border pl-10 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  className="block w-full rounded-lg border pl-10 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
}