// src/components/Header.test.tsx
import React from 'react';
import { test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from './Header';
import { useAuthStore } from '../stores/authStore';

// Mock the auth store
vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn()
}));

// Mock window scroll events
const mockScroll = () => {
  window.scrollY = 100;
  window.dispatchEvent(new Event('scroll'));
};

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

test('renders header with logo', () => {
  renderHeader();
  expect(screen.getByText('Mvuvi')).toBeInTheDocument();
});

test('changes background on scroll', () => {
  renderHeader();
  const header = screen.getByRole('banner');
  expect(header).not.toHaveClass('bg-white/90');
  
  mockScroll();
  expect(header).toHaveClass('bg-white/90');
});

test('shows correct navigation for logged-out users', () => {
  vi.mocked(useAuthStore).mockReturnValue({
    user: null,
    logout: vi.fn()
  });
  
  renderHeader();
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Register')).toBeInTheDocument();
});

test('shows correct navigation for logged-in users', () => {
  vi.mocked(useAuthStore).mockReturnValue({
    user: { id: 1, email: 'test@example.com' },
    logout: vi.fn()
  });
  
  renderHeader();
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
});

test('toggles mobile menu', () => {
  renderHeader();
  const menuButton = screen.getByRole('button');
  
  fireEvent.click(menuButton);
  expect(screen.getByRole('navigation')).toHaveClass('opacity-100');
  
  fireEvent.click(menuButton);
  expect(screen.getByRole('navigation')).toHaveClass('opacity-0');
});

test('renders social media links', () => {
  renderHeader();
  expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/arnoldadero');
  expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/arnold-adero-49607955');
  expect(screen.getByRole('link', { name: /mail/i })).toHaveAttribute('href', 'mailto:arnold@mvuvi.co.ke');
});

test('shows home page specific navigation', () => {
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useLocation: () => ({ pathname: '/' })
    };
  });
  
  renderHeader();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Skills')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
});