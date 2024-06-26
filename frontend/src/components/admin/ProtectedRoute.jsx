import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from './authService';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = authService.getCurrentUser();

  return currentUser ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
