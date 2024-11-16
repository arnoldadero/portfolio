import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, Mail } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/Button';
import { useState } from 'react';

interface LoginForm {
  email: string; // Changed from emailOrUsername to match AuthStore interface
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      setLoginError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {loginError && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {loginError}
            </div>
          )}

          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  name="email"
                  className="block w-full rounded-lg border pl-10 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Email"
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
                  name="password"
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
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}