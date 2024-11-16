
import { useState } from 'react';
import { Button } from './Button';
import { useAuthStore } from '../stores/authStore';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
        </div>
        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}