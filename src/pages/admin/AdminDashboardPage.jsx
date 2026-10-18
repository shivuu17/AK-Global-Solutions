import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { enquiryService } from '../../services/enquiryService';
import { projectService } from '../../services/projectService';
import { popupService } from '../../services/popupService';
import { isFirebaseConfigured } from '../../lib/firebase';
import { mediaService } from '../../services/mediaService';
import { 
  Inbox, 
  FolderKanban, 
  Megaphone, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    newEnquiries: 0,
    totalProjects: 0,
    activePopups: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [enquiryStats, enquiries, projects, popups] = await Promise.all([
          enquiryService.getEnquiryStats(),
          enquiryService.getEnquiries('All'),
          projectService.getAllProjectsAdmin(),
          popupService.getActivePopups()
        ]);

        setStats({
          totalEnquiries: enquiryStats.total || enquiries.length,
          newEnquiries: enquiryStats.new || 0,
          totalProjects: projects.length,
          activePopups: popups.length
        });

        setRecentEnquiries(enquiries.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">NEW</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300">CONTACTED</span>;
      case 'qualified':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-800 border border-purple-300">QUALIFIED</span>;
      case 'converted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">CONVERTED</span>;
      case 'closed':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-gray-100 text-gray-800 border border-gray-300">CLOSED</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono text-gray-600 border border-gray-200">{status}</span>;
    }
  };

  const firebaseReady = isFirebaseConfigured();
  const cloudinaryReady = mediaService.isCloudinaryConfigured();

  return (
    <AdminLayout title="Overview & Performance">
      
      {/* System Integration Status Banner */}
      {(!firebaseReady || !cloudinaryReady) && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-300 rounded-[6px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Setup Configuration Checklist
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                {!firebaseReady && '• Firebase credentials not yet set (running in local fallback mode). '}
                {!cloudinaryReady && '• Cloudinary upload credentials not yet set in environment. '}
              </p>
            </div>
          </div>
          <Link
            to="/admin/settings"
            className="text-xs font-mono font-bold text-amber-900 underline hover:text-black shrink-0"
          >
            Review Setup Instructions &rarr;
          </Link>
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Inquiries */}
        <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase font-mono tracking-wider text-[#6B6B67] font-bold">
              TOTAL ENQUIRIES
            </span>
            <div className="p-2 bg-[#EEEEEB] rounded-[4px] text-[#111111]">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#111111] mb-1">
            {loading ? '...' : stats.totalEnquiries}
          </div>
          <span className="text-xs text-[#6B6B67]">
            Client quote requests received
          </span>
        </div>

        {/* Actionable New Leads */}
        <div className="bg-[#F7F7F5] border-2 border-[#D85B3F] rounded-[6px] p-6 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#D85B3F]/10 rounded-bl-full pointer-events-none"></div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase font-mono tracking-wider text-[#D85B3F] font-bold">
              NEW ACTIONABLE LEADS
            </span>
            <div className="p-2 bg-[#D85B3F] text-white rounded-[4px]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#D85B3F] mb-1">
            {loading ? '...' : stats.newEnquiries}
          </div>
          <span className="text-xs text-[#6B6B67]">
            Pending initial phone / WhatsApp response
          </span>
        </div>

        {/* Portfolio Projects */}
        <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase font-mono tracking-wider text-[#6B6B67] font-bold">
              PORTFOLIO PROJECTS
            </span>
            <div className="p-2 bg-[#EEEEEB] rounded-[4px] text-[#111111]">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#111111] mb-1">
            {loading ? '...' : stats.totalProjects}
          </div>
          <span className="text-xs text-[#6B6B67]">
            Documented architectural cases
          </span>
        </div>

        {/* Active Event Pop-ups */}
        <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase font-mono tracking-wider text-[#6B6B67] font-bold">
              ACTIVE EVENT POP-UPS
            </span>
            <div className="p-2 bg-[#EEEEEB] rounded-[4px] text-[#111111]">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#111111] mb-1">
            {loading ? '...' : stats.activePopups}
          </div>
          <span className="text-xs text-[#6B6B67]">
            Announcements live on main website
          </span>
        </div>

      </div>

      {/* Quick Actions Ribbon */}
      <div className="bg-[#111111] text-[#F7F7F5] rounded-[6px] p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#D85B3F] uppercase block mb-1">
            QUICK CREATION HUBS
          </span>
          <h3 className="text-xl font-bold tracking-tight">
            Manage Website Content &amp; Promotions
          </h3>
          <p className="text-xs text-[#9E9E99] max-w-lg mt-1">
            Create an announcement pop-up for upcoming site events, upload new transformation photography to Cloudinary, or publish a new architectural project.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/admin/popups"
            className="px-4 py-2.5 bg-[#D85B3F] hover:bg-[#c44f35] text-white text-xs font-mono font-bold rounded-[4px] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event Pop-up</span>
          </Link>

          <Link
            to="/admin/projects"
            className="px-4 py-2.5 bg-[#262626] hover:bg-[#333333] text-[#F7F7F5] text-xs font-mono font-medium rounded-[4px] transition-colors flex items-center gap-2 border border-[#3D3D3D]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>

          <Link
            to="/admin/media"
            className="px-4 py-2.5 bg-[#262626] hover:bg-[#333333] text-[#F7F7F5] text-xs font-mono font-medium rounded-[4px] transition-colors border border-[#3D3D3D]"
          >
            <span>Upload Photos</span>
          </Link>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-[#F7F7F5] border border-[#D9D9D4] rounded-[6px] shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-[#D9D9D4] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#111111]">
              Recent Client Enquiries
            </h3>
            <p className="text-xs text-[#6B6B67] mt-0.5">
              Latest quote inquiries received from the public website
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-mono font-bold text-[#D85B3F] hover:underline flex items-center gap-1"
          >
            <span>View All ({stats.totalEnquiries})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#6B6B67]">
            Loading enquiries...
          </div>
        ) : recentEnquiries.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#6B6B67]">
            No enquiries recorded yet. Test by submitting the contact form on the home page!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEEEEB] border-b border-[#D9D9D4] text-[11px] font-mono text-[#6B6B67] uppercase">
                  <th className="py-3 px-6">Client Name</th>
                  <th className="py-3 px-6">Contact Phone</th>
                  <th className="py-3 px-6">Service Requested</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D9D4] text-xs">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-white/70 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#111111]">
                      {enq.name}
                      {enq.email && (
                        <span className="block text-[11px] text-[#6B6B67] font-normal font-mono">
                          {enq.email}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-mono text-[#111111]">
                      <a href={`tel:${enq.phone}`} className="hover:text-[#D85B3F]">
                        {enq.phone}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-[#6B6B67]">
                      {enq.service || 'General Consultation'}
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(enq.status)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/admin/enquiries`}
                        className="px-3 py-1.5 bg-[#EEEEEB] hover:bg-[#111111] hover:text-white rounded-[3px] font-mono text-[11px] transition-colors"
                      >
                        Details &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </AdminLayout>
  );
};

