import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, Terminal, Menu, X } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? 'bg-white/90 shadow-sm backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Terminal className={`w-6 h-6 transition-colors duration-300 
              ${isScrolled ? 'text-indigo-600' : 'text-gray-900'}`} />
            <span className="font-semibold text-gray-900">Arnold Adero</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <>
                <a href="#about" className="nav-link">About</a>
                <a href="#skills" className="nav-link">Skills</a>
                <a href="#projects" className="nav-link">Projects</a>
              </>
            ) : (
              <Link to="/" className="nav-link">Home</Link>
            )}
            
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button onClick={logout} className="nav-link">Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}

            <div className="flex items-center gap-4 ml-6">
              <a href="https://github.com/arnoldadero" className="nav-link">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/arnold-adero-49607955" className="nav-link">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:arnold@mvuvi.co.ke" className="nav-link">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden
          ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col gap-4 py-4">
            {isHomePage ? (
              <>
                <a href="#about" className="nav-link">About</a>
                <a href="#skills" className="nav-link">Skills</a>
                <a href="#projects" className="nav-link">Projects</a>
              </>
            ) : (
              <Link to="/" className="nav-link">Home</Link>
            )}

            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button onClick={logout} className="nav-link">Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}