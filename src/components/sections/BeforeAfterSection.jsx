import React from 'react';
import { Container } from '../layout/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';

export const BeforeAfterSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#F7F7F5] border-b border-[#D9D9D4]">
      <Container>
        <SectionHeader 
          label="RENOVATION SHOWCASE"
          title="See the transformation."
          description="Drag the slider to compare original property conditions against completed architectural transformations."
          align="between"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Slider */}
          <div className="lg:col-span-8">
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
              afterImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              caption="Elysian Residence: Victorian Structure to Open Architectural Living"
            />
          </div>

          {/* Transformation Narrative Card */}
          <div className="lg:col-span-4 bg-[#EEEEEB] border border-[#D9D9D4] rounded-[6px] p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs uppercase tracking-architectural text-[#D85B3F] font-mono mb-2 block font-semibold">
                CASE STUDY
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#111111] mb-4">
                Structural & Aesthetic Renewal
              </h3>
              <p className="text-sm text-[#6B6B67] leading-relaxed mb-6 font-normal">
                By taking out internal load-bearing partitions, embedding hidden steel framework, and installing quarter-sawn white oak joinery, we turned a compartmentalized Victorian house into a modern architectural home.
              </p>
            </div>

            <div className="pt-6 border-t border-[#D9D9D4] space-y-3 font-mono text-xs text-[#111111]">
              <div className="flex justify-between">
                <span className="text-[#6B6B67]">STRUCTURAL WORK:</span>
                <span className="font-bold">Steel Beam Insertion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B67]">FINISHING:</span>
                <span className="font-bold">Micro-cement & Oak</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B67]">TIMELINE:</span>
                <span className="font-bold">14 Weeks Turnkey</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
