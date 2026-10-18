import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Public Layout & Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DynamicModal } from './components/ui/DynamicModal';
import { WhatsAppFloatingButton } from './components/ui/WhatsAppFloatingButton';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { EventPopup } from './components/ui/EventPopup';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Lazy-Loaded Admin Pages (Code Splitting for Optimal Performance)
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminEnquiriesPage = lazy(() => import('./pages/admin/AdminEnquiriesPage').then(m => ({ default: m.AdminEnquiriesPage })));
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage').then(m => ({ default: m.AdminProjectsPage })));
const AdminPopupsPage = lazy(() => import('./pages/admin/AdminPopupsPage').then(m => ({ default: m.AdminPopupsPage })));
const AdminServicesPage = lazy(() => import('./pages/admin/AdminServicesPage').then(m => ({ default: m.AdminServicesPage })));
const AdminEventsPage = lazy(() => import('./pages/admin/AdminEventsPage').then(m => ({ default: m.AdminEventsPage })));
const AdminMediaPage = lazy(() => import('./pages/admin/AdminMediaPage').then(m => ({ default: m.AdminMediaPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));

const AdminLoadingFallback = () => (
  <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-[#F7F7F5] font-mono">
    <div className="w-10 h-10 border-2 border-[#D85B3F] border-t-transparent rounded-full animate-spin mb-3"></div>
    <span className="text-xs uppercase tracking-architectural text-[#9E9E99]">
      Loading Control Panel...
    </span>
  </div>
);

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenQuote = () => setQuoteModalOpen(true);
  const handleCloseQuote = () => setQuoteModalOpen(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminWorkspace = isAdminRoute && location.pathname !== '/admin/login';

  return (
    <div className={`${isAdminWorkspace ? 'h-screen overflow-hidden' : 'min-h-screen'} bg-[#F7F7F5] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-[#F7F7F5]`}>
      {/* Full-Page Initial Architectural Loading Screen (only on public home entry) */}
      {!isAdminRoute && isLoading && (
        <LoadingScreen onFinish={() => setIsLoading(false)} />
      )}

      {/* Sticky Architectural Navbar for Public Site */}
      {!isAdminRoute && (
        <Navbar onOpenQuoteModal={handleOpenQuote} />
      )}

      {/* Dynamic Route Pages */}
      <Suspense fallback={isAdminRoute ? <AdminLoadingFallback /> : null}>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<HomePage onOpenQuoteModal={handleOpenQuote} />} />
          <Route path="/projects/:id" element={<ProjectDetailPage onOpenQuoteModal={handleOpenQuote} />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute>
                <AdminEnquiriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <AdminProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/popups"
            element={
              <ProtectedRoute>
                <AdminPopupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <AdminServicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <AdminEventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/media"
            element={
              <ProtectedRoute>
                <AdminMediaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminSettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Route Aliases & Fallbacks to prevent 404s */}
          <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/admin-page" element={<Navigate to="/admin" replace />} />
          <Route path="/adminpage" element={<Navigate to="/admin" replace />} />
          <Route path="/login" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {/* Public Architectural Footer */}
      {!isAdminRoute && (
        <Footer onOpenQuoteModal={handleOpenQuote} />
      )}

      {/* Floating Sticky WhatsApp Button on Public Site */}
      {!isAdminRoute && (
        <WhatsAppFloatingButton />
      )}

      {/* Live Event Pop-up announcement modal */}
      {!isAdminRoute && (
        <EventPopup />
      )}

      {/* Global Consultation Modal */}
      <DynamicModal isOpen={quoteModalOpen} onClose={handleCloseQuote} />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
