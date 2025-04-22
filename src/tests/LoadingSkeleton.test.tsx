// src/components/LoadingSkeleton.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import LoadingSkeleton from '../components/LoadingSkeleton';

test('renders LoadingSkeleton component', () => {
  const { container } = render(<LoadingSkeleton />);
  expect(container.firstChild).toHaveClass('animate-pulse');
});