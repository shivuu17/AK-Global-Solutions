import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { serviceDataService } from '../../services/serviceDataService';
import { mediaService } from '../../services/mediaService';
import { 
  Wrench, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Check, 
  X, 
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [capabilityInput, setCapabilityInput] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const initialForm = {
    title: '',
    number: '06',
    shortDesc: '',
    fullDesc: '',
    capabilities: [],
    image: '',
    modelLayer: 'interior',
    displayOrder: 6,
    status: 'published'
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    try {
      const data = await serviceDataService.getAllServicesAdmin();
      setServices(data);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to load services.' });
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title || '',
      number: service.number || '01',
      shortDesc: service.shortDesc || '',
      fullDesc: service.fullDesc || '',
      capabilities: Array.isArray(service.capabilities) ? service.capabilities : [],
      image: service.image || '',
      modelLayer: service.modelLayer || 'interior',
      displayOrder: service.displayOrder || 1,
      status: service.status || 'published'
    });
    setShowModal(true);
  };

  const handleAddCapability = () => {
    if (!capabilityInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      capabilities: [...prev.capabilities, capabilityInput.trim()]
    }));
    setCapabilityInput('');
  };

  const handleRemoveCapability = (idx) => {
    setFormData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await serviceDataService.updateService(editingId, formData);
        setStatusMessage({ type: 'success', text: 'Service details updated successfully!' });
      } else {
        await serviceDataService.createService(formData);
        setStatusMessage({ type: 'success', text: 'New service created successfully!' });
      }
      setShowModal(false);
      loadServices();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <AdminLayout title="Services & Studio Capabilities">
      
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
            Capabilities &amp; Deliverables
          </h2>
          <p className="text-xs text-[#6B6B67] mt-0.5">
            Configure architectural and execution services displayed in the 3D model visualizer on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#D85B3F] hover:bg-[#c44f35] text-white text-xs font-mono font-bold rounded-[4px] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 text-center text-xs font-mono text-[#6B6B67]">
            Loading services...
          </div>
        ) : (
          services.map((srv) => (
            <div key={srv.id} className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-bold text-[#D85B3F]">
                    {srv.number || '01'}
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-[#EEEEEB] px-2 py-0.5 rounded text-[#6B6B67]">
                    3D Layer: {srv.modelLayer || 'interior'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111111] mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#6B6B67] leading-relaxed mb-4">
                  {srv.shortDesc}
                </p>

                {srv.capabilities && srv.capabilities.length > 0 && (
                  <div className="space-y-1 mb-4 pt-3 border-t border-[#D9D9D4]">
                    <span className="text-[10px] font-mono uppercase text-[#6B6B67] block mb-1">
                      Deliverables ({srv.capabilities.length})
                    </span>
                    {srv.capabilities.slice(0, 3).map((cap, idx) => (
                      <div key={idx} className="text-xs text-[#111111] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D85B3F]"></span>
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                    {srv.capabilities.length > 3 && (
                      <span className="text-[10px] text-[#6B6B67] font-mono">
                        +{srv.capabilities.length - 3} more...
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#D9D9D4] flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="px-3 py-1.5 bg-[#111111] text-white hover:bg-[#D85B3F] text-xs font-mono rounded flex items-center gap-1.5 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Service</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Service Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#D9D9D4] pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#D85B3F] font-bold">
                  SERVICE SPECIFICATION
                </span>
                <h3 className="text-xl font-bold text-[#111111]">
                  {editingId ? 'Edit Service' : 'Add New Service'}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-[#6B6B67] hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                    Number Index
                  </label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    placeholder="01"
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                  Short Tagline
                </label>
                <input
                  type="text"
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="One sentence summary for services grid"
                  className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                  Full Description &amp; Scope
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                    3D Model Layer Key
                  </label>
                  <select
                    value={formData.modelLayer}
                    onChange={(e) => setFormData({ ...formData, modelLayer: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-xs font-mono"
                  >
                    <option value="interior">Interior (Furniture & Lighting)</option>
                    <option value="carpentry">Carpentry (Timber Joinery & Kitchen)</option>
                    <option value="renovation">Renovation (Civil Structure & Walls)</option>
                    <option value="painting">Painting (Texture Surfaces & Steel)</option>
                    <option value="complete">Complete (Full Handover)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-xs font-mono"
                  />
                </div>
              </div>

              {/* Scope Deliverables List */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                  Key Scope Deliverables
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={capabilityInput}
                    onChange={(e) => setCapabilityInput(e.target.value)}
                    placeholder="e.g. Modular Kitchen Design & Installation"
                    className="flex-1 px-3 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddCapability}
                    className="px-3 py-1.5 bg-[#111111] text-white rounded text-xs font-mono"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center justify-between px-3 py-1 bg-white rounded border border-[#D9D9D4] text-xs">
                      <span>• {cap}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCapability(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#D9D9D4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#EEEEEB] hover:bg-[#D9D9D4] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D85B3F] hover:bg-[#c44f35] text-white text-xs font-mono font-bold rounded"
                >
                  Save Service &rarr;
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </AdminLayout>
  );
};

