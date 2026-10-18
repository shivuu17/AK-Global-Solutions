import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { mediaService } from '../../services/mediaService';
import { 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  AlertCircle, 
  X
} from 'lucide-react';

export const AdminMediaPage = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState('project');
  const [altText, setAltText] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const isConfigured = mediaService.isCloudinaryConfigured();

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    setLoading(true);
    try {
      const list = await mediaService.getMediaList();
      setMediaList(list);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to load media catalog.' });
    } finally {
      setLoading(false);
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMessage({ type: '', text: '' });

    try {
      await mediaService.uploadImage(file, category, altText);
      setStatusMessage({ type: 'success', text: 'Image uploaded to Cloudinary CDN successfully!' });
      setAltText('');
      loadMedia();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image record from the catalog?')) return;
    try {
      await mediaService.deleteMedia(id);
      setStatusMessage({ type: 'success', text: 'Media record removed.' });
      loadMedia();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <AdminLayout title="Media CDN & Cloudinary Asset Library">
      
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

      {/* Cloudinary Integration Status Card */}
      {!isConfigured && (
        <div className="mb-8 p-6 bg-amber-50 border border-amber-300 rounded-[6px] text-xs">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900 mb-1">
                Cloudinary Free Tier Setup Instructions
              </h4>
              <p className="text-amber-800 mb-3 leading-relaxed">
                To enable direct image uploads from this admin panel without consuming backend bandwidth:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-amber-900 font-mono text-[11px]">
                <li>Sign up for free at <a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="underline font-bold">Cloudinary.com</a>.</li>
                <li>Go to <strong>Settings &gt; Upload &gt; Upload Presets</strong> and click <strong>Add Upload Preset</strong>.</li>
                <li>Set Signing Mode to <strong>Unsigned</strong> and name it <code>ak_global_admin_preset</code>.</li>
                <li>Copy your Cloud Name and set <code>VITE_CLOUDINARY_CLOUD_NAME</code> and <code>VITE_CLOUDINARY_UPLOAD_PRESET</code> in your <code>.env.local</code> / Vercel settings.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 sm:p-8 mb-8 shadow-2xs">
        <h3 className="text-base font-bold text-[#111111] mb-1">
          Upload New Architectural Photography
        </h3>
        <p className="text-xs text-[#6B6B67] mb-6">
          High-resolution photos will be automatically served in WebP/AVIF with global CDN caching.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-[#6B6B67] font-bold mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-xs font-mono"
            >
              <option value="project">Project Case Study</option>
              <option value="gallery">Project Gallery</option>
              <option value="popups">Event Pop-up Banner</option>
              <option value="services">Service Capability</option>
              <option value="general">General Studio</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-mono uppercase text-[#6B6B67] font-bold mb-1">
              Alt Description (For SEO &amp; Accessibility)
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="e.g. Modern kitchen with solid oak island and linear recessed lighting"
              className="w-full px-3 py-2 bg-white border border-[#D9D9D4] rounded text-xs"
            />
          </div>
        </div>

        {/* Drop Zone Box */}
        <label className="border-2 border-dashed border-[#D9D9D4] hover:border-[#D85B3F] bg-white rounded-[6px] p-8 flex flex-col items-center justify-center cursor-pointer transition-colors group">
          <div className="p-3 bg-[#F7F7F5] group-hover:bg-[#D85B3F] group-hover:text-white rounded-full text-[#111111] transition-colors mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-[#111111] group-hover:text-[#D85B3F] transition-colors">
            {uploading ? 'Uploading to Cloudinary...' : 'Click to select photo or drag here'}
          </span>
          <span className="text-[11px] font-mono text-[#6B6B67] mt-1">
            PNG, JPG, WEBP, AVIF up to 10MB
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Media Catalog Gallery */}
      <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-6 border-b border-[#D9D9D4] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#111111]">
              Asset Library Catalog
            </h3>
            <p className="text-xs text-[#6B6B67] mt-0.5">
              Click "Copy URL" to easily use any photo in your projects or event pop-ups.
            </p>
          </div>
          <span className="text-xs font-mono text-[#6B6B67]">
            {mediaList.length} assets recorded
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#6B6B67]">
            Loading media catalog...
          </div>
        ) : mediaList.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <ImageIcon className="w-8 h-8 text-[#6B6B67] mx-auto" />
            <h4 className="text-sm font-bold text-[#111111]">No Media Records Found</h4>
            <p className="text-xs text-[#6B6B67] max-w-sm mx-auto">
              Upload photography above using Cloudinary to manage your image assets in one place.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaList.map((item) => (
              <div key={item.id} className="bg-white border border-[#D9D9D4] rounded-[4px] overflow-hidden group shadow-2xs flex flex-col justify-between">
                <div className="h-40 overflow-hidden bg-black/5 relative">
                  <img 
                    src={item.url} 
                    alt={item.alt || ''} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-1.5 py-0.5 bg-black/70 text-white rounded text-[9px] font-mono uppercase">
                      {item.format || 'img'}
                    </span>
                  </div>
                </div>

                <div className="p-3 space-y-2 text-xs">
                  <div className="text-[11px] font-mono text-[#6B6B67] truncate" title={item.alt || item.publicId}>
                    {item.alt || item.publicId || 'Photo'}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item.url)}
                      className="flex-1 py-1.5 px-2 bg-[#EEEEEB] hover:bg-[#111111] hover:text-white rounded text-[10px] font-mono font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedUrl === item.url ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.publicId)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </AdminLayout>
  );
};
