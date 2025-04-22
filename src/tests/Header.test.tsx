import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../components/Header';
import { useAuthStore } from '../lib/stores/authStore';

// Mock the auth store
vi.mock('../lib/stores/authStore', () => ({
  useAuthStore: vi.fn()
}));

// Mock window scroll events
const mockScroll = () => {
  window.scrollY = 100;
  window.dispatchEvent(new Event('scroll'));
};

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    // Reset window scroll position
    window.scrollY = 0;
    // Reset auth store mock
    vi.mocked(useAuthStore).mockReturnValue({
      user: null,
      logout: vi.fn()
    });
  });

  test('renders header with logo and brand name', () => {
    renderHeader();
    expect(screen.getByText('Mvuvi')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /mvuvi/i })).toHaveAttribute('href', '/');
  });

  test('changes background on scroll', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('bg-white/95');
    
    mockScroll();
    expect(header).toHaveClass('bg-white/95');
  });

  test('shows login button with correct styling', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      user: null,
      logout: vi.fn()
    });
    
    renderHeader();
    const loginButton = screen.getByRole('link', { name: /sign in/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveClass('bg-gradient-to-r');
    expect(loginButton).toHaveClass('from-indigo-600');
    expect(loginButton).toHaveClass('to-purple-600');
  });

  test('renders social links in correct order with proper tooltips', () => {
    renderHeader();
    
    const socialLinks = screen.getAllByRole('link', { 
      name: /(GitHub|Upwork|LinkedIn|Email)/i 
    });
    
    // Check order
    expect(socialLinks[0]).toHaveAccessibleName('GitHub Profile');
    expect(socialLinks[1]).toHaveAccessibleName('Hire me on Upwork');
    expect(socialLinks[2]).toHaveAccessibleName('LinkedIn Profile');
    expect(socialLinks[3]).toHaveAccessibleName('Email Contact');
    
    // Check tooltips
    const tooltips = document.querySelectorAll('[class*="absolute bottom-full"]');
    expect(tooltips).toHaveLength(4);
    expect(tooltips[0].textContent).toContain('GitHub Profile');
    expect(tooltips[1].textContent).toContain('Hire me on Upwork');
    expect(tooltips[2].textContent).toContain('LinkedIn Profile');
    expect(tooltips[3].textContent).toContain('Email Me');
  });

  test('shows admin and logout options for logged-in users', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      user: { id: 1, email: 'test@example.com' },
      logout: vi.fn()
    });
    
    renderHeader();
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('toggles mobile menu', () => {
    renderHeader();
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toHaveClass('opacity-100');
    
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    fireEvent.click(closeButton);
    expect(screen.getByRole('navigation')).toHaveClass('opacity-0');
  });

  test('shows navigation links on homepage', () => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useLocation: () => ({ pathname: '/' })
      };
    });
    
    renderHeader();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /skills/i })).toHaveAttribute('href', '#skills');
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects');
  });
});