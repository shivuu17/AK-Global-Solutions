import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { enquiryService } from '../../services/enquiryService';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Wrench, 
  Megaphone, 
  CalendarCheck, 
  Inbox, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  ShieldAlert
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';

export const AdminLayout = ({ children, title = 'Dashboard' }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [newEnquiryCount, setNewEnquiryCount] = useState(0);

  useEffect(() => {
    async function checkNewEnquiries() {
      try {
        const stats = await enquiryService.getEnquiryStats();
        setNewEnquiryCount(stats.new || 0);
      } catch (e) {
        // quiet ignore
      }
    }
    checkNewEnquiries();
  }, [location.pathname]);

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { 
      label: 'Enquiries', 
      path: '/admin/enquiries', 
      icon: Inbox, 
      badge: newEnquiryCount > 0 ? newEnquiryCount : null 
    },
    { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { label: 'Services', path: '/admin/services', icon: Wrench },
    { label: 'Event Pop-ups', path: '/admin/popups', icon: Megaphone },
    { label: 'Events', path: '/admin/events', icon: CalendarCheck },
    { label: 'Media CDN', path: '/admin/media', icon: ImageIcon },
    { label: 'Studio Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen w-full bg-[#F0F0ED] text-[#111111] flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#111111] text-[#F7F7F5] px-4 py-3 flex items-center justify-between border-b border-[#262626] shrink-0 z-40">
        <div className="flex items-center gap-2">
          <img src={COMPANY_INFO.logoUrl} alt="Logo" className="h-7 w-auto" />
          <span className="font-extrabold text-sm tracking-tight">AK GLOBAL ADMIN</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 text-[#D9D9D4] hover:text-white focus:outline-none"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation - Fixed & Stationary */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111111] text-[#D9D9D4] flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen shrink-0 overflow-y-auto select-none ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#262626] flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <img 
                src={COMPANY_INFO.logoUrl} 
                alt="Logo" 
                className="h-9 w-auto object-contain bg-white/10 p-1 rounded-[3px]" 
              />
              <div>
                <span className="font-extrabold text-sm text-[#F7F7F5] tracking-tight block">
                  AK GLOBAL
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#D85B3F] uppercase block">
                  MANAGEMENT PORTAL
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-[#6B6B67] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 font-mono text-xs">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-[4px] transition-all font-medium ${
                    active
                      ? 'bg-[#D85B3F] text-white shadow-sm'
                      : 'text-[#9E9E99] hover:bg-[#1C1C1C] hover:text-[#F7F7F5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#111111] text-[#D85B3F] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="p-4 border-t border-[#262626] space-y-3">
          <div className="px-3 py-2 bg-[#1A1A1A] rounded-[4px] flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-[#6B6B67] font-mono block uppercase">Authenticated</span>
              <span className="text-xs text-[#F7F7F5] truncate block font-mono" title={user?.email}>
                {user?.email || 'admin'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#222222] hover:bg-[#2C2C2C] text-[#D9D9D4] rounded-[4px] text-xs font-mono transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 rounded-[4px] text-xs font-mono transition-colors flex items-center gap-1"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace - Independent Scroll Container */}
      <main className="flex-1 flex flex-col h-full min-h-0 min-w-0 overflow-y-auto">
        {/* Workspace Header - Fixed at the top of the working area */}
        <header className="bg-[#F7F7F5] border-b border-[#D9D9D4] px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-architectural font-mono text-[#D85B3F] block font-bold">
              ADMIN CONTROL PANEL
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#6B6B67] hover:text-[#111111] border border-[#D9D9D4] bg-white px-3 py-1.5 rounded-[3px] shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Website</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
};

