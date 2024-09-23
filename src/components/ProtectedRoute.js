import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ authedUser, children }) => {
  const location = useLocation();

  if (!authedUser) {
    // Redirect to login page, preserving the intended route
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
