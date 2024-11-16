// src/components/ui/Tag.tsx

import React from 'react';

interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => (
  <span className="skill-tag">
    {label}
  </span>
);

export default Tag;