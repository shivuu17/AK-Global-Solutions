import React from 'react';
import { Container } from './Container';
import { COMPANY_INFO } from '../../data/company';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer = ({ onOpenQuoteModal }) => {
  return (
    <footer className="bg-[#111111] text-[#F7F7F5] pt-16 pb-12 border-t border-[#111111]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#262626]">
          
          {/* Brand Info & Logo */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#" className="flex items-center gap-3 mb-4">
                <img 
                  src={COMPANY_INFO.logoUrl} 
                  alt="AK Global Solutions Official Logo" 
                  className="h-12 w-auto object-contain bg-[#F7F7F5] p-1.5 rounded-[4px]"
                />
                <div>
                  <span className="font-extrabold tracking-tight text-xl text-[#F7F7F5] font-display uppercase block leading-none">
                    {COMPANY_INFO.name}
                  </span>
                  <span className="text-[10px] text-[#D85B3F] font-mono tracking-architectural mt-1 block">
                    REAL ESTATE &amp; INTERIOR DESIGNER
                  </span>
                </div>
              </a>

              <p className="text-[#D85B3F] text-lg font-serif italic mb-4 font-bold">
                "{COMPANY_INFO.tagline}"
              </p>

              <p className="text-[#6B6B67] text-sm max-w-md leading-relaxed mb-6">
                AK Global Solutions brings interior design, civil construction precision, bespoke wood works, almirah & kitchen fabrication, and painting together under single-point management in Sadarpur, Sec-45, Noida (UP).
              </p>

              <div className="space-y-2.5 text-xs text-[#D9D9D4] font-mono">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D85B3F]" />
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#F7F7F5]">{COMPANY_INFO.displayPhone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#D85B3F]" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#F7F7F5]">{COMPANY_INFO.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D85B3F]" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={onOpenQuoteModal}
                className="text-xs uppercase tracking-architectural text-[#D85B3F] hover:text-[#F7F7F5] font-mono border-b border-[#D85B3F] pb-1 transition-colors cursor-pointer"
              >
                REQUEST NOIDA SITE CONSULTATION &rarr;
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-architectural text-[#6B6B67] font-mono mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-[#D9D9D4]">
              <li><a href="#hero" className="hover:text-[#F7F7F5] transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-[#F7F7F5] transition-colors">Services & Work</a></li>
              <li><a href="#projects" className="hover:text-[#F7F7F5] transition-colors">Selected Projects</a></li>
              <li><a href="#process" className="hover:text-[#F7F7F5] transition-colors">How We Work</a></li>
              <li><a href="#contact" className="hover:text-[#F7F7F5] transition-colors">Contact Studio</a></li>
            </ul>
          </div>

          {/* Core Work & Capabilities */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-architectural text-[#6B6B67] font-mono mb-5">
              Services & Specializations
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D9D9D4]">
              <li className="flex items-center gap-2"><span className="text-[#D85B3F]">&bull;</span> Real Estate & Interior Designer</li>
              <li className="flex items-center gap-2"><span className="text-[#D85B3F]">&bull;</span> Construction Work & Civil Contractor</li>
              <li className="flex items-center gap-2"><span className="text-[#D85B3F]">&bull;</span> Wood Works (Modern Kitchen & Almirah)</li>
              <li className="flex items-center gap-2"><span className="text-[#D85B3F]">&bull;</span> Painter, Micro-cement & Finishing</li>
              <li className="flex items-center gap-2"><span className="text-[#D85B3F]">&bull;</span> Steel & Metal Fabrication</li>
              <li className="flex items-center gap-2"><span className="text-[#D85B3F]">&bull;</span> Turnkey Property Overhaul</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6B67] font-mono gap-4">
          <div>
            &copy; 2026 AK Global Solutions. All rights reserved. Sadarpur, Sec-45, Noida (UP).
          </div>
          <div className="flex items-center gap-6">
            {COMPANY_INFO.socials.map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F7F7F5] transition-colors uppercase tracking-wider text-[11px]"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
