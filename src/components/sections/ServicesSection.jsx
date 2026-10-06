import React, { useState, lazy, Suspense } from 'react';
import { Container } from '../layout/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { ServiceRow } from '../ui/ServiceRow';
import { WebGLFallback } from '../ui/WebGLFallback';
import { SERVICES_DATA } from '../../data/services';
import { Check } from 'lucide-react';

const Interactive3DViewer = lazy(() =>
  import('../ui/Interactive3DViewer').then(module => ({ default: module.Interactive3DViewer }))
);

export const ServicesSection = ({ onOpenQuoteModal }) => {
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0]);

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F7F7F5] border-b border-[#D9D9D4]">
      <Container>
        {/* Section Header */}
        <SectionHeader 
          label="CAPABILITIES"
          title="What we do"
          description="End-to-end design, construction, carpentry, and finishing services executed by specialized internal teams."
          align="between"
        />

        {/* Editorial Services List */}
        <div className="mb-20">
          {SERVICES_DATA.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              isSelected={selectedService.id === service.id}
              onSelect={() => setSelectedService(service)}
            />
          ))}
        </div>

        {/* 3D Services Interaction Sub-section: "From structure to space." */}
        <div className="mt-20 pt-16 border-t border-[#D9D9D4]">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[1px] bg-[#D85B3F]"></span>
                <span className="text-xs uppercase tracking-architectural text-[#6B6B67] font-mono">
                  3D VISUAL SPECIFICATION
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
                From structure to space.
              </h3>
            </div>
            <p className="text-sm text-[#6B6B67] max-w-md">
              Select any capability above to isolate its structural and material layer in the interactive 3D model below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Interactive Canvas */}
            <div className="lg:col-span-7">
              <Suspense fallback={<WebGLFallback label="02 / STRUCTURE TO SPACE" />}>
                <Interactive3DViewer 
                  activeServiceId={selectedService.id}
                  activeLayer={selectedService.modelLayer}
                />
              </Suspense>
            </div>

            {/* Active Service Specs Detail Card */}
            <div className="lg:col-span-5 bg-[#EEEEEB] border border-[#D9D9D4] rounded-[6px] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-sm text-[#D85B3F] font-bold">
                  {selectedService.number}
                </span>
                <h4 className="text-2xl font-bold tracking-tight text-[#111111]">
                  {selectedService.title}
                </h4>
              </div>

              <p className="text-sm text-[#6B6B67] leading-relaxed mb-6">
                {selectedService.fullDesc}
              </p>

              <div className="mb-6">
                <h5 className="text-xs uppercase tracking-architectural font-mono text-[#111111] mb-3">
                  Scope & Deliverables
                </h5>
                <ul className="space-y-2.5">
                  {selectedService.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#111111]">
                      <span className="p-0.5 bg-[#111111] text-[#F7F7F5] rounded-full mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenQuoteModal}
                className="w-full py-3 bg-[#111111] text-[#F7F7F5] text-xs font-mono uppercase tracking-widest rounded-[4px] hover:bg-[#D85B3F] transition-colors cursor-pointer"
              >
                Inquire for {selectedService.title} &rarr;
              </button>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
};
