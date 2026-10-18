import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { popupService } from '../../services/popupService';
import { mediaService } from '../../services/mediaService';
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Edit, 
  Calendar, 
  Upload, 
  X, 
  Eye, 
  Sparkles
} from 'lucide-react';

export const AdminPopupsPage = () => {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Form State
  const initialForm = {
    title: '',
    subtitle: 'SPECIAL STUDIO EVENT',
    message: '',
    image: '',
    ctaLabel: 'Claim Consultation Now',
    ctaUrl: '#contact',
    active: true,
    startAt: new Date().toISOString().slice(0, 10),
    endAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    priority: 1,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadPopups();
  }, []);

  async function loadPopups() {
    setLoading(true);
    try {
      const data = await popupService.getAllPopupsAdmin();
      setPopups(data);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to load popups.' });
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (popup) => {
    setEditingId(popup.id);
    setFormData({
      title: popup.title || '',
      subtitle: popup.subtitle || '',
      message: popup.message || '',
      image: popup.image || '',
      ctaLabel: popup.ctaLabel || 'Learn More',
      ctaUrl: popup.ctaUrl || '#contact',
      active: popup.active !== undefined ? popup.active : true,
      startAt: popup.startAt ? popup.startAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
      endAt: popup.endAt ? popup.endAt.slice(0, 10) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      priority: popup.priority || 1,
    });
    setShowModal(true);
  };

  const handleToggleActive = async (popup) => {
    try {
      await popupService.togglePopupActive(popup.id, popup.active);
      setStatusMessage({
        type: 'success',
        text: `Popup "${popup.title}" is now ${!popup.active ? 'ACTIVE' : 'INACTIVE'}.`
      });
      loadPopups();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete popup "${title}"?`)) return;
    try {
      await popupService.deletePopup(id);
      setStatusMessage({ type: 'success', text: 'Popup deleted successfully.' });
      loadPopups();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const result = await mediaService.uploadImage(file, 'popups', formData.title);
      setFormData((prev) => ({ ...prev, image: result.url }));
      setStatusMessage({ type: 'success', text: 'Image uploaded to Cloudinary successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await popupService.updatePopup(editingId, formData);
        setStatusMessage({ type: 'success', text: 'Event pop-up updated successfully!' });
      } else {
        await popupService.createPopup(formData);
        setStatusMessage({ type: 'success', text: 'New event pop-up created and saved!' });
      }
      setShowModal(false);
      loadPopups();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <AdminLayout title="Event Pop-up Creator & Announcements">
      
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

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-[#111111]">
            Main Website Event Pop-ups
          </h2>
          <p className="text-xs text-[#6B6B67] mt-0.5">
            Create scheduled promotional modals and announcement pop-ups that appear to visitors on the main website.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#D85B3F] hover:bg-[#c44f35] text-white text-xs font-mono font-bold rounded-[4px] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Pop-up</span>
        </button>
      </div>

      {/* Pop-up List Table */}
      <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#6B6B67]">
            Loading pop-up schedule...
          </div>
        ) : popups.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="inline-flex p-3 bg-[#EEEEEB] rounded-full text-[#6B6B67]">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#111111]">No Event Pop-ups Created Yet</h3>
            <p className="text-xs text-[#6B6B67] max-w-sm mx-auto">
              Announce architectural exhibitions, seasonal renovation discounts, or site consultation weeks to your visitors.
            </p>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-[#111111] text-[#F7F7F5] text-xs font-mono rounded-[4px] hover:bg-[#D85B3F] transition-colors"
            >
              Create Your First Pop-up &rarr;
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEEEEB] border-b border-[#D9D9D4] text-[11px] font-mono text-[#6B6B67] uppercase">
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Event Details</th>
                  <th className="py-3 px-6">Active Schedule</th>
                  <th className="py-3 px-6">Call to Action</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D9D4] text-xs">
                {popups.map((popup) => (
                  <tr key={popup.id} className="hover:bg-white/70 transition-colors">
                    
                    {/* Active Toggle */}
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleToggleActive(popup)}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                          popup.active
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                        }`}
                      >
                        {popup.active ? '● LIVE / ACTIVE' : '○ DISABLED'}
                      </button>
                    </td>

                    {/* Event Title & Subtitle */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {popup.image && (
                          <img 
                            src={popup.image} 
                            alt="" 
                            className="w-12 h-12 object-cover rounded-[3px] border border-[#D9D9D4]" 
                          />
                        )}
                        <div>
                          <span className="text-[10px] text-[#D85B3F] font-mono uppercase block font-bold">
                            {popup.subtitle || 'ANNOUNCEMENT'}
                          </span>
                          <span className="font-bold text-[#111111] block">
                            {popup.title}
                          </span>
                          <span className="text-[11px] text-[#6B6B67] line-clamp-1 max-w-xs">
                            {popup.message}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Schedule */}
                    <td className="py-4 px-6 font-mono text-[11px] text-[#6B6B67]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                        <span>{popup.startAt ? popup.startAt.slice(0, 10) : 'Immediate'} &rarr; {popup.endAt ? popup.endAt.slice(0, 10) : 'Open'}</span>
                      </div>
                    </td>

                    {/* CTA */}
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-[#EEEEEB] rounded-[3px] text-[11px] font-mono text-[#111111] block w-fit">
                        {popup.ctaLabel || 'Action'} &rarr; {popup.ctaUrl}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(popup)}
                          className="p-1.5 hover:bg-[#EEEEEB] rounded text-[#6B6B67] hover:text-[#111111] transition-colors"
                          title="Edit Pop-up"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(popup.id, popup.title)}
                          className="p-1.5 hover:bg-red-50 rounded text-red-500 hover:text-red-700 transition-colors"
                          title="Delete Pop-up"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Pop-up Modal with Real-time Live Preview */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#D9D9D4] pb-4 mb-6 shrink-0">
              <div>
                <span className="text-[10px] uppercase tracking-architectural font-mono text-[#D85B3F] font-bold">
                  POP-UP CREATOR STUDIO
                </span>
                <h3 className="text-xl font-bold text-[#111111]">
                  {editingId ? 'Edit Event Pop-up' : 'Create New Event Pop-up'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-[#6B6B67] hover:text-[#111111]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Grid: Form Editor on Left, Live Interactive Preview on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto pr-1">
              
              {/* Form Input Columns */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
                
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] mb-1 font-bold">
                    Event Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Free Interior Design Consultation Week"
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] mb-1 font-bold">
                    Event Subtitle / Badge
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. SPECIAL ARCHITECTURAL WORKSHOP"
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] mb-1 font-bold">
                    Message Body *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your special event, consultation booking slots, or discount..."
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                  />
                </div>

                {/* Cloudinary Image Upload or Direct URL */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] mb-1 font-bold">
                    Promotional Banner Image (Optional)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste image URL (https://...) or upload below"
                      className="flex-1 px-3 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-xs font-mono text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                    />
                    {formData.image && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="px-2 py-1 text-xs text-red-500 hover:text-red-700"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EEEEEB] hover:bg-[#D9D9D4] text-[#111111] rounded-[4px] text-xs font-mono cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Upload via Cloudinary'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                    <span className="text-[11px] text-[#6B6B67] font-mono">
                      JPG, PNG, WEBP (Max 10MB)
                    </span>
                  </div>
                </div>

                {/* CTA Settings */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B6B67] mb-1 font-bold">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={formData.ctaLabel}
                      onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
                      placeholder="e.g. Inquire Now"
                      className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B6B67] mb-1 font-bold">
                      CTA Destination URL
                    </label>
                    <input
                      type="text"
                      value={formData.ctaUrl}
                      onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                      placeholder="e.g. #contact or WhatsApp"
                      className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                    />
                  </div>
                </div>

                {/* Schedule & Priority */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B6B67] mb-1 font-bold">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startAt}
                      onChange={(e) => setFormData({ ...formData, startAt: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-xs font-mono text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B6B67] mb-1 font-bold">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endAt}
                      onChange={(e) => setFormData({ ...formData, endAt: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-xs font-mono text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#6B6B67] mb-1 font-bold">
                      Priority (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value, 10) || 1 })}
                      className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-xs font-mono text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                    />
                  </div>
                </div>

                {/* Active switch */}
                <div className="pt-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="activeSwitch"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 accent-[#D85B3F] rounded cursor-pointer"
                  />
                  <label htmlFor="activeSwitch" className="text-xs font-mono uppercase font-bold text-[#111111] cursor-pointer">
                    Enable and make this pop-up LIVE on the website
                  </label>
                </div>

                {/* Form Buttons */}
                <div className="pt-4 border-t border-[#D9D9D4] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-[#EEEEEB] hover:bg-[#D9D9D4] text-[#111111] text-xs font-mono rounded-[4px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D85B3F] hover:bg-[#c44f35] text-white text-xs font-mono font-bold rounded-[4px]"
                  >
                    {editingId ? 'Save Changes' : 'Create Pop-up &rarr;'}
                  </button>
                </div>

              </form>

              {/* Real-time Interactive Preview on Right */}
              <div className="lg:col-span-5 bg-[#EEEEEB] border border-[#D9D9D4] rounded-[6px] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-[#D9D9D4] pb-2">
                    <span className="text-[10px] font-mono uppercase text-[#D85B3F] font-bold flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>LIVE MAIN SITE PREVIEW</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#6B6B67]">
                      {formData.active ? 'Status: Active' : 'Status: Inactive'}
                    </span>
                  </div>

                  {/* Render simulated modal as it appears on live site */}
                  <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-lg p-5 text-center relative overflow-hidden">
                    {/* Simulated close button */}
                    <div className="absolute top-3 right-3 text-[#6B6B67] p-1">
                      <X className="w-4 h-4" />
                    </div>

                    {formData.image && (
                      <div className="mb-4 h-36 rounded-[4px] overflow-hidden bg-black/10">
                        <img 
                          src={formData.image} 
                          alt="Banner" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}

                    <span className="text-[10px] uppercase tracking-architectural text-[#D85B3F] font-mono font-bold block mb-1">
                      {formData.subtitle || 'EVENT ANNOUNCEMENT'}
                    </span>

                    <h4 className="text-lg font-bold text-[#111111] mb-2 leading-tight">
                      {formData.title || 'Your Event Headline'}
                    </h4>

                    <p className="text-xs text-[#6B6B67] leading-relaxed mb-4">
                      {formData.message || 'The full announcement text will appear here describing the event details and dates.'}
                    </p>

                    <div className="py-2.5 px-4 bg-[#111111] text-[#F7F7F5] text-xs font-mono font-bold uppercase tracking-wider rounded-[4px]">
                      {formData.ctaLabel || 'Action Button'} &rarr;
                    </div>

                    <div className="mt-3 text-[10px] font-mono text-[#6B6B67]">
                      Schedule: {formData.startAt} to {formData.endAt}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/60 rounded-[4px] text-[10px] font-mono text-[#6B6B67] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D85B3F] shrink-0" />
                  <span>Visitors will see this popup on first visit and can dismiss it for 24 hours.</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
};
