import React from 'react';

interface OverlayButtonProps {
  onClick: () => void | Promise<void>;
  title: string;
  icon: React.ReactNode; // SVG path elements
  label?: string;
  enabled?: boolean;
  className?: string;
  variant?: 'default' | 'compact';
}

export function OverlayButton({ 
  onClick, 
  title, 
  icon, 
  label, 
  enabled = true,
  className = '',
  variant = 'default'
}: OverlayButtonProps) {
  const baseClasses = variant === 'compact' 
    ? "p-1 rounded" 
    : "flex items-center space-x-2 px-2 py-1 rounded";
  
  const handleClick = async () => {
    try {
      await onClick();
    } catch (error) {
      console.warn(`Button action failed:`, error);
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={(e) => e.stopPropagation()}
      className={`${baseClasses} ${className} hover:bg-gray-700/50 transition-colors duration-200`}
      title={title}
      disabled={!enabled}
    >
      <svg 
        className="w-4 h-4"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
      {label && variant === 'default' && (
        <span className="text-xs">{label}</span>
      )}
    </button>
  );
}
