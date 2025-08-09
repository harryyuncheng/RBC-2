import React from 'react';

interface EndSessionButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export function EndSessionButton({ 
  onClick, 
  className = '',
  disabled = false
}: EndSessionButtonProps) {
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
        w-28
        ${className}
        ${disabled ? 'opacity-50' : ''}
      `}
      title="Reset session and clear all context"
      type="button"
      disabled={disabled}
    >
      <span className="text-sm font-medium transition-all duration-300 ease-in-out whitespace-nowrap mx-auto">
        End Session
      </span>
    </button>
  );
};
