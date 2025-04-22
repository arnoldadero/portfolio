import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, Terminal, Menu, X } from 'lucide-react';
import { useAuthStore } from '../lib/stores/authStore';

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
      ${isScrolled 
        ? 'bg-white/95 shadow-lg shadow-black/[0.03] backdrop-blur-md border-b border-black/[0.07]' 
        : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
          >
            <Terminal className={`w-7 h-7 transition-colors duration-300 
              ${isScrolled ? 'text-indigo-600' : 'text-gray-900'}`} />
            <div className="overflow-hidden h-8">
              <span className="font-bold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-600 to-gray-900 animate-gradient-x inline-block whitespace-nowrap overflow-hidden animate-title-sequence">Mvuvi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <>
                <a href="#about" className="nav-link font-medium hover:text-indigo-600 transition-colors">About</a>
                <a href="#skills" className="nav-link font-medium hover:text-indigo-600 transition-colors">Skills</a>
                <a href="#projects" className="nav-link font-medium hover:text-indigo-600 transition-colors">Projects</a>
              </>
            ) : (
              <Link to="/" className="nav-link font-medium hover:text-indigo-600 transition-colors">Home</Link>
            )}
            
            {user ? (
              <>
                <Link to="/admin" className="nav-link font-medium hover:text-indigo-600 transition-colors">Admin</Link>
                <button 
                  onClick={logout} 
                  className="nav-link font-medium hover:text-indigo-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 rounded-full bg-white/20 blur opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
                </Link>
              </>
            )}

            <div className="flex items-center gap-6 ml-6 border-l pl-6 border-gray-200">
              {/* GitHub */}
              <a 
                href="https://github.com/arnoldadero" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/arnold-adero-49607955"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full hover:bg-[#0A66C2]/10 transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 text-[#0A66C2] transition-colors" />
              </a>

              {/* Upwork */}
              <a 
                href="https://www.upwork.com/freelancers/~01f65b6f4d8c1e7b32" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative p-1.5 rounded-full hover:bg-[#14A800]/10 transition-colors duration-200"
                aria-label="Hire me on Upwork"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#14A800] transition-colors" fill="currentColor">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                </svg>
              </a>

              {/* Email */}
              <a 
                href="mailto:arnold@mvuvi.co.ke"
                className="p-1.5 rounded-full hover:bg-[#EA4335]/10 transition-colors duration-200"
                aria-label="Email Me"
              >
                <Mail className="w-5 h-5 text-[#EA4335] transition-colors" />
              </a>
            </div>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100/50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden backdrop-blur-sm
          ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col gap-4 py-6">
            {isHomePage ? (
              <>
                <a href="#about" className="nav-link text-lg font-medium">About</a>
                <a href="#skills" className="nav-link text-lg font-medium">Skills</a>
                <a href="#projects" className="nav-link text-lg font-medium">Projects</a>
              </>
            ) : (
              <Link to="/" className="nav-link text-lg font-medium">Home</Link>
            )}

            {user ? (
              <>
                <Link to="/admin" className="nav-link text-lg font-medium">Admin</Link>
                <button onClick={logout} className="nav-link text-lg font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link text-lg font-medium">Login</Link>
              </>
            )}

            <div className="flex items-center gap-6 pt-4 border-t border-gray-200 mt-4">
              {/* GitHub */}
              <a 
                href="https://github.com/arnoldadero" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/arnold-adero-49607955" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A66C2] hover:text-[#004182] transition-colors p-1.5 hover:bg-[#0A66C2]/10 rounded-full"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>

              {/* Upwork */}
              <a 
                href="https://www.upwork.com/freelancers/~01f65b6f4d8c1e7b32" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#14A800] hover:text-[#0B8655] transition-colors p-1.5 hover:bg-[#14A800]/10 rounded-full"
                aria-label="Upwork Profile"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                </svg>
              </a>

              {/* Email */}
              <a 
                href="mailto:arnold@mvuvi.co.ke" 
                className="text-gray-700 hover:text-gray-900 transition-colors p-1.5 hover:bg-gray-100 rounded-full"
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}