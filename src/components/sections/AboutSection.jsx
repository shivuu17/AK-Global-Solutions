import React from 'react';
import { Container } from '../layout/Container';
import { COMPANY_INFO } from '../../data/company';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#F7F7F5] border-b border-[#D9D9D4]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Text Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#D85B3F]"></span>
              <span className="text-xs uppercase tracking-architectural text-[#6B6B67] font-semibold">
                ABOUT AK GLOBAL SOLUTIONS
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111] leading-[1.12] mb-8">
              Building Your Dreams,<br />
              <span className="text-[#D85B3F] font-display">Brick by Brick!</span>
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-[#6B6B67] leading-relaxed font-normal">
              <p>
                AK Global Solutions operates at the intersection of Real Estate, Interior Architecture, Civil Construction, Wood Works, Painting, and Steel Fabrication in Sadarpur, Sec-45, Noida (UP).
              </p>
              <p>
                We believe exceptional property transformation requires complete coordination. Rather than managing fragmented subcontractors, our team handles every stage — from structural masonry and civil engineering to modular kitchen fabrication, almirah joinery, micro-cement coating, and turnkey site handover.
              </p>
              <p>
                Whether designing a modern residential residence, renovating an apartment, or constructing a commercial workspace, we focus on structural strength, functional space utilization, and meticulous surface detailing.
              </p>
            </div>

            {/* Structured Company Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-[#D9D9D4] font-mono text-xs">
              <div>
                <span className="text-[#6B6B67] uppercase block mb-1">CORE DISCIPLINE</span>
                <span className="text-[#111111] font-bold">Design, Build & Civil</span>
              </div>
              <div>
                <span className="text-[#6B6B67] uppercase block mb-1">EXECUTION AREA</span>
                <span className="text-[#111111] font-bold">Noida (UP) & NCR</span>
              </div>
              <div>
                <span className="text-[#6B6B67] uppercase block mb-1">OFFICE LOCATION</span>
                <span className="text-[#111111] font-bold">Sadarpur, Sec-45</span>
              </div>
            </div>
          </div>

          {/* Right Logo & Graphic Frame Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[6px] overflow-hidden border border-[#D9D9D4] bg-[#EEEEEB] shadow-sm p-6 flex flex-col items-center justify-center text-center">
              <img 
                src={COMPANY_INFO.logoUrl} 
                alt="AK Global Solutions Brand Graphic" 
                className="w-full max-w-xs h-auto object-contain bg-[#F7F7F5] p-6 rounded-[6px] border border-[#D9D9D4] shadow-xs mb-6"
              />
              <div className="w-full bg-[#111111] text-[#F7F7F5] p-6 rounded-[4px] font-mono text-xs text-left space-y-2">
                <span className="text-[#D85B3F] font-bold block">// OFFICIAL AK GLOBAL SOLUTIONS</span>
                <div className="text-sm font-sans font-bold text-[#F7F7F5]">
                  Real Estate | Interior Design | Construction
                </div>
                <div className="text-[#D9D9D4]">
                  Phone: {COMPANY_INFO.displayPhone}
                </div>
                <div className="text-[#6B6B67]">
                  {COMPANY_INFO.address}
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
