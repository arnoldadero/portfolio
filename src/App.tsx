import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBlog from './pages/admin/AdminBlog';
import AdminProjects from './pages/admin/AdminProjects';
import AdminSkills from './pages/admin/AdminSkills';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter
      future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="login" element={<Login />} />
              </Route>

              {/* Protected admin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="skills" element={<AdminSkills />} />
              </Route>
            </Routes>
          </main>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;