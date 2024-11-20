// src/tests/login.test.tsx

import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../containers/Login';

// Mock react-router-dom's useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Login Component', () => {
  const renderLogin = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test('renders admin login page with correct elements', () => {
    renderLogin();
    
    // Check for admin-specific elements
    expect(screen.getByText('Admin Portal')).toBeInTheDocument();
    expect(screen.getByText('Secure access for administrators only')).toBeInTheDocument();
    
    // Check for form elements
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign in to Admin Panel')).toBeInTheDocument();
    expect(screen.getByText('← Return to main site')).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    renderLogin();
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(usernameInput).toHaveValue('admin');
    expect(passwordInput).toHaveValue('password123');
  });

  test('handles form submission', async () => {
    renderLogin();
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in to Admin Panel');
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    // Check if button shows loading state
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
    });
  });

  test('shows return to main site link', () => {
    renderLogin();
    
    const returnLink = screen.getByText('← Return to main site');
    expect(returnLink).toHaveAttribute('href', '/');
  });

  test('displays proper placeholder text', () => {
    renderLogin();
    
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });
});