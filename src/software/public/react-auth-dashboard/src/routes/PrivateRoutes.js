// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Se o usuário não estiver autenticado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  // Se o usuário estiver autenticado, renderize o componente filho
  return children;
};

export default ProtectedRoute;