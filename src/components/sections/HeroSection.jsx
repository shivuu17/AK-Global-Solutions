import React, { useEffect, useRef } from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { COMPANY_INFO } from '../../data/company';
import { MapPin } from 'lucide-react';
import gsap from 'gsap';

export const HeroSection = ({ onOpenQuoteModal }) => {
  const heroRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.1 })
        .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "-=0.5")
        .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.5")
        .fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.5");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="relative pt-32 sm:pt-40 md:pt-44 pb-20 md:pb-28 border-b border-[#D9D9D4] bg-[#111111] text-[#F7F7F5] overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between"
    >
      {/* Full Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 opacity-40 transition-opacity duration-1000"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
        >
          <source 
            src="https://cdn.coverr.co/videos/coverr-interior-of-a-modern-apartment-5473/1080p.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-house-with-pool-41442-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Dark Architectural Vignette & Grid Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/95 via-[#111111]/75 to-[#111111]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/70"></div>
        <div className="absolute inset-0 architectural-grid-bg opacity-20 pointer-events-none"></div>
      </div>

      {/* Main Content Container */}
      <Container className="relative z-10 my-auto w-full">
        <div className="max-w-4xl">
          
          {/* Small Label with Brand Accent */}
          <div ref={labelRef} className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-6 sm:w-8 h-[2px] bg-[#D85B3F]"></span>
            <span className="text-[11px] sm:text-xs uppercase tracking-architectural text-[#D85B3F] font-semibold font-mono">
              {COMPANY_INFO.heroLabel}
            </span>
          </div>

          {/* Large Responsive Hero Headline */}
          <h1 ref={titleRef} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tight text-[#F7F7F5] leading-[1.06] mb-6 sm:mb-8">
            Building your dreams.<br />
            <span className="text-[#D85B3F] font-display">Brick by brick.</span>
          </h1>

          {/* Supporting Copy */}
          <p ref={descRef} className="text-sm sm:text-lg md:text-xl text-[#D9D9D4] max-w-2xl leading-relaxed mb-8 sm:mb-10 font-normal">
            {COMPANY_INFO.heroDesc}
          </p>

          {/* Touch-friendly Action CTAs */}
          <div ref={btnRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button href="#projects" variant="accent" size="lg" className="w-full sm:w-auto">
              View Projects
            </Button>
            <Button href={`tel:${COMPANY_INFO.phone}`} variant="secondary" size="lg" className="w-full sm:w-auto border-[#F7F7F5] text-[#F7F7F5] hover:bg-[#F7F7F5] hover:text-[#111111]">
              Call +91 95696 64741
            </Button>
            <Button href="https://wa.me/919569664741" target="_blank" variant="outline" size="lg" className="w-full sm:w-auto border-[#6B6B67] text-[#D9D9D4] hover:border-[#F7F7F5]">
              WhatsApp Us &rarr;
            </Button>
          </div>

        </div>
      </Container>

      {/* Hero Bottom Bar: Clean Specification Ticker */}
      <div className="relative z-10 pt-4 pb-4 sm:pt-6 sm:pb-6 border-t border-[#262626]/80 bg-[#111111]/60 backdrop-blur-xs">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-[#D9D9D4]">
            
            {/* Ticker Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-1.5 text-[#F7F7F5]">
                <MapPin className="w-3.5 h-3.5 text-[#D85B3F] shrink-0" />
                <span className="font-bold">Sadarpur, Sec-45, Noida (UP)</span>
              </div>
              <span className="text-[#6B6B67] hidden sm:inline">&bull;</span>
              <div className="text-[#D9D9D4] text-[11px] sm:text-xs">
                Real Estate &bull; Interior &bull; Construction &bull; Wood Works
              </div>
            </div>

            <div className="text-[11px] sm:text-xs text-[#6B6B67] font-mono hidden md:block">
              DESIGN &bull; BUILD &bull; TRANSFORM
            </div>

          </div>
        </Container>
      </div>
    </section>
  );
};
