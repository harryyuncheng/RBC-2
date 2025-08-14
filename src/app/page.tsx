'use client';

import { useState, useRef, useCallback } from 'react';
import DeviceToggle from '../components/DeviceToggle';
import CurtisOverlay from '../components/CurtisOverlay';
import PermissionGate from '../components/PermissionGate';
import SupportSettings from '../components/SupportSettings';
import RBCBankingPage from '../components/RBCBankingPage';
import RBCBankingPageMobile from '../components/RBCBankingPageMobile';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const permissionResetRef = useRef<(() => void) | null>(null);

  const handleViewToggle = useCallback(() => {
    setIsMobile(!isMobile);
  }, [isMobile]);

  const handleSupportToggle = useCallback(() => {
    setIsSupportOpen(!isSupportOpen);
  }, [isSupportOpen]);

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'max-w-sm mx-auto bg-white' : ''}`}>
      {/* Support Settings Panel - Only visible to advisors */}
      <SupportSettings 
        isOpen={isSupportOpen} 
        onToggle={handleSupportToggle}
        onNewDemo={() => permissionResetRef.current?.()}
      />

      {/* View Toggle Button */}
      <DeviceToggle 
        isMobile={isMobile}
        onToggle={handleViewToggle}
      />

      {/* Curtis Assistant Overlay with Permission Gate */}
      <PermissionGate onResetRef={permissionResetRef}>
        <CurtisOverlay />
      </PermissionGate>

      {/* Main RBC Interface */}
      <div>
        {isMobile ? (
          <RBCBankingPageMobile />
        ) : (
          <RBCBankingPage isMobile={false} />
        )}
      </div>
    </div>
  );
}
