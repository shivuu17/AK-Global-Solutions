import React from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { COMPANY_INFO } from '../../data/company';
import { Phone, Mail, MapPin, MessageSquare, AlertCircle } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#EEEEEB] border-b border-[#D9D9D4]">
      <Container>
        {/* Main CTA Header Banner */}
        <div className="bg-[#111111] text-[#F7F7F5] rounded-[6px] p-8 sm:p-12 md:p-16 mb-16 shadow-lg relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs uppercase tracking-architectural text-[#D85B3F] font-mono mb-3 block font-bold">
                START A CONVERSATION &bull; NOIDA (UP)
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F7F7F5] leading-[1.12]">
                Building Your Dreams,<br />
                <span className="text-[#D85B3F] font-display">Brick by Brick!</span>
              </h2>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Button href={`tel:${COMPANY_INFO.phone}`} variant="accent" size="lg">
                Call +91 95696 64741
              </Button>
              <Button href="https://wa.me/919569664741" target="_blank" variant="secondary" size="lg" className="border-[#F7F7F5] text-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#111111]">
                WhatsApp Chat &rarr;
              </Button>
            </div>
          </div>
        </div>

        {/* Form and Contact Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-architectural text-[#6B6B67] font-mono mb-2 block">
                DIRECT OFFICE INQUIRIES
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-6">
                Connect with AK Global Solutions.
              </h3>
              <p className="text-sm text-[#6B6B67] leading-relaxed mb-8">
                We review all construction, interior design, civil contracting, wood works, and almirah/kitchen requests across Noida and NCR directly via phone and WhatsApp.
              </p>

              <div className="space-y-6 text-sm text-[#111111] font-medium">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F7F7F5] border border-[#D9D9D4] rounded-[4px]">
                    <Phone className="w-4 h-4 text-[#D85B3F]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B6B67] font-mono block uppercase">TELEPHONE</span>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#D85B3F] transition-colors font-bold">{COMPANY_INFO.displayPhone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F7F7F5] border border-[#D9D9D4] rounded-[4px]">
                    <Mail className="w-4 h-4 text-[#D85B3F]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B6B67] font-mono block uppercase">EMAIL STUDIO</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#D85B3F] transition-colors">{COMPANY_INFO.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F7F7F5] border border-[#D9D9D4] rounded-[4px]">
                    <MapPin className="w-4 h-4 text-[#D85B3F]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B6B67] font-mono block uppercase">OFFICE LOCATION</span>
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-4 bg-[#F7F7F5] border border-[#D9D9D4] rounded-[4px] text-xs font-mono text-[#6B6B67] flex items-center justify-between">
              <span>LOCATION: SADARPUR, SEC-45, NOIDA</span>
              <a href="https://wa.me/919569664741" target="_blank" rel="noreferrer" className="text-[#D85B3F] font-bold hover:underline flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Disabled Enquiry Form Notice Card */}
          <div className="lg:col-span-7 bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-[#EEEEEB] border border-[#D9D9D4] rounded-full text-[#D85B3F] mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-[#111111] mb-3">
              Enquiry Form Temporarily Paused
            </h4>

            <p className="text-sm text-[#6B6B67] max-w-md leading-relaxed mb-8">
              Online form submissions are currently disabled. For immediate consultation, project estimation, or site visits in Noida, please call or WhatsApp us directly.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <Button 
                href={`tel:${COMPANY_INFO.phone}`} 
                variant="primary" 
                size="md" 
                className="w-full"
              >
                Call +91 95696 64741
              </Button>
              <Button 
                href="https://wa.me/919569664741" 
                target="_blank" 
                variant="accent" 
                size="md" 
                className="w-full"
              >
                Chat on WhatsApp &rarr;
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
