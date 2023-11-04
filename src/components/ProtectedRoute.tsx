import React, { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../AppContext'; // Import your AppContext here
import { useQuery } from 'react-query';
import { useCookies } from 'react-cookie';
import { validateToken } from '../api';
import { LoadingSpinner } from './Loading';

interface validateMessage {
  status: string;
  message: string;
}

interface CookieProps {
  yenn_token?: string;
}

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, setIsLoggedIn } = useAppContext(); // Get the isLoggedIn value from your context
  const location = useLocation();
  const [cookies] = useCookies<keyof CookieProps>(['yenn_token']);
  const token = cookies.yenn_token;

  const {
    isLoading: isValidateLoading,
    error: validateError,
    data: validateData,
    refetch,
  } = useQuery<validateMessage>(
    ['validate', isLoggedIn, cookies],
    () => {
      if (typeof token === 'string') return validateToken(token);
      return Promise.reject(new Error('No token available for validation'));
    },
    {
      onSuccess: (data) => {
        setIsLoggedIn(data.status === 'success');
      },
      onError: (e) => {
        alert(e.detail);
      },
      refetchOnWindowFocus: false, // Disable automatic refetch on window focus
    },
  );

  useEffect(() => {
    if (!isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn]);

  if (isValidateLoading) {
    return <LoadingSpinner />;
  }
  if (!isLoggedIn) {
    // Redirect to /login if not logged in after token validation
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
