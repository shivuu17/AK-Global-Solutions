import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { COMPANY_INFO } from '../../data/company';
import { enquiryService } from '../../services/enquiryService';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Interior Design & Architecture',
    message: '',
    botField: '' // Honeypot anti-spam protection
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    'Interior Design & Architecture',
    'Wood Works, Modern Kitchen & Almirah',
    'Construction Work & Civil Contractor',
    'Painter, Finishing & Fabrication',
    'Real Estate & Complete Property Transformation',
    'General Inquiry'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      const result = await enquiryService.submitEnquiry({
        ...formData,
        sourcePage: 'HomePage:ContactSection'
      });

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Interior Design & Architecture',
          message: '',
          botField: ''
        });
      } else {
        setErrorMessage(result.message || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#EEEEEB] border-b border-[#D9D9D4]">
      <Container>
        {/* Form and Contact Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-architectural text-[#D85B3F] font-mono mb-2 block font-bold">
                DIRECT OFFICE INQUIRIES &bull; NOIDA (UP)
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#111111] mb-6 tracking-tight">
                Connect with AK Global Solutions.
              </h3>
              <p className="text-sm text-[#6B6B67] leading-relaxed mb-8">
                We review all construction, interior design, civil contracting, wood works, and almirah/kitchen requests across Noida and NCR directly via our cloud enquiry desk, phone, or WhatsApp.
              </p>

              <div className="space-y-6 text-sm text-[#111111] font-medium">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F7F7F5] border border-[#D9D9D4] rounded-[4px]">
                    <Phone className="w-4 h-4 text-[#D85B3F]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#6B6B67] font-mono block uppercase">TELEPHONE</span>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-[#D85B3F] transition-colors font-bold text-base">{COMPANY_INFO.displayPhone}</a>
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

          {/* Right Column: Live Architectural Enquiry Form */}
          <div className="lg:col-span-7 bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 sm:p-10 shadow-xs">
            
            <div className="mb-6">
              <span className="text-xs uppercase tracking-architectural text-[#D85B3F] font-mono block mb-1 font-bold">
                PROJECT ESTIMATION &bull; SITE CONSULTATION
              </span>
              <h4 className="text-2xl font-bold text-[#111111]">
                Request a Consultation
              </h4>
              <p className="text-xs text-[#6B6B67] mt-1">
                Fill out the project details below and our team will get in touch with an initial structural or design estimate.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-[6px] text-center space-y-4">
                <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-700">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h5 className="text-lg font-bold text-emerald-950">
                  Enquiry Dispatched Successfully
                </h5>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to AK Global Solutions. Our principal contractor will review your architectural specifications and contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-[#111111] hover:bg-[#D85B3F] text-white text-xs font-mono rounded-[3px] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot Spam Trap (Hidden from real users) */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={(e) => setFormData({ ...formData, botField: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-300 rounded-[4px] text-xs text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D9D9D4] rounded-[4px] text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D9D9D4] rounded-[4px] text-sm font-mono text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D9D9D4] rounded-[4px] text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                      Service Requirement
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D9D9D4] rounded-[4px] text-xs font-mono text-[#111111] focus:outline-none focus:border-[#D85B3F] cursor-pointer"
                    >
                      {servicesList.map((srv) => (
                        <option key={srv} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                    Project Scope &amp; Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your property location in Noida/NCR, tentative square footage, woodwork requirements, or renovation goals..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D9D9D4] rounded-[4px] text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] font-mono text-[#6B6B67]">
                    Strict confidentiality &bull; No marketing spam
                  </span>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-3 bg-[#111111] hover:bg-[#D85B3F] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-[4px] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Enquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </Container>
    </section>
  );
};
