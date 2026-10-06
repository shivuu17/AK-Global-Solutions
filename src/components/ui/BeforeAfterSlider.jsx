import React, { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Interactive Before / After Image Split Slider
 * High-performance mouse and touch dragging for property transformations
 */

export const BeforeAfterSlider = ({
  beforeImage = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  afterImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  caption = "Victorian Living Space Transformation",
  className = ""
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={`w-full select-none ${className}`}>
      {/* Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[480px] md:h-[560px] rounded-[6px] overflow-hidden border border-[#D9D9D4] cursor-ew-resize bg-[#EEEEEB] shadow-sm"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* AFTER Image (Full Background) */}
        <img 
          src={afterImage} 
          alt="After renovation transformation" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* AFTER Label */}
        <div className="absolute top-4 right-4 z-10 bg-[#111111]/85 text-[#F7F7F5] text-xs font-mono tracking-widest px-3 py-1.5 rounded-[2px] uppercase backdrop-blur-xs">
          {afterLabel}
        </div>

        {/* BEFORE Image (Clipped overlay) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Before renovation condition" 
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
            loading="lazy"
          />
          {/* BEFORE Label */}
          <div className="absolute top-4 left-4 z-10 bg-[#111111]/85 text-[#F7F7F5] text-xs font-mono tracking-widest px-3 py-1.5 rounded-[2px] uppercase backdrop-blur-xs">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Line & Drag Handle */}
        <div 
          className="absolute top-0 bottom-0 z-20 w-[2px] bg-[#F7F7F5] shadow-lg pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#111111] border-2 border-[#F7F7F5] rounded-full flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-[#F7F7F5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3l3 3m8-6l3 3l-3 3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption footer */}
      {caption && (
        <div className="flex items-center justify-between mt-3 text-xs font-mono text-[#6B6B67] px-1">
          <span>{caption}</span>
          <span className="hidden sm:inline">DRAG DIVIDER TO COMPARE</span>
        </div>
      )}
    </div>
  );
};
