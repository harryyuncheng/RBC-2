'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { StructuredAction, findElementByTarget, getElementBounds } from '../utils/actionProcessor';

interface HighlightOverlay {
  id: string;
  bounds: DOMRect;
  label: string;
}

interface ActionHighlighterProps {
  actions: StructuredAction[];
  autoHideDuration?: number; // Duration in ms before highlights auto-hide
}

export default function ActionHighlighter({ 
  actions, 
  autoHideDuration = 8000 
}: ActionHighlighterProps) {
  const [highlights, setHighlights] = useState<HighlightOverlay[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const createHighlights = useCallback(() => {
    if (!actions.length) {
      setHighlights([]);
      return;
    }

    const newHighlights: HighlightOverlay[] = [];

    // Only create highlights for "highlight" actions
    const highlightActions = actions.filter(action => action.action === 'highlight');

    for (const action of highlightActions) {
      const element = findElementByTarget(action.target);
      if (element) {
        const bounds = getElementBounds(element);
        
        // Only create highlight if element is visible in viewport
        if (bounds.width > 0 && bounds.height > 0) {
          newHighlights.push({
            id: `highlight-${action.target}`,
            bounds,
            label: action.label
          });
        }
      }
    }

    setHighlights(newHighlights);
    setIsVisible(true);
  }, [actions]);

  // Create highlights when actions change
  useEffect(() => {
    createHighlights();
  }, [createHighlights]);

  // Auto-hide highlights after duration
  useEffect(() => {
    if (highlights.length > 0 && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Clear highlights after fade animation
        setTimeout(() => setHighlights([]), 300);
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [highlights.length, autoHideDuration]);

  // Update highlight positions on scroll/resize
  useEffect(() => {
    const updatePositions = () => {
      if (highlights.length > 0) {
        createHighlights();
      }
    };

    window.addEventListener('scroll', updatePositions, { passive: true });
    window.addEventListener('resize', updatePositions, { passive: true });

    return () => {
      window.removeEventListener('scroll', updatePositions);
      window.removeEventListener('resize', updatePositions);
    };
  }, [createHighlights, highlights.length]);

  if (!highlights.length) return null;

  return (
    <div className="action-highlighter-container">
      {highlights.map((highlight) => (
        <div
          key={highlight.id}
          className={`action-highlight ${isVisible ? 'visible' : 'hidden'}`}
          style={{
            position: 'fixed',
            left: highlight.bounds.left,
            top: highlight.bounds.top,
            width: highlight.bounds.width,
            height: highlight.bounds.height,
            border: '2px solid #ef4444', // red-500
            backgroundColor: 'transparent',
            pointerEvents: 'none',
            zIndex: 9999,
            borderRadius: '4px',
            boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.3)',
            transition: 'opacity 300ms ease-in-out',
          }}
        >
          {/* Label tooltip */}
          <div
            className="action-highlight-label"
            style={{
              position: 'absolute',
              top: '-30px',
              left: '0',
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            {highlight.label}
          </div>
        </div>
      ))}
      
      <style jsx>{`
        .action-highlight.visible {
          opacity: 1;
        }
        .action-highlight.hidden {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
