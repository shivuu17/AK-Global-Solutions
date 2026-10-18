import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { projectService } from '../../services/projectService';
import { mediaService } from '../../services/mediaService';
import { 
  FolderKanban, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  X, 
  ExternalLink
} from 'lucide-react';

export const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const initialForm = {
    title: '',
    slug: '',
    category: 'Residential',
    location: 'Noida (UP)',
    year: new Date().getFullYear().toString(),
    clientType: 'Private Client',
    scope: 'Full Renovation & Interior Architecture',
    area: '2,500 sq ft',
    tagline: '',
    description: '',
    coverImage: '',
    beforeAfter: {
      before: '',
      after: '',
      caption: ''
    },
    gallery: [],
    features: ['Custom modular joinery', 'Architectural lighting design'],
    isFeatured: true,
    aspect: 'large',
    status: 'published',
    displayOrder: 1,
  };

  const [formData, setFormData] = useState(initialForm);
  const [featureInput, setFeatureInput] = useState('');

  const categories = ['Residential', 'Commercial', 'Renovation', 'Interior', 'Carpentry'];

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await projectService.getAllProjectsAdmin();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to load projects.' });
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title || '',
      slug: project.slug || project.id || '',
      category: project.category || 'Residential',
      location: project.location || '',
      year: project.year || '',
      clientType: project.clientType || '',
      scope: project.scope || '',
      area: project.area || '',
      tagline: project.tagline || '',
      description: project.description || '',
      coverImage: project.coverImage || '',
      beforeAfter: project.beforeAfter || { before: '', after: '', caption: '' },
      gallery: Array.isArray(project.gallery) ? project.gallery : [],
      features: Array.isArray(project.features) ? project.features : [],
      isFeatured: Boolean(project.isFeatured),
      aspect: project.aspect || 'large',
      status: project.status || 'published',
      displayOrder: project.displayOrder || 1,
    });
    setShowModal(true);
  };

  const handleTogglePublish = async (project) => {
    try {
      const newStatus = await projectService.toggleProjectPublish(project.id, project.status);
      setStatusMessage({
        type: 'success',
        text: `Project "${project.title}" is now ${newStatus.toUpperCase()}.`
      });
      loadProjects();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}"?`)) return;
    try {
      await projectService.deleteProject(id);
      setStatusMessage({ type: 'success', text: 'Project deleted successfully.' });
      loadProjects();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const result = await mediaService.uploadImage(file, 'projects', formData.title);
      setFormData((prev) => ({ ...prev, coverImage: result.url }));
      setStatusMessage({ type: 'success', text: 'Cover image uploaded to Cloudinary!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingGallery(true);
    try {
      const result = await mediaService.uploadImage(file, 'gallery', formData.title);
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, result.url]
      }));
      setStatusMessage({ type: 'success', text: 'Gallery photo uploaded to Cloudinary!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()]
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const handleRemoveGalleryImage = (idx) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await projectService.updateProject(editingId, formData);
        setStatusMessage({ type: 'success', text: 'Project updated successfully!' });
      } else {
        await projectService.createProject(formData);
        setStatusMessage({ type: 'success', text: 'New project created successfully!' });
      }
      setShowModal(false);
      loadProjects();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <AdminLayout title="Architectural Projects Portfolio">
      
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
            Documented Portfolio Case Studies
          </h2>
          <p className="text-xs text-[#6B6B67] mt-0.5">
            Add, update, or rearrange architectural transformations, millwork projects, and civil contracts.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#D85B3F] hover:bg-[#c44f35] text-white text-xs font-mono font-bold rounded-[4px] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid Table */}
      <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#6B6B67]">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <FolderKanban className="w-8 h-8 text-[#6B6B67] mx-auto" />
            <h3 className="text-sm font-bold text-[#111111]">No Projects Available</h3>
            <p className="text-xs text-[#6B6B67]">Add your first project to publish on the website.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEEEEB] border-b border-[#D9D9D4] text-[11px] font-mono text-[#6B6B67] uppercase">
                  <th className="py-3 px-6">Project Title</th>
                  <th className="py-3 px-6">Category & Location</th>
                  <th className="py-3 px-6">Order</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D9D4] text-xs">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-white/70 transition-colors">
                    
                    {/* Project Title + Cover Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img 
                          src={proj.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80'} 
                          alt="" 
                          className="w-14 h-12 object-cover rounded-[3px] border border-[#D9D9D4] shrink-0" 
                        />
                        <div>
                          <div className="font-bold text-[#111111] flex items-center gap-2">
                            <span>{proj.title}</span>
                            {proj.isFeatured && (
                              <span className="p-0.5 bg-amber-100 text-amber-700 rounded text-[9px] font-mono font-bold uppercase">
                                Featured
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#6B6B67] font-mono block">
                            ID: {proj.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category & Location */}
                    <td className="py-4 px-6">
                      <span className="font-mono text-xs text-[#111111] font-bold block">
                        {proj.category}
                      </span>
                      <span className="text-[11px] text-[#6B6B67]">
                        {proj.location} ({proj.year})
                      </span>
                    </td>

                    {/* Display Order */}
                    <td className="py-4 px-6 font-mono text-xs">
                      #{proj.displayOrder || 1}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleTogglePublish(proj)}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                          proj.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {proj.status === 'published' ? '● PUBLISHED' : '○ DRAFT'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/projects/${proj.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 hover:bg-[#EEEEEB] rounded text-[#6B6B67] hover:text-[#111111]"
                          title="View on site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(proj)}
                          className="p-1.5 hover:bg-[#EEEEEB] rounded text-[#6B6B67] hover:text-[#111111]"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="p-1.5 hover:bg-red-50 text-red-500 rounded"
                          title="Delete Project"
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

      {/* Project Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#D9D9D4] pb-4 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-architectural font-mono text-[#D85B3F] font-bold">
                  PROJECT SPECIFICATION EDITOR
                </span>
                <h3 className="text-xl font-bold text-[#111111]">
                  {editingId ? 'Edit Project' : 'Create New Project'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-[#6B6B67] hover:text-[#111111]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Elysian Private Residence"
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                  Tagline / Aesthetic Philosophy
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Minimalist concrete, warm oak timber, and tailored architectural lighting."
                  className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-1">
                  Comprehensive Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe structural alterations, joinery details, timeline, and spatial solutions..."
                  className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111] focus:outline-none focus:border-[#D85B3F]"
                />
              </div>

              {/* Cover Image Upload & URL */}
              <div className="p-4 bg-[#EEEEEB] rounded border border-[#D9D9D4]">
                <label className="block text-xs font-mono uppercase text-[#111111] font-bold mb-2">
                  Hero Cover Image (Cloudinary or URL) *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="url"
                    required
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/... or upload"
                    className="flex-1 px-3 py-2 bg-white border border-[#D9D9D4] rounded text-xs font-mono"
                  />
                  <label className="px-3 py-2 bg-[#111111] hover:bg-[#D85B3F] text-white rounded text-xs font-mono cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingCover ? 'Uploading...' : 'Cloudinary Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverUpload}
                      disabled={uploadingCover}
                    />
                  </label>
                </div>
                {formData.coverImage && (
                  <div className="h-32 rounded overflow-hidden border border-[#D9D9D4] w-fit">
                    <img src={formData.coverImage} alt="Cover preview" className="h-full w-auto object-cover" />
                  </div>
                )}
              </div>

              {/* Before / After Renovation Configuration */}
              <div className="p-4 bg-[#EEEEEB] rounded border border-[#D9D9D4] space-y-3">
                <span className="text-xs font-mono uppercase font-bold text-[#111111] block">
                  Before &amp; After Renovation Slider (Optional)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#6B6B67] block mb-1">Before Image URL</label>
                    <input
                      type="url"
                      value={formData.beforeAfter.before}
                      onChange={(e) => setFormData({
                        ...formData,
                        beforeAfter: { ...formData.beforeAfter, before: e.target.value }
                      })}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#6B6B67] block mb-1">After Image URL</label>
                    <input
                      type="url"
                      value={formData.beforeAfter.after}
                      onChange={(e) => setFormData({
                        ...formData,
                        beforeAfter: { ...formData.beforeAfter, after: e.target.value }
                      })}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#6B6B67] block mb-1">Caption</label>
                  <input
                    type="text"
                    value={formData.beforeAfter.caption}
                    onChange={(e) => setFormData({
                      ...formData,
                      beforeAfter: { ...formData.beforeAfter, caption: e.target.value }
                    })}
                    placeholder="e.g. Living room partition wall removed and replaced with flush oak cabinetry"
                    className="w-full px-3 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs"
                  />
                </div>
              </div>

              {/* Metrics & Scope */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#6B6B67] font-bold mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#6B6B67] font-bold mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#6B6B67] font-bold mb-1">Total Area</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#6B6B67] font-bold mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs font-mono"
                  />
                </div>
              </div>

              {/* Gallery Photos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase text-[#6B6B67] font-bold">
                    Project Gallery Photos ({formData.gallery.length})
                  </label>
                  <label className="inline-flex items-center gap-1 text-[11px] font-mono text-[#D85B3F] hover:underline cursor-pointer">
                    <Upload className="w-3 h-3" />
                    <span>Upload to Gallery</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleGalleryUpload}
                      disabled={uploadingGallery}
                    />
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.gallery.map((img, idx) => (
                    <div key={idx} className="relative group w-20 h-20 rounded overflow-hidden border border-[#D9D9D4]">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute inset-0 bg-red-900/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights & Deliverables */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-2">
                  Craftsmanship Highlights &amp; Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="e.g. Concealed pivot door leading to private study"
                    className="flex-1 px-3 py-1.5 bg-white border border-[#D9D9D4] rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-1.5 bg-[#111111] text-white rounded text-xs font-mono"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center justify-between px-3 py-1.5 bg-white rounded border border-[#D9D9D4] text-xs">
                      <span>• {feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2 border-t border-[#D9D9D4]">
                <label className="inline-flex items-center gap-2 text-xs font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.status === 'published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                    className="w-4 h-4 accent-[#D85B3F]"
                  />
                  <span className="font-bold">Publish to Website</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-[#D85B3F]"
                  />
                  <span className="font-bold">Spotlight on Homepage (Featured)</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#D9D9D4] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-[#EEEEEB] hover:bg-[#D9D9D4] text-[#111111] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D85B3F] hover:bg-[#c44f35] text-white text-xs font-mono font-bold rounded"
                >
                  {editingId ? 'Save Project Changes' : 'Create & Publish Project &rarr;'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </AdminLayout>
  );
};
