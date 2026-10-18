import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { eventService } from '../../services/eventService';
import { 
  CalendarCheck, 
  Plus, 
  Edit, 
  Trash2, 
  X
} from 'lucide-react';

export const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const initialForm = {
    title: '',
    slug: '',
    description: '',
    image: '',
    ctaLabel: 'Register Attendance',
    ctaUrl: '#contact',
    startAt: new Date().toISOString().slice(0, 10),
    endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    status: 'published',
    displayOrder: 1
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    setLoading(true);
    try {
      const data = await eventService.getAllEventsAdmin();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to load events.' });
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title || '',
      slug: event.slug || '',
      description: event.description || '',
      image: event.image || '',
      ctaLabel: event.ctaLabel || 'Register Attendance',
      ctaUrl: event.ctaUrl || '#contact',
      startAt: event.startAt ? event.startAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
      endAt: event.endAt ? event.endAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
      status: event.status || 'published',
      displayOrder: event.displayOrder || 1
    });
    setShowModal(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete event "${title}"?`)) return;
    try {
      await eventService.deleteEvent(id);
      setStatusMessage({ type: 'success', text: 'Event removed.' });
      loadEvents();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await eventService.updateEvent(editingId, formData);
        setStatusMessage({ type: 'success', text: 'Event updated successfully.' });
      } else {
        await eventService.createEvent(formData);
        setStatusMessage({ type: 'success', text: 'New event published.' });
      }
      setShowModal(false);
      loadEvents();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <AdminLayout title="Events &amp; Exhibitions Schedule">
      
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
            Scheduled Studio Events
          </h2>
          <p className="text-xs text-[#6B6B67] mt-0.5">
            Manage site walk-through dates, client workshop sessions, and exhibitions.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#D85B3F] hover:bg-[#c44f35] text-white text-xs font-mono font-bold rounded-[4px] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Events Table */}
      <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#6B6B67]">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <CalendarCheck className="w-8 h-8 text-[#6B6B67] mx-auto" />
            <h3 className="text-sm font-bold text-[#111111]">No Events Scheduled</h3>
            <p className="text-xs text-[#6B6B67]">Create site visit days or design consultations.</p>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-[#111111] text-white rounded text-xs font-mono"
            >
              Add First Event &rarr;
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEEEEB] border-b border-[#D9D9D4] text-[11px] font-mono text-[#6B6B67] uppercase">
                  <th className="py-3 px-6">Event Title</th>
                  <th className="py-3 px-6">Dates</th>
                  <th className="py-3 px-6">Call to Action</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D9D4] text-xs">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-white/70 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#111111]">
                      {ev.title}
                      <span className="block text-[11px] text-[#6B6B67] font-normal truncate max-w-xs">
                        {ev.description}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[11px] text-[#6B6B67]">
                      {ev.startAt ? ev.startAt.slice(0, 10) : ''} to {ev.endAt ? ev.endAt.slice(0, 10) : ''}
                    </td>
                    <td className="py-4 px-6 font-mono text-[11px]">
                      {ev.ctaLabel} &rarr; {ev.ctaUrl}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                        {ev.status?.toUpperCase() || 'PUBLISHED'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(ev)}
                          className="p-1.5 hover:bg-[#EEEEEB] rounded text-[#6B6B67] hover:text-[#111111]"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ev.id, ev.title)}
                          className="p-1.5 hover:bg-red-50 rounded text-red-500"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xl p-6">
            <div className="flex items-center justify-between border-b border-[#D9D9D4] pb-4 mb-4">
              <h3 className="text-lg font-bold text-[#111111]">
                {editingId ? 'Edit Event' : 'Add New Event'}
              </h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase text-[#6B6B67] font-bold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Noida Property Interior Expo"
                  className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111]"
                />
              </div>

              <div>
                <label className="block uppercase text-[#6B6B67] font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-[#6B6B67] font-bold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startAt}
                    onChange={(e) => setFormData({ ...formData, startAt: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded"
                  />
                </div>
                <div>
                  <label className="block uppercase text-[#6B6B67] font-bold mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endAt}
                    onChange={(e) => setFormData({ ...formData, endAt: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#D9D9D4]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#EEEEEB] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D85B3F] text-white font-bold rounded"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};
