import React from 'react';
import { Container } from '../layout/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { ScrollZoomWrapper } from '../ui/ScrollZoomWrapper';
import { PROCESS_STEPS } from '../../data/process';

export const ProcessSection = () => {
  return (
    <section id="process" className="py-24 md:py-32 bg-[#EEEEEB] border-b border-[#D9D9D4]">
      <Container>
        <SectionHeader 
          label="METHODOLOGY"
          title="How we work"
          description="A disciplined 4-stage process ensuring design fidelity, budget control, and craftsmanship precision."
          align="between"
        />

        {/* Horizontal Process Grid (Desktop) / Vertical Timeline with Auto Scroll Zoom (Mobile) */}
        <div className="relative mt-12">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-[1px] bg-[#D9D9D4] z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.number}>
                <ScrollZoomWrapper>
                  <div 
                    className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 sm:p-8 flex flex-col justify-between transition-architectural hover:border-[#111111] hover:shadow-xs group h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-[#D85B3F] group-hover:text-[#111111] transition-colors">
                          {step.number}
                        </span>
                        <span className="w-3 h-3 rounded-full border-2 border-[#111111] bg-[#F7F7F5] group-hover:bg-[#D85B3F] transition-colors"></span>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight text-[#111111] mb-1">
                        {step.title}
                      </h3>
                      <span className="text-xs uppercase font-mono tracking-wider text-[#6B6B67] block mb-4">
                        {step.subtitle}
                      </span>

                      <p className="text-sm text-[#6B6B67] leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#EEEEEB] text-[11px] font-mono text-[#6B6B67] flex justify-between">
                      <span>STAGE 0{idx + 1}</span>
                      <span className="text-[#111111] font-semibold">MILESTONE APPROVED</span>
                    </div>
                  </div>
                </ScrollZoomWrapper>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
