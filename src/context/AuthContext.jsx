import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const resetPassword = async (email) => {
    setError(null);
    return authService.resetPassword(email);
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: Boolean(user),
    isAdmin: Boolean(user && authService.isAdminUser(user)),
    login,
    logout,
    resetPassword,
    clearError: () => setError(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

