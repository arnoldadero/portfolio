// src/tests/login.test.tsx

import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../pages/Login';

test('should log in the user successfully', async () => {
  render(<Login />);
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText('Login'));

  // Add assertions to verify successful login
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});