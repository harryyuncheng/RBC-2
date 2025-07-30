'use client';

import { useState } from 'react';

interface SupportSettingsProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function SupportSettings({ isOpen, onToggle }: SupportSettingsProps) {
  const [micEnabled, setMicEnabled] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

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
      <div className={`fixed left-0 top-0 h-full bg-gray-800 text-white shadow-2xl transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ width: '280px' }}>
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
            {/* Audio Settings */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Audio</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm">Microphone</span>
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    micEnabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      micEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

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
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full px-3 py-2 bg-blue-600 text-sm rounded hover:bg-blue-500 transition-colors">
                  Reset Demo
                </button>
                <button className="w-full px-3 py-2 bg-gray-700 text-sm rounded hover:bg-gray-600 transition-colors">
                  Pause Session
                </button>
                <button className="w-full px-3 py-2 bg-red-600 text-sm rounded hover:bg-red-500 transition-colors">
                  End Demo
                </button>
              </div>
            </div>

            {/* Session Info */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Session Info</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Duration: 2:34</div>
                <div>Customer: John Doe</div>
                <div>Demo: Credit Score Check</div>
              </div>
            </div>

            {/* Advisor Metrics */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-3">Advisor Metrics</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Avg. Handling Time:</span>
                  <span className="text-white">4:23</span>
                </div>
                <div className="flex justify-between">
                  <span>Clients Resolved:</span>
                  <span className="text-white">127</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="text-green-400">94.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}
