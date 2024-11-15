
export interface ValidationError {
  field: string;
  message: string;
}

export function validateSkill(data: { name: string; level: number }): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (!data.name?.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  
  if (data.level < 0 || data.level > 100) {
    errors.push({ field: 'level', message: 'Level must be between 0 and 100' });
  }

  return errors;
}

export function validateProject(data: { title: string; description: string; tech: string[] }): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (!data.title?.trim()) {
    errors.push({ field: 'title', message: 'Title is required' });
  }
  
  if (!data.description?.trim()) {
    errors.push({ field: 'description', message: 'Description is required' });
  }

  if (!data.tech?.length) {
    errors.push({ field: 'tech', message: 'At least one technology is required' });
  }

  return errors;
}