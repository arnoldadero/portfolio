import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './routes';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};