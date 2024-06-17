/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

// Create Authentication Context to manage user's login session state
export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  curUserId: null,
  setCurUserId: () => {}
});

// Auth Context Provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [curUserId, setCurUserId] = useState(null);

  // Validate the login session
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/users/is-valid-session', {
        withCredentials: true
      })
      .then(res => {
        console.log(
          res.data.isAuth === true
            ? 'res.data.isAuth is TRUE = User Logged In'
            : 'Not Logged In'
        );
        // State updates based on the response from the server
        setIsLoggedIn(res.data.isAuth);
        setCurUserId(res.data.userId);
      })
      .catch(error => {
        console.log('Error validating session:', error);
        setIsLoggedIn(false);
        setCurUserId(null);
      });
  }, []);

  // Provide values from Auth Context to all children components
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, curUserId, setCurUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
