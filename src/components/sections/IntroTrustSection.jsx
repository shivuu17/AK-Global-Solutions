import React from 'react';
import { Container } from '../layout/Container';
import { COMPANY_INFO } from '../../data/company';

export const IntroTrustSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#EEEEEB] border-b border-[#D9D9D4]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Title Grid */}
          <div className="lg:col-span-6 border-l-2 border-[#111111] pl-6 sm:pl-8">
            <span className="text-xs uppercase tracking-architectural text-[#D85B3F] font-mono mb-2 block font-semibold">
              OUR APPROACH &bull; NOIDA (UP)
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-[1.15]">
              WE DESIGN WITH PURPOSE.<br />
              WE BUILD WITH PRECISION.
            </h2>
          </div>

          {/* Right Description Grid */}
          <div className="lg:col-span-6">
            <p className="text-base sm:text-lg text-[#6B6B67] leading-relaxed mb-6 font-normal">
              {COMPANY_INFO.introDesc}
            </p>
            <p className="text-sm sm:text-base text-[#111111] font-medium leading-relaxed">
              By combining interior design, civil contracting, bespoke wood works, almirah & modular kitchen fabrication, and surface painting under single-point management, we eliminate the friction between architectural vision and physical execution.
            </p>
          </div>
        </div>

        {/* 4-Column Architectural Pillar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-[#D9D9D4]">
          <div className="bg-[#F7F7F5] p-6 border border-[#D9D9D4] rounded-[4px]">
            <span className="text-xs font-mono text-[#D85B3F] font-bold block mb-2">01 / INTERIOR ARCHITECTURE</span>
            <h3 className="text-lg font-bold text-[#111111] mb-2">Interior Designer</h3>
            <p className="text-xs text-[#6B6B67] leading-relaxed">
              Spatial planning, 3D renderings, ceiling layouts, and curated surface design.
            </p>
          </div>

          <div className="bg-[#F7F7F5] p-6 border border-[#D9D9D4] rounded-[4px]">
            <span className="text-xs font-mono text-[#D85B3F] font-bold block mb-2">02 / WOOD & JOINERY</span>
            <h3 className="text-lg font-bold text-[#111111] mb-2">Kitchen & Almirah</h3>
            <p className="text-xs text-[#6B6B67] leading-relaxed">
              Modular kitchens, fitted almirahs, wardrobes, wall cladding & custom woodwork.
            </p>
          </div>

          <div className="bg-[#F7F7F5] p-6 border border-[#D9D9D4] rounded-[4px]">
            <span className="text-xs font-mono text-[#D85B3F] font-bold block mb-2">03 / CIVIL CONTRACTING</span>
            <h3 className="text-lg font-bold text-[#111111] mb-2">Construction Work</h3>
            <p className="text-xs text-[#6B6B67] leading-relaxed">
              Brickwork, steel beam alterations, masonry, concrete slabs & plumbing overhauls.
            </p>
          </div>

          <div className="bg-[#F7F7F5] p-6 border border-[#D9D9D4] rounded-[4px]">
            <span className="text-xs font-mono text-[#D85B3F] font-bold block mb-2">04 / FINISHING & FABRICATION</span>
            <h3 className="text-lg font-bold text-[#111111] mb-2">Painter & Steel Work</h3>
            <p className="text-xs text-[#6B6B67] leading-relaxed">
              Architectural painting, micro-cement, texture plasters, grills & MS/SS fabrication.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
