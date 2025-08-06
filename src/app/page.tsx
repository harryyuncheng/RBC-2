'use client';

import { useState, useRef } from 'react';
import RBCHeader from '../components/RBCHeader';
import RBCMainContent from '../components/RBCMainContent';
import ViewToggle from '../components/ViewToggle';
import CurtisOverlay from '../components/CurtisOverlay';
import PermissionGate from '../components/PermissionGate';
import SupportSettings from '../components/SupportSettings';
import PageRouter, { PageType } from '../components/pages/PageRouter';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const permissionResetRef = useRef<(() => void) | null>(null);

  const { currentPage, setCurrentPage, PageComponent } = PageRouter({ isMobile });

  const handleViewToggle = () => {
    setIsMobile(!isMobile);
    setIsMobileMenuOpen(false); // Close mobile menu when switching views
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSupportToggle = () => {
    setIsSupportOpen(!isSupportOpen);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page as PageType);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'max-w-sm mx-auto bg-white' : ''}`}>
      {/* Support Settings Panel - Only visible to advisors */}
      <SupportSettings 
        isOpen={isSupportOpen} 
        onToggle={handleSupportToggle}
        onResetDemo={() => permissionResetRef.current?.()}
      />

      {/* View Toggle Button */}
      <ViewToggle 
        isMobile={isMobile} 
        onToggle={handleViewToggle}
      />

      {/* Curtis Assistant Overlay with Permission Gate */}
      <PermissionGate onResetRef={permissionResetRef}>
        <CurtisOverlay />
      </PermissionGate>

      {/* Main RBC Interface */}
      <div className={`${isSupportOpen ? 'ml-72' : ''} transition-all duration-300`}>
        <RBCHeader 
          isMobile={isMobile}
          onMenuToggle={handleMobileMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
          onNavigate={handleNavigation}
        />
        
        <PageComponent isMobile={isMobile} onNavigate={setCurrentPage} />
      </div>
    </div>
  );
}
