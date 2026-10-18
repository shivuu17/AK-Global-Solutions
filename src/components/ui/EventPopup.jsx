import React, { useState, useEffect } from 'react';
import { popupService } from '../../services/popupService';
import { X, Calendar, Sparkles, ArrowRight } from 'lucide-react';

export const EventPopup = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(true);

  useEffect(() => {
    let timer;
    async function checkForEventPopups() {
      try {
        const popups = await popupService.getActivePopups();
        if (!popups || popups.length === 0) return;

        // Find highest priority popup that hasn't been dismissed
        for (const popup of popups) {
          const key = popup.dismissKey || popup.id;
          if (!popupService.isDismissed(key)) {
            setActivePopup(popup);
            // Display gracefully after initial page engagement (1.8s)
            timer = setTimeout(() => {
              setIsOpen(true);
            }, 1800);
            break;
          }
        }
      } catch (err) {
        console.warn('Failed to check active event popups:', err);
      }
    }

    checkForEventPopups();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    if (activePopup) {
      const key = activePopup.dismissKey || activePopup.id;
      if (dontShowAgain) {
        popupService.dismiss(key);
      }
    }
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    handleClose();
    if (activePopup?.ctaUrl) {
      if (activePopup.ctaUrl.startsWith('#')) {
        const target = document.querySelector(activePopup.ctaUrl);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(activePopup.ctaUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  if (!isOpen || !activePopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xl p-6 sm:p-8 text-center overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#6B6B67] hover:text-[#111111] transition-colors p-1 cursor-pointer rounded-full hover:bg-[#EEEEEB]"
          aria-label="Close event pop-up"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Optional Event Banner Photo */}
        {activePopup.image && (
          <div className="mb-6 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 h-44 sm:h-52 overflow-hidden bg-[#111111] border-b border-[#D9D9D4] relative">
            <img 
              src={activePopup.image} 
              alt={activePopup.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[11px] font-mono">
              <span className="px-2 py-0.5 bg-[#D85B3F] font-bold rounded-[2px] uppercase">
                {activePopup.subtitle || 'EVENT'}
              </span>
            </div>
          </div>
        )}

        {/* Text Header */}
        {!activePopup.image && (
          <div className="inline-flex items-center gap-1.5 p-2 bg-[#EEEEEB] text-[#D85B3F] rounded-full mb-3 text-xs font-mono font-bold">
            <Sparkles className="w-4 h-4" />
            <span>{activePopup.subtitle || 'SPECIAL EVENT'}</span>
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight mb-3 leading-tight">
          {activePopup.title}
        </h3>

        <p className="text-sm text-[#6B6B67] leading-relaxed mb-6 font-normal">
          {activePopup.message}
        </p>

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleCtaClick}
            className="w-full py-3.5 px-6 bg-[#111111] hover:bg-[#D85B3F] text-[#F7F7F5] rounded-[4px] text-xs font-mono uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>{activePopup.ctaLabel || 'Participate Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Options / Dismiss Settings */}
        <div className="mt-6 pt-4 border-t border-[#D9D9D4] flex items-center justify-center gap-2 text-[11px] font-mono text-[#6B6B67]">
          <input
            type="checkbox"
            id="popupDontShow"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className="accent-[#D85B3F] cursor-pointer"
          />
          <label htmlFor="popupDontShow" className="cursor-pointer">
            Do not show this announcement again today
          </label>
        </div>

      </div>
    </div>
  );
};

