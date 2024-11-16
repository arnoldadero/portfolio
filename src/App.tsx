import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './containers/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

const Blog = lazy(() => import('./containers/Blog'));
const BlogPost = lazy(() => import('./containers/BlogPost'));

/* Key Components:
1. Uses React Query for data fetching and caching
2. Implements lazy loading for Blog and BlogPost components
3. Sets up protected and public routes
4. Uses Suspense for loading states
*/

// QueryClient configuration - minimizes unnecessary refetches
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,                    // Only retry failed requests once
      refetchOnWindowFocus: false, // Prevent refetching when window regains focus
    },
  },
});

// Main application structure
// - Wraps everything in QueryClientProvider for data management
// - Uses Suspense for handling lazy-loaded components
// - Implements a responsive layout with Tailwind CSS
// - Routes are organized into public and protected sections

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </main>
          </div>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;