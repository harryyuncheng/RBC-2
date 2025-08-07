'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';

interface SupportSettingsProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewDemo?: () => void;
}

export default function SupportSettings({ isOpen, onToggle, onNewDemo }: SupportSettingsProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { userData, isLoading } = useUser();

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 bg-gray-700 text-white p-2 rounded-r-lg shadow-lg hover:bg-gray-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Settings panel */}
      <div className={`support-panel-container fixed left-0 top-0 h-full bg-gray-800 bg-opacity-95 backdrop-blur-sm text-white shadow-2xl transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ width: '320px' }}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Support Settings</h3>
            <button 
              onClick={onToggle}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Step Control */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Manual Control</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Step</span>
                  <span className="text-sm font-medium">{currentStep}/5</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="flex-1 px-3 py-2 bg-gray-700 text-sm rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                    disabled={currentStep === 5}
                    className="flex-1 px-3 py-2 bg-gray-700 text-sm rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button 
                onClick={onNewDemo}
                className="w-full px-3 py-2 bg-blue-600 text-sm rounded hover:bg-blue-500 transition-colors"
              >
                New Session
              </button>
              <button className="w-full px-3 py-2 bg-red-600 text-sm rounded hover:bg-red-500 transition-colors">
                End Session
              </button>
            </div>

            {/* Session Info */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Session Info</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Duration: 2:34</div>
                <div>Customer: {userData?.user.fullName || 'Loading...'}</div>
                <div>Demo: Credit Score Check</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
