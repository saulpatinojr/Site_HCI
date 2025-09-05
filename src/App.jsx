import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import FoundationalPostsPage from '@/pages/FoundationalPostsPage';
import VisualizingComplexityPage from '@/pages/VisualizingComplexityPage';
import AudioArchitecturePage from '@/pages/AudioArchitecturePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ManagementGuidePage from '@/pages/ManagementGuidePage';
import { DataProvider } from '@/context/DataContext';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import ArchitectureDesignsPage from '@/pages/ArchitectureDesignsPage';
import BestPracticesPage from '@/pages/BestPracticesPage';
import FrameworksPage from '@/pages/FrameworksPage';
import LoginPage from '@/pages/LoginPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import WalkthroughItemPage from '@/pages/WalkthroughItemPage';
import CertificationsPage from '@/pages/CertificationsPage';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-bg-dark">
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/foundational-posts" element={<FoundationalPostsPage />} />
          <Route path="/visualizing-complexity" element={<VisualizingComplexityPage />} />
          <Route path="/audio-architecture" element={<AudioArchitecturePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/architecture-designs" element={<ArchitectureDesignsPage />} />
          <Route path="/best-practices" element={<BestPracticesPage />} />
          <Route path="/frameworks" element={<FrameworksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/walkthrough/:slug" element={<WalkthroughItemPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route 
            path="/management-guide" 
            element={
              <ProtectedRoute>
                <ManagementGuidePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Toaster />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <DataProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;