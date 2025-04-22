// src/components/ui/Tag.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import Tag from '../components/ui/Tag';

test('renders Tag component with label', () => {
  const { getByText } = render(<Tag label="React" />);
  expect(getByText('React')).toBeInTheDocument();
});
// Nothing needed here - expect is provided by Jest
