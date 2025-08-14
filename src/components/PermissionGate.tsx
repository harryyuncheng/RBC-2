'use client';

import { useState, useEffect, ReactNode } from 'react';

interface PermissionStatus {
  microphone: 'pending' | 'granted' | 'denied';
}

interface PermissionGateProps {
  children: ReactNode;
  onResetRef?: React.MutableRefObject<(() => void) | null>;
}

export default function PermissionGate({ children, onResetRef }: PermissionGateProps) {
  const [showModal, setShowModal] = useState(false);
  const [permissions, setPermissions] = useState<PermissionStatus>({
    microphone: 'pending'
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [hasRequestedPermissions, setHasRequestedPermissions] = useState(false);
  const [browserSupport, setBrowserSupport] = useState({
    getUserMedia: false
  });

  // Check browser support
  useEffect(() => {
    setBrowserSupport({
      getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    });
  }, []);

  // Check microphone permission status and show modal if needed
  useEffect(() => {
    const checkMicrophonePermission = async () => {
      // Check if we've already asked in this session
      const hasRequestedInSession = sessionStorage.getItem('microphone-requested');
      
      // Check if the required APIs are available
      const isGetUserMediaSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      
      if (!isGetUserMediaSupported || hasRequestedInSession === 'true') {
        return; // Don't show modal
      }

      try {
        // Check current microphone permission status
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        
        if (permissionStatus.state === 'denied' || permissionStatus.state === 'prompt') {
          // Show modal only if permission is denied or not yet requested
          setShowModal(true);
        }
        
        setPermissions(prev => ({ 
          ...prev, 
          microphone: permissionStatus.state === 'granted' ? 'granted' : 
                     permissionStatus.state === 'denied' ? 'denied' : 'pending'
        }));
      } catch (error) {
        // Fallback: if permissions API not supported, try getUserMedia to check
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(track => track.stop());
          setPermissions(prev => ({ ...prev, microphone: 'granted' }));
        } catch (getUserMediaError) {
          // Show modal if we can't access microphone and haven't asked yet
          setShowModal(true);
          setPermissions(prev => ({ ...prev, microphone: 'denied' }));
        }
      }
    };

    checkMicrophonePermission();
  }, []);

  // Provide reset function to parent via ref
  useEffect(() => {
    if (onResetRef) {
      onResetRef.current = () => {
        // Clear session storage
        sessionStorage.removeItem('microphone-requested');
        // Reset component state
        setShowModal(false);
        setHasRequestedPermissions(false);
        setPermissions({
          microphone: 'pending'
        });
        setIsRequesting(false);
        
        // Re-check permissions after reset
        setTimeout(() => {
          window.location.reload();
        }, 100);
      };
    }
  }, [onResetRef]);

  const requestMicrophonePermission = async (): Promise<'granted' | 'denied'> => {
    if (!browserSupport.getUserMedia) {
      return 'denied';
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately - we just needed the permission
      stream.getTracks().forEach(track => track.stop());
      return 'granted';
    } catch (error) {
      console.warn('Microphone permission denied:', error);
      return 'denied';
    }
  };

  const handleGrantPermissions = async () => {
    setIsRequesting(true);
    
    // Mark permissions as requested in this session and close immediately
    sessionStorage.setItem('microphone-requested', 'true');
    setShowModal(false);
    
    try {
      // Request microphone permission in the background
      const micStatus = await requestMicrophonePermission();
      setPermissions(prev => ({ ...prev, microphone: micStatus }));
    } catch (error) {
      console.error('Error requesting permissions:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleContinueWithoutPermissions = () => {
    sessionStorage.setItem('microphone-requested', 'true');
    setHasRequestedPermissions(true);
    setShowModal(false);
  };

  const getPermissionIcon = (status: 'pending' | 'granted' | 'denied') => {
    switch (status) {
      case 'granted':
        return (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'denied':
        return (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getPermissionText = (status: 'pending' | 'granted' | 'denied') => {
    switch (status) {
      case 'granted':
        return 'Granted';
      case 'denied':
        return 'Denied';
      default:
        return 'Pending';
    }
  };

  if (!showModal) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Welcome to Curtis Assistant
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <div className="space-y-3 mb-6 mt-2">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Microphone Access Needed</h3>
                  <p className="text-sm text-gray-600">
                    Curtis works best when tracking conversations for a hands-free experience
                  </p>
                </div>
              </div>
            </div>

            {/* Permission Status */}
            {hasRequestedPermissions && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Permission Status:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Microphone</span>
                    <div className="flex items-center space-x-2">
                      {!browserSupport.getUserMedia ? (
                        <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                          Not Supported
                        </span>
                      ) : (
                        <>
                          {getPermissionIcon(permissions.microphone)}
                          <span className={`text-sm ${
                            permissions.microphone === 'granted' ? 'text-green-600' : 
                            permissions.microphone === 'denied' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {getPermissionText(permissions.microphone)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 mb-2">
              Note: You can always change microphone permissions later in your browser settings. 
              Curtis will work without microphone permissions, but AI Assistance won't be available.
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
            <div className="flex space-x-3">
              {!hasRequestedPermissions ? (
                <>
                  <button
                    onClick={handleGrantPermissions}
                    disabled={isRequesting || !browserSupport.getUserMedia}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                  >
                    {isRequesting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                        <span>Requesting...</span>
                      </>
                    ) : (
                      <span>
                        {!browserSupport.getUserMedia 
                          ? 'Microphone Not Available' 
                          : 'Grant Microphone Permission'
                        }
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleContinueWithoutPermissions}
                    disabled={isRequesting}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Continue Without
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue to Curtis
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render children in background (blurred) */}
      <div className="filter blur-sm pointer-events-none">
        {children}
      </div>
    </>
  );
}
