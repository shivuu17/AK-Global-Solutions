import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { IntroTrustSection } from '../components/sections/IntroTrustSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { BeforeAfterSection } from '../components/sections/BeforeAfterSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactSection } from '../components/sections/ContactSection';

export const HomePage = ({ onOpenQuoteModal }) => {
  return (
    <main className="min-h-screen">
      <HeroSection onOpenQuoteModal={onOpenQuoteModal} />
      <IntroTrustSection />
      <ServicesSection onOpenQuoteModal={onOpenQuoteModal} />
      <ProjectsSection />
      <BeforeAfterSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection onOpenQuoteModal={onOpenQuoteModal} />
    </main>
  );
};
