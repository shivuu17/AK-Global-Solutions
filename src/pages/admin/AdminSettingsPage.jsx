import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { settingsService } from '../../services/settingsService';
import { isFirebaseConfigured } from '../../lib/firebase';
import { mediaService } from '../../services/mediaService';
import { 
  Settings, 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Globe, 
  Check, 
  AlertCircle,
  X
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    phone: '',
    displayPhone: '',
    email: '',
    location: '',
    address: '',
    heroTitle: '',
    heroDesc: '',
    socials: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const data = await settingsService.getSettings();
        setFormData({
          name: data.name || '',
          tagline: data.tagline || '',
          phone: data.phone || '',
          displayPhone: data.displayPhone || '',
          email: data.email || '',
          location: data.location || '',
          address: data.address || '',
          heroTitle: data.heroTitle || '',
          heroDesc: data.heroDesc || '',
          socials: Array.isArray(data.socials) ? data.socials : []
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage({ type: '', text: '' });
    try {
      await settingsService.updateSettings(formData);
      setStatusMessage({ type: 'success', text: 'Studio settings updated successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleSocialChange = (idx, field, val) => {
    setFormData((prev) => {
      const nextSocials = [...prev.socials];
      nextSocials[idx] = { ...nextSocials[idx], [field]: val };
      return { ...prev, socials: nextSocials };
    });
  };

  const firebaseReady = isFirebaseConfigured();
  const cloudinaryReady = mediaService.isCloudinaryConfigured();

  return (
    <AdminLayout title="Studio Settings &amp; Configuration">
      
      {/* Alert Notification */}
      {statusMessage.text && (
        <div className={`mb-6 p-4 rounded-[4px] flex items-center justify-between text-xs font-mono ${
          statusMessage.type === 'error'
            ? 'bg-red-50 text-red-800 border border-red-300'
            : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
        }`}>
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage({ type: '', text: '' })} className="text-gray-500 hover:text-black">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Cloud & Architecture Health Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className={`p-4 rounded-[6px] border text-xs font-mono flex items-center gap-3 ${
          firebaseReady 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <div>
            <span className="font-bold block">
              FIREBASE CLOUD BACKEND: {firebaseReady ? 'CONFIGURED & CONNECTED' : 'LOCAL FALLBACK ACTIVE'}
            </span>
            <span className="text-[11px] block mt-0.5">
              {firebaseReady ? 'Real-time Firestore and Auth security rules active.' : 'Define VITE_FIREBASE_* in your environment for live cloud database.'}
            </span>
          </div>
        </div>

        <div className={`p-4 rounded-[6px] border text-xs font-mono flex items-center gap-3 ${
          cloudinaryReady 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
            : 'bg-amber-50 border-amber-300 text-amber-900'
        }`}>
          <Globe className="w-5 h-5 shrink-0" />
          <div>
            <span className="font-bold block">
              CLOUDINARY MEDIA CDN: {cloudinaryReady ? 'READY FOR UPLOADS' : 'SETUP PRESET NEEDED'}
            </span>
            <span className="text-[11px] block mt-0.5">
              {cloudinaryReady ? 'Direct client unsigned image upload active.' : 'Set VITE_CLOUDINARY_CLOUD_NAME and preset in .env.local.'}
            </span>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Contact Information */}
        <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 sm:p-8 shadow-2xs">
          <h3 className="text-base font-bold text-[#111111] mb-1">
            Studio Public Contact Information
          </h3>
          <p className="text-xs text-[#6B6B67] mb-6">
            These numbers and locations are displayed across the header, footer, contact section, and quote modal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Company Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Primary Phone (E.164 formatted for dialers)
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91-9569664741"
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm font-mono text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Display Phone (Formatted for visitors)
              </label>
              <input
                type="text"
                required
                value={formData.displayPhone}
                onChange={(e) => setFormData({ ...formData, displayPhone: e.target.value })}
                placeholder="+91 95696 64741"
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm font-mono text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Public Studio Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                City / Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Sadarpur, Sec-45, Noida (UP)"
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Full Physical Studio Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111]"
              />
            </div>
          </div>
        </div>

        {/* Homepage Hero Copy */}
        <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 sm:p-8 shadow-2xs">
          <h3 className="text-base font-bold text-[#111111] mb-1">
            Homepage Hero Headline &amp; Narrative
          </h3>
          <p className="text-xs text-[#6B6B67] mb-6">
            Customize the primary welcome copy displayed on the landing page hero section.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Hero Headline
              </label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                placeholder="Building your dreams. Brick by brick."
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                Hero Supporting Description
              </label>
              <textarea
                rows={3}
                value={formData.heroDesc}
                onChange={(e) => setFormData({ ...formData, heroDesc: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111]"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 sm:p-8 shadow-2xs">
          <h3 className="text-base font-bold text-[#111111] mb-1">
            Social Media &amp; Instant Communication Channels
          </h3>
          <p className="text-xs text-[#6B6B67] mb-6">
            Links embedded in footer and direct WhatsApp consultation buttons.
          </p>

          <div className="space-y-3">
            {formData.socials.map((social, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-3">
                <div>
                  <span className="block text-[11px] font-mono text-[#6B6B67] uppercase font-bold pt-2">
                    {social.name}
                  </span>
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    value={social.url}
                    onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs font-mono text-[#111111]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#D85B3F] hover:bg-[#c44f35] text-white text-xs font-mono font-bold uppercase tracking-widest rounded-[4px] shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Settings...' : 'Save Studio Settings'}</span>
          </button>
        </div>

      </form>

      {/* Database Seeding Utility Box */}
      <div className="mt-12 bg-white border border-[#D9D9D4] rounded-[6px] p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D85B3F] font-bold block mb-1">
              DATA INITIALIZATION UTILITY
            </span>
            <h4 className="text-base font-bold text-[#111111]">
              Seed Cloud Firestore with Initial Projects &amp; Services
            </h4>
            <p className="text-xs text-[#6B6B67] mt-1 max-w-xl">
              Quickly populate your live Cloud Firestore collections with the 6 curated architectural projects, 5 services, and official company settings.
            </p>
          </div>

          <button
            type="button"
            onClick={async () => {
              if (!window.confirm('Populate Cloud Firestore with the initial projects, services, and studio settings?')) return;
              try {
                const res = await settingsService.seedInitialDatabase();
                setStatusMessage({
                  type: 'success',
                  text: `Successfully seeded ${res.count} projects and all services into Firestore!`
                });
              } catch (err) {
                setStatusMessage({ type: 'error', text: err.message });
              }
            }}
            className="px-4 py-2.5 bg-[#111111] hover:bg-[#D85B3F] text-white text-xs font-mono font-bold rounded-[4px] transition-colors shrink-0 cursor-pointer shadow-xs"
          >
            Seed Database Now &rarr;
          </button>
        </div>
      </div>

    </AdminLayout>
  );
};
