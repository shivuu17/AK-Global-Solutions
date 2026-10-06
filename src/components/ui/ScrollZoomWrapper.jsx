import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollZoomWrapper Component
 * Automatically zooms in items one-by-one as the user scrolls past them on mobile/desktop.
 * Uses IntersectionObserver for high performance smooth scaling.
 */
export const ScrollZoomWrapper = ({ children, className = '', scaleAmount = 1.04 }) => {
  const elementRef = useRef(null);
  const [isInFocus, setIsInFocus] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger focus state when element is near middle of viewport
          if (entry.isIntersecting) {
            setIsInFocus(true);
          } else {
            setIsInFocus(false);
          }
        });
      },
      {
        // Root margin triggers focus near viewport center
        rootMargin: '-20% 0px -25% 0px',
        threshold: 0.35,
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out transform-gpu ${
        isInFocus 
          ? 'scale-[1.03] sm:scale-100 shadow-xl border-[#111111] z-10' 
          : 'scale-[0.97] sm:scale-100 opacity-90 border-transparent z-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};
