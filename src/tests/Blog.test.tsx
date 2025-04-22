// src/containers/Blog.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Blog from '../containers/Blog';

const queryClient = new QueryClient();

test('renders Blog container', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Blog />
    </QueryClientProvider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  // Add more assertions based on the expected behavior
});