import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './styles/index.css';

// Layout Components
import Header from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from "./components/LoadingSpinner";
import ProtectedRoute from './components/ProtectedRoute';

// Page Components
import AdminDashboard from './containers/AdminDashboard';
import Login from './containers/Login';
import Blog from './containers/Blog';
import BlogPost from './containers/BlogPost';
import Hero from './containers/Hero';
import Contact from './containers/Contact';
import Projects from './containers/Projects';
import Skills from './containers/Skills';

// Auth Components
// import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Suspense fallback={<LoadingSpinner />}>
              <main className="pt-16">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Hero />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />

                  {/* Protected Routes */}
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
            </Suspense>
          </div>
        </ErrorBoundary>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}