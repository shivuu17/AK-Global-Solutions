import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';

/**
 * Floating WhatsApp Icon Overlay Button (Fixed Bottom-Right)
 * Direct one-click link to WhatsApp chat with AK Global Solutions (+91 95696 64741)
 */
export const WhatsAppFloatingButton = () => {
  return (
    <a
      href="https://wa.me/919569664741?text=Hello%20AK%20Global%20Solutions%2C%20I%20am%20interested%20in%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-[#25D366] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
    >
      {/* WhatsApp Icon with Pulse Badge */}
      <div className="relative flex items-center justify-center">
        <MessageSquare className="w-6 h-6 fill-current text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D85B3F] rounded-full border-2 border-[#25D366] animate-pulse"></span>
      </div>

      {/* Button Label */}
      <span className="hidden sm:inline font-mono text-xs font-bold uppercase tracking-wider pr-1">
        WhatsApp: 95696 64741
      </span>
    </a>
  );
};
