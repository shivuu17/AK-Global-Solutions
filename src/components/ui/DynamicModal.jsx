import React, { useState } from 'react';
import { X, Phone, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { enquiryService } from '../../services/enquiryService';

export const DynamicModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Interior Design & Architecture',
    message: '',
    botField: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      const res = await enquiryService.submitEnquiry({
        ...formData,
        sourcePage: 'GlobalQuoteModal'
      });

      if (res.success) {
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
        setErrorMessage(res.message || 'Failed to submit quote inquiry.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error submitting form.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6B6B67] hover:text-[#111111] transition-colors p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-architectural text-[#D85B3F] font-mono font-bold block mb-1">
            PROJECT CONSULTATION &bull; NOIDA
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-[#111111]">
            Get an Architectural Quote
          </h3>
          <p className="text-xs text-[#6B6B67] mt-1">
            Share your property requirements or reach our studio directly.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-[6px] text-center space-y-4">
            <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-700">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-emerald-950">
              Inquiry Received
            </h4>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Our engineering team will review your specifications and contact you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-4 py-2 bg-[#111111] hover:bg-[#D85B3F] text-white text-xs font-mono rounded transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot trap */}
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
              <div className="p-3 bg-red-50 border border-red-300 rounded text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Priya Verma"
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm font-mono text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Service Focus
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-xs font-mono text-[#111111] focus:outline-none focus:border-[#D85B3F]"
              >
                <option value="Interior Design & Architecture">Interior Design & Architecture</option>
                <option value="Wood Works, Modern Kitchen & Almirah">Wood Works, Modern Kitchen & Almirah</option>
                <option value="Construction Work & Civil Contractor">Construction Work & Civil Contractor</option>
                <option value="Painter, Finishing & Fabrication">Painter, Finishing & Fabrication</option>
                <option value="Real Estate & Complete Property Transformation">Real Estate & Complete Property Transformation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Scope &amp; Message *
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your location, timeline, and requirements..."
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#111111] hover:bg-[#D85B3F] text-white text-xs font-mono font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <span>Submit Consultation Request</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Direct Contact Options Footer */}
        <div className="mt-6 pt-4 border-t border-[#D9D9D4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex items-center gap-1.5 text-[#111111] hover:text-[#D85B3F] font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-[#D85B3F]" />
            <span>{COMPANY_INFO.displayPhone}</span>
          </a>

          <a
            href="https://wa.me/919569664741"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-bold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp &rarr;</span>
          </a>
        </div>

      </div>
    </div>
  );
};
