import React from 'react';
import { X, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { Button } from './Button';

export const DynamicModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xl p-6 sm:p-8 text-center">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6B6B67] hover:text-[#111111] transition-colors p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center">
          <div className="p-3.5 bg-[#EEEEEB] border border-[#D9D9D4] rounded-full text-[#D85B3F] mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-architectural text-[#6B6B67] font-mono mb-2">
            PROJECT CONSULTATION
          </span>

          <h3 className="text-2xl font-bold tracking-tight text-[#111111] mb-3">
            Enquiry Form Temporarily Paused
          </h3>

          <p className="text-sm text-[#6B6B67] leading-relaxed mb-6">
            Online form submissions are currently disabled. Please reach out to our studio team directly via Phone or WhatsApp for immediate consultation and site estimates.
          </p>

          <div className="w-full space-y-3">
            <Button 
              href={`tel:${COMPANY_INFO.phone}`} 
              variant="primary" 
              size="md" 
              className="w-full"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call +91 95696 64741
            </Button>

            <Button 
              href="https://wa.me/919569664741" 
              target="_blank" 
              variant="accent" 
              size="md" 
              className="w-full"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp Us &rarr;
            </Button>
          </div>

          <div className="mt-6 pt-4 border-t border-[#D9D9D4] w-full text-xs font-mono text-[#6B6B67]">
            LOCATION: {COMPANY_INFO.location}
          </div>
        </div>
      </div>
    </div>
  );
};
