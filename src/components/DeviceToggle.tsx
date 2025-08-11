'use client';

interface DeviceToggleProps {
  isMobile: boolean;
  onToggle: () => void;
}

export default function DeviceToggle({ isMobile, onToggle }: DeviceToggleProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-2">
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${!isMobile ? 'font-semibold text-[#005DAA]' : 'text-gray-600'}`}>
            Desktop
          </span>
          <button
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
              isMobile ? 'bg-[#005DAA]' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                isMobile ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isMobile ? 'font-semibold text-[#005DAA]' : 'text-gray-600'}`}>
            Mobile
          </span>
        </div>
      </div>
    </div>
  );
}
