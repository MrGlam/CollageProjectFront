// AuthRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../utils/authContext';

const AuthRoute = ({ element, isAuthenticated, ...rest }) => {
  return <AuthProvider>
    {console.log(isAuthenticated)}
    {isAuthenticated ? <Route element={element} {...rest} /> : <Navigate to="/login" /> }
  </AuthProvider>
  return 
};

export default AuthRoute;
