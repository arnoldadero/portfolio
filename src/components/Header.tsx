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

              {/* Upwork */}
              <a 
                href="https://www.upwork.com/freelancers/arnoldadero" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative p-1.5 rounded-full hover:bg-[#6FDA44]/10 transition-colors duration-200"
                aria-label="Hire me on Upwork"
              >
                <svg viewBox="0 0 32 32" className="w-5 h-5 text-[#6FDA44] transition-colors" fill="currentColor">
                  <path d="M24.75 17.542c-1.469 0-2.849-.62-4.099-1.635l.302-1.432l.01-.057c.276-1.524 1.135-4.083 3.787-4.083c1.984 0 3.599 1.615 3.599 3.599c0 1.984-1.615 3.609-3.599 3.609zm0-10.849c-3.349 0-5.948 2.188-7.01 5.797c-1.615-2.427-2.839-5.333-3.557-7.792h-3.631v9.396c0 1.865-1.516 3.38-3.38 3.38s-3.38-1.516-3.38-3.38V4.698H.161v9.396c0 3.922 3.188 7.12 7.12 7.12s7.12-3.198 7.12-7.12v-1.573c.708 1.484 1.578 2.979 2.641 4.297l-2.24 10.547h3.724l1.625-7.651c1.422 0.911 3.047 1.484 4.599 1.484c3.974 0 7.214-3.25 7.214-7.224s-3.24-7.224-7.214-7.224z"/>
                </svg>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-1 pointer-events-none whitespace-nowrap shadow-lg backdrop-blur-sm">
                  <span className="font-medium">Hire me on Upwork</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mt-1.5 border-[6px] border-transparent border-b-indigo-600"></div>
                </div>
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

              {/* Email */}
              <a 
                href="mailto:arnold@mvuvi.co.ke" 
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Email Contact"
              >
                <Mail className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
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

              {/* Upwork */}
              <a 
                href="https://www.upwork.com/freelancers/~01234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#6FDA44] hover:text-[#5fc936] transition-colors p-1.5 hover:bg-[#6FDA44]/10 rounded-full"
                aria-label="Upwork Profile"
              >
                <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
                  <path d="M24.75 17.542c-1.469 0-2.849-.62-4.099-1.635l.302-1.432l.01-.057c.276-1.524 1.135-4.083 3.787-4.083c1.984 0 3.599 1.615 3.599 3.599c0 1.984-1.615 3.609-3.599 3.609zm0-10.849c-3.349 0-5.948 2.188-7.01 5.797c-1.615-2.427-2.839-5.333-3.557-7.792h-3.631v9.396c0 1.865-1.516 3.38-3.38 3.38s-3.38-1.516-3.38-3.38V4.698H.161v9.396c0 3.922 3.188 7.12 7.12 7.12s7.12-3.198 7.12-7.12v-1.573c.708 1.484 1.578 2.979 2.641 4.297l-2.24 10.547h3.724l1.625-7.651c1.422 0.911 3.047 1.484 4.599 1.484c3.974 0 7.214-3.25 7.214-7.224s-3.24-7.224-7.214-7.224z"/>
                </svg>
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