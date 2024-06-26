import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

const PublicRoute = ({ children }) => {
  const currentUser = authService.getCurrentUser();

  return !currentUser ? children : <Navigate to="/home" />;
};

export default PublicRoute;
