import React from 'react';

/**
 * Reusable Site Container Component
 * Enforces maximum width (1380px) and responsive horizontal padding
 */

export const Container = ({ children, className = "" }) => {
  return (
    <div className={`max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
};
