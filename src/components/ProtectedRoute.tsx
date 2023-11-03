import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext'; // Import your AppContext here

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext(); // Get the isLoggedIn value from your context
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
