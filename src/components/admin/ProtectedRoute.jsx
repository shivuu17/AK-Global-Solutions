import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-[#F7F7F5] font-mono">
        <div className="w-12 h-12 border-2 border-[#D85B3F] border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-xs tracking-architectural uppercase text-[#D9D9D4]">
          Verifying Administrator Authorization...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

