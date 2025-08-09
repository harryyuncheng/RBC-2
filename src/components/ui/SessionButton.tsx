import React from 'react';

interface SessionButtonProps {
  isActive: boolean;
  onClick: () => void;
  buttonText: string;
  className?: string;
}

export function SessionButton({ 
  isActive, 
  onClick, 
  buttonText, 
  className = '' 
}: SessionButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Execute immediately without any async delays
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={(e) => e.stopPropagation()}
      className={`
        flex items-center px-3 py-2 
        border border-gray-500/30 rounded-full
        hover:border-gray-400/50 
        transition-all duration-300 ease-in-out
        w-40
        ${className}
      `}
      title={isActive ? "Pause session" : "Start/resume session"}
      type="button"
    >
      {/* Icon container with fixed width, left-aligned */}
      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
        <svg 
          className="w-4 h-4 transition-all duration-300 ease-in-out"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          {isActive ? (
            // Pause icon
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          ) : (
            // Play icon
            <path d="M8 5v14l11-7z" />
          )}
        </svg>
      </div>
      
      {/* Text centered in remaining space */}
      <div className="flex-1 flex items-center justify-center ml-2">
        <span className="text-sm font-medium transition-all duration-300 ease-in-out whitespace-nowrap">
          {buttonText}
        </span>
      </div>
    </button>
  );
};
