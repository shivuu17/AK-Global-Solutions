import React, { useEffect, useState } from 'react';
import { COMPANY_INFO } from '../../data/company';

/**
 * Initial Architectural Full-Screen Loader
 * Fades out smoothly once page assets and DOM are mounted
 */
export const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 500); // match CSS fade transition duration
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#111111] text-[#F7F7F5] p-8 sm:p-12 transition-opacity duration-500 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Architectural Grid Overlay */}
      <div className="absolute inset-0 architectural-grid-bg opacity-15 pointer-events-none"></div>

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#D9D9D4]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D85B3F] animate-pulse"></span>
          <span className="uppercase tracking-widest">AK GLOBAL SOLUTIONS</span>
        </div>
        <span className="uppercase tracking-wider hidden sm:block">NOIDA (UP) &bull; INDIA</span>
      </div>

      {/* Center Brand Identity & Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
        <div className="p-3 bg-[#F7F7F5] rounded-[6px] shadow-2xl mb-6 transform transition-transform duration-500 hover:scale-105">
          <img
            src={COMPANY_INFO.logoUrl}
            alt="AK Global Solutions Logo"
            className="h-14 sm:h-20 w-auto object-contain"
          />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display uppercase text-[#F7F7F5] mb-2">
          AK Global Solutions
        </h1>

        <p className="text-sm sm:text-base font-serif italic text-[#D85B3F] max-w-md mb-8">
          "{COMPANY_INFO.tagline}"
        </p>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs sm:max-w-sm space-y-2">
          <div className="w-full h-[3px] bg-[#262626] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D85B3F] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-[#6B6B67]">
            <span>LOADING ARCHITECTURE</span>
            <span className="text-[#D85B3F] font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Ticker */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#6B6B67] border-t border-[#262626] pt-4">
        <span>REAL ESTATE &bull; INTERIOR &bull; CONSTRUCTION</span>
        <span>2026 EDITION</span>
      </div>
    </div>
  );
};
