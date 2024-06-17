/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Component is wrapped around protected routes
function PrivateRoute({ children }) {
  // Get the state from the auth context
  const { isLoggedIn } = useContext(AuthContext);

  // If the user is logged in, render children components, otherwise -> sends to the Home page
  return (isLoggedIn && children) || <Navigate to="/" />;
}

export default PrivateRoute;
