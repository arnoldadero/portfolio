
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ 
  children, 
  className = '', 
  isLoading, 
  disabled,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50 ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};