import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DynamicModal } from './components/ui/DynamicModal';
import { WhatsAppFloatingButton } from './components/ui/WhatsAppFloatingButton';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const handleOpenQuote = () => setQuoteModalOpen(true);
  const handleCloseQuote = () => setQuoteModalOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#F7F7F5] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-[#F7F7F5]">
        {/* Sticky Architectural Navbar */}
        <Navbar onOpenQuoteModal={handleOpenQuote} />

        {/* Dynamic Route Pages */}
        <Routes>
          <Route path="/" element={<HomePage onOpenQuoteModal={handleOpenQuote} />} />
          <Route path="/projects/:id" element={<ProjectDetailPage onOpenQuoteModal={handleOpenQuote} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Architectural Footer */}
        <Footer onOpenQuoteModal={handleOpenQuote} />

        {/* Floating Sticky WhatsApp Button (Bottom-Right) */}
        <WhatsAppFloatingButton />

        {/* Global Consultation Modal */}
        <DynamicModal isOpen={quoteModalOpen} onClose={handleCloseQuote} />
      </div>
    </Router>
  );
}

export default App;
