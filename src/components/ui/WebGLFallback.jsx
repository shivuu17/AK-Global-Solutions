import React, { useState, useEffect } from 'react';

/**
 * Clean WebGL Fallback / Static Architectural Blueprint View
 * Displays a minimal 3D isometric house blueprint with gentle mouse parallax effect
 */

export const WebGLFallback = ({ label = "01 / FEATURED SPACE", subtitle = "Architectural Model Preview" }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] bg-[#EEEEEB] border border-[#D9D9D4] rounded-[6px] overflow-hidden flex flex-col justify-between p-6 select-none shadow-sm">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid-fine opacity-60"></div>

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs uppercase tracking-architectural font-mono text-[#111111] bg-[#F7F7F5] px-3 py-1 border border-[#D9D9D4] rounded-[2px]">
          {label}
        </span>
        <span className="text-[11px] text-[#6B6B67] uppercase tracking-wider font-mono">
          MODEL / RESIDENTIAL STRUCTURE
        </span>
      </div>

      {/* Isometric Vector Structure Visualizer */}
      <div 
        className="relative z-10 flex-1 flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${15 + mousePos.y * 0.3}deg) rotateY(${-25 + mousePos.x * 0.3}deg)`
        }}
      >
        <svg className="w-64 h-64 sm:w-80 sm:h-80 drop-shadow-md text-[#111111]" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base slab */}
          <polygon points="200,340 340,260 200,180 60,260" fill="#E2E2DE" stroke="#111111" strokeWidth="2" />
          
          {/* Main structure walls */}
          <polygon points="60,260 200,340 200,200 60,120" fill="#F7F7F5" stroke="#111111" strokeWidth="2" opacity="0.95" />
          <polygon points="200,340 340,260 340,120 200,200" fill="#E6E6E1" stroke="#111111" strokeWidth="2" opacity="0.95" />
          
          {/* Roof slab */}
          <polygon points="200,180 340,100 200,20 60,100" fill="#111111" stroke="#111111" strokeWidth="2" />
          
          {/* Interior glass window cutouts */}
          <polygon points="90,210 170,256 170,180 90,134" fill="#D85B3F" fillOpacity="0.15" stroke="#D85B3F" strokeWidth="1.5" strokeDasharray="4 2" />
          <polygon points="230,234 310,188 310,140 230,186" fill="#111111" fillOpacity="0.08" stroke="#111111" strokeWidth="1.5" />
          
          {/* Structural grid lines */}
          <line x1="200" y1="20" x2="200" y2="340" stroke="#D85B3F" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="60" y1="100" x2="340" y2="260" stroke="#111111" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
          
          {/* Column accents */}
          <rect x="194" y="200" width="12" height="140" fill="#111111" opacity="0.8" />
        </svg>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-[#D9D9D4] pt-4 text-xs font-mono text-[#6B6B67]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D85B3F] animate-pulse"></span>
          <span>INTERACTIVE VIEW</span>
        </div>
        <span>SCALE 1:50</span>
      </div>
    </div>
  );
};
