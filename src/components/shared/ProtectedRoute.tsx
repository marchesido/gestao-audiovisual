import React from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
