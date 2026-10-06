import React, { useState, useEffect } from 'react';
import { Container } from './Container';
import { Button } from '../ui/Button';
import { COMPANY_INFO } from '../../data/company';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F7F7F5]/95 backdrop-blur-md py-3 border-b border-[#D9D9D4] shadow-xs' 
          : 'bg-[#F7F7F5]/85 backdrop-blur-xs py-4 sm:py-5 border-b border-[#D9D9D4]/60'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo Brand with Official Graphic */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src={COMPANY_INFO.logoUrl} 
              alt="AK Global Solutions Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-[#111111] font-display uppercase leading-none">
                AK GLOBAL SOLUTIONS
              </span>
              <span className="text-[10px] text-[#6B6B67] font-mono tracking-architectural mt-0.5 hidden sm:block">
                REAL ESTATE &amp; INTERIOR DESIGNER
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-architectural text-[#6B6B67] hover:text-[#111111] font-semibold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center">
            <Button 
              size="sm" 
              variant="primary" 
              onClick={onOpenQuoteModal}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#111111] hover:text-[#D85B3F] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#F7F7F5] border-b border-[#D9D9D4] shadow-lg py-6 px-6 transition-all duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-architectural text-[#111111] font-semibold py-2 border-b border-[#EEEEEB] hover:text-[#D85B3F]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <Button 
                size="md" 
                variant="primary" 
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuoteModal) onOpenQuoteModal();
                }}
              >
                Get a Quote
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
