import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { enquiryService } from '../../services/enquiryService';
import { 
  Search, 
  Phone, 
  Trash2, 
  MessageSquare, 
  X,
  FileText,
  Save
} from 'lucide-react';

export const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const statusOptions = ['All', 'new', 'contacted', 'qualified', 'converted', 'closed'];

  useEffect(() => {
    loadEnquiries();
  }, [activeTab]);

  async function loadEnquiries() {
    setLoading(true);
    try {
      const data = await enquiryService.getEnquiries(activeTab);
      setEnquiries(data);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to load enquiries.' });
    } finally {
      setLoading(false);
    }
  }

  const handleOpenDetail = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setAdminNotes(enquiry.adminNotes || '');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await enquiryService.updateEnquiryStatus(id, newStatus);
      setStatusMessage({ type: 'success', text: `Status updated to ${newStatus.toUpperCase()}` });
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
      loadEnquiries();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    try {
      await enquiryService.updateAdminNotes(selectedEnquiry.id, adminNotes);
      setStatusMessage({ type: 'success', text: 'Internal admin notes saved!' });
      setSelectedEnquiry({ ...selectedEnquiry, adminNotes });
      loadEnquiries();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id, clientName) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${clientName}"?`)) return;
    try {
      await enquiryService.deleteEnquiry(id);
      setStatusMessage({ type: 'success', text: 'Enquiry removed.' });
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      loadEnquiries();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(query) ||
      item.phone?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.service?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query)
    );
  });

  return (
    <AdminLayout title="Client Enquiries Pipeline">
      
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

      {/* Control Bar: Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EEEEEB] rounded-[4px] border border-[#D9D9D4]">
          {statusOptions.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#111111] text-[#F7F7F5] font-bold shadow-xs'
                  : 'text-[#6B6B67] hover:text-[#111111]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#6B6B67] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, email..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#D9D9D4] rounded-[4px] text-xs font-mono text-[#111111] placeholder-[#9E9E99] focus:outline-none focus:border-[#D85B3F]"
          />
        </div>

      </div>

      {/* Enquiries Table */}
      <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#6B6B67]">
            Loading enquiries...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#6B6B67]">
            No enquiries found matching this criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEEEEB] border-b border-[#D9D9D4] text-[11px] font-mono text-[#6B6B67] uppercase">
                  <th className="py-3 px-6">Client</th>
                  <th className="py-3 px-6">Service Requested</th>
                  <th className="py-3 px-6">Message Preview</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D9D4] text-xs">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/70 transition-colors">
                    
                    {/* Client info */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#111111]">{enq.name}</div>
                      <div className="flex items-center gap-2 mt-0.5 font-mono text-[11px] text-[#6B6B67]">
                        <a href={`tel:${enq.phone}`} className="hover:text-[#D85B3F]">{enq.phone}</a>
                        {enq.email && <span>&bull; {enq.email}</span>}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-4 px-6 text-[#111111] font-medium">
                      {enq.service || 'General Consultation'}
                    </td>

                    {/* Message Preview */}
                    <td className="py-4 px-6 text-[#6B6B67] max-w-xs">
                      <p className="truncate">{enq.message}</p>
                      {enq.adminNotes && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#D85B3F] mt-0.5">
                          <FileText className="w-3 h-3" />
                          <span>Has Internal Notes</span>
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <select
                        value={enq.status || 'new'}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className="text-xs font-mono font-bold bg-white border border-[#D9D9D4] rounded px-2 py-1 focus:outline-none focus:border-[#D85B3F] cursor-pointer"
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="qualified">QUALIFIED</option>
                        <option value="converted">CONVERTED</option>
                        <option value="closed">CLOSED</option>
                      </select>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(enq)}
                          className="px-3 py-1 bg-[#111111] text-[#F7F7F5] rounded text-[11px] font-mono hover:bg-[#D85B3F] transition-colors"
                        >
                          View Lead &rarr;
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id, enq.name)}
                          className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                          title="Delete Enquiry"
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

      {/* Enquiry Detail & Internal Notes Inspection Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#D9D9D4] pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-architectural text-[#D85B3F] font-bold">
                  CLIENT LEAD DOSSIER
                </span>
                <h3 className="text-xl font-bold text-[#111111]">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-[#6B6B67] hover:text-[#111111]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Action Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href={`tel:${selectedEnquiry.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#111111] text-white rounded text-xs font-mono font-bold hover:bg-[#D85B3F] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {selectedEnquiry.phone}</span>
              </a>

              <a
                href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 text-white rounded text-xs font-mono font-bold hover:bg-emerald-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp &rarr;</span>
              </a>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 bg-[#EEEEEB] p-4 rounded border border-[#D9D9D4] text-xs font-mono mb-6">
              <div>
                <span className="text-[#6B6B67] block text-[10px] uppercase">Service Requested</span>
                <span className="font-bold text-[#111111]">{selectedEnquiry.service || 'General'}</span>
              </div>
              <div>
                <span className="text-[#6B6B67] block text-[10px] uppercase">Email</span>
                <span className="font-bold text-[#111111]">{selectedEnquiry.email || 'None'}</span>
              </div>
              <div>
                <span className="text-[#6B6B67] block text-[10px] uppercase">Source Origin</span>
                <span className="text-[#111111]">{selectedEnquiry.sourcePage || '/'}</span>
              </div>
              <div>
                <span className="text-[#6B6B67] block text-[10px] uppercase">Lead Status</span>
                <select
                  value={selectedEnquiry.status || 'new'}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                  className="mt-1 bg-white border border-[#D9D9D4] rounded px-2 py-1 font-bold text-xs"
                >
                  <option value="new">NEW</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="qualified">QUALIFIED</option>
                  <option value="converted">CONVERTED</option>
                  <option value="closed">CLOSED</option>
                </select>
              </div>
            </div>

            {/* Message Body */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase text-[#6B6B67] font-bold mb-2">
                Client Inquiry Details
              </label>
              <div className="p-4 bg-white border border-[#D9D9D4] rounded text-sm text-[#111111] whitespace-pre-wrap leading-relaxed">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Private Admin Notes */}
            <div className="mb-6 pt-4 border-t border-[#D9D9D4]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase text-[#111111] font-bold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#D85B3F]" />
                  <span>Private Internal Studio Notes</span>
                </label>
                <span className="text-[10px] font-mono text-[#6B6B67]">
                  Never shown to visitors
                </span>
              </div>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Log internal site inspection notes, estimated quote amounts, follow-up dates..."
                className="w-full p-3 bg-white border border-[#D9D9D4] rounded text-xs font-mono text-[#111111] focus:outline-none focus:border-[#D85B3F]"
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="px-4 py-1.5 bg-[#111111] hover:bg-[#D85B3F] text-white rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingNotes ? 'Saving Notes...' : 'Save Notes'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
};
