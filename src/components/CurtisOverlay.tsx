'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useConversation } from '../hooks/useConversation';
import { useUserName, parseNameFromSpeech } from '../hooks/useUserName';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { captureDOMContext, loadContextPrompt } from '../utils/domContext';
import { OverlayButton } from './ui/OverlayButton';
import Icon from '@mdi/react';
import { mdiArrowCollapse, mdiBackspace } from '@mdi/js';

interface CurtisOverlayProps {
  message?: string;
}

export default function CurtisOverlay({ message = "Curtis AI Advisor" }: CurtisOverlayProps) {
  const [contextPrompt, setContextPrompt] = useState("");
  const [lastDOMContext, setLastDOMContext] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const speechRecognition = useSpeechRecognition();
  const conversation = useConversation();
  const userName = useUserName();
  const dragAndDrop = useDragAndDrop(overlayRef as React.RefObject<HTMLDivElement>);

  // Initialize
  useEffect(() => {
    speechRecognition.checkSpeechSupport();
    loadContextPrompt().then(setContextPrompt);

    // Clear context cache when URL changes
    const currentUrl = window.location.href;
    const handleUrlChange = () => {
      if (window.location.href !== currentUrl) {
        setLastDOMContext(null);
      }
    };

    // Listen for navigation changes
    window.addEventListener('popstate', handleUrlChange);
    
    // For SPA navigation, we could also listen for custom events
    const handlePageChange = () => setLastDOMContext(null);
    window.addEventListener('pagechange', handlePageChange);

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.warn('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };

    const handleError = (event: ErrorEvent) => {
      console.warn('Global error:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('pagechange', handlePageChange);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
      speechRecognition.stopListening();
    };
  }, []);

  // Capture DOM context - always get the latest context for each recording
  const captureDOMContextForRecording = useCallback((): string => {
    const context = captureDOMContext();
    setLastDOMContext(context); // Update cache for UI display purposes
    return context;
  }, []);

  // Handle speech results
  const handleSpeechResult = (text: string, isFinal: boolean) => {
    if (!isFinal) return;

    const nameInfo = parseNameFromSpeech(text);
    if (nameInfo) {
      userName.updateUserName(nameInfo.firstName);
    }

    const totalExchanges = Math.floor(conversation.conversationHistory.length / 2);
    const isContextReinforcement = totalExchanges > 0 && totalExchanges % 5 === 0;
    
    if (isContextReinforcement) {
      speechRecognition.setDetectedText(`Voice: "${text}" (Context refreshed for Curtis)`);
    }
    
    // Always capture fresh DOM context for every recording
    const domContext = captureDOMContextForRecording();
    
    conversation.sendToCurtis(
      text,
      contextPrompt,
      domContext
    );
  };

  const renderFormattedResponse = useCallback((text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    const boldRegex = /\*\*(.+?)\*\*/g;
    return lines.map((line, idx) => {
      const parts: (string | React.ReactNode)[] = [];
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
        parts.push(<span key={`${idx}-b-${match.index}`} className="font-semibold">{match[1]}</span>);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) parts.push(line.slice(lastIndex));
      // Preserve bullet indicator visually but no extra spacing manipulation
      return (
        <span key={idx} className="block">{parts.length ? parts : '\u00A0'}</span>
      );
    });
  }, []);

  return (
    <div 
      ref={overlayRef}
      className="fixed z-40 cursor-default"
      style={{
        left: dragAndDrop.position.x,
        top: dragAndDrop.position.y,
        transform: dragAndDrop.position.x === 0 && dragAndDrop.position.y === 0 ? 'translate(calc(50vw - 50%), 2rem)' : 'none'
      }}
      onMouseDown={dragAndDrop.handleMouseDown}
    >
      <div className="bg-black/80 text-white rounded-xl shadow-2xl w-128" style={{ backgroundColor: 'var(--overlay-background)', color: 'var(--overlay-icon-color)' }}>
        {/* Main message area */}
        <div className="px-6 py-3 select-none rounded-t-xl">
          <div className="flex items-center justify-between min-h-[2rem]">
            <div className="flex items-center space-x-3">
              <div 
                className={`w-2 h-2 rounded-full ${speechRecognition.speechSupported ? 'bg-green-400' : 'bg-red-400'}`}
                title={speechRecognition.speechSupported ? "Speech recognition supported" : "Speech recognition not supported"}
              />
              <span 
                className="text-sm font-bold cursor-pointer text-gray-200 hover:text-white transition-colors leading-none" 
                onClick={() => setIsCollapsed(!isCollapsed)}
                title="Click to expand/collapse"
              >
                {message}
              </span>
              {!speechRecognition.speechSupported && (
                <span className="text-xs text-gray-300 ml-2 leading-none">(Speech not supported)</span>
              )}
            </div>
            
            {/* Control buttons */}
            <div className="flex items-center space-x-2">
              {/* Play/Pause toggle */}
              <OverlayButton
                onClick={() => {
                  // If overlay is collapsed and we're starting recording, expand it
                  if (isCollapsed && !speechRecognition.micEnabled) {
                    setIsCollapsed(false);
                  }
                  speechRecognition.toggleMic(handleSpeechResult);
                }}
                title="Toggle recording"
                variant="compact"
                className="overlay-icon hover:cursor-pointer"
                icon={
                  speechRecognition.micEnabled ? (
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
                  ) : (
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  )
                }
              />

              {/* Clear button */}
              <OverlayButton
                onClick={() => {
                  if (lastDOMContext) {
                    setLastDOMContext(null);
                    speechRecognition.setDetectedText("Page context cache cleared");
                  }
                  if (conversation.conversationHistory.length > 0) {
                    conversation.clearConversationHistory();
                  }
                }}
                title="Clear context cache and conversation history"
                variant="compact"
                className="overlay-icon hover:cursor-pointer"
                icon={
                  <Icon path={mdiBackspace} size={0.7} style={{ strokeWidth: '0px' }} />
                }
              />

              {/* Center/Reset button */}
              <OverlayButton
                onClick={dragAndDrop.snapToCenter}
                title="Reset to center position"
                variant="compact"
                className="overlay-icon hover:cursor-pointer"
                icon={
                  <Icon path={mdiArrowCollapse} size={0.7} style={{ strokeWidth: '0.5px', filter: 'brightness(0.8)' }} />
                }
              />
            </div>
          </div>
        </div>
        
        {/* Collapsible content */}
        <div className={`overflow-hidden ${
          isCollapsed ? 'max-h-0 opacity-0 transition-all duration-300' : 'max-h-96 opacity-100'
        }`}>
          {/* Detection display area */}
          <div className="px-6 pt-1 pb-3">
            <div className="text-xs text-gray-300 flex items-center justify-between">
              <div className="flex-1 mr-2">
                {speechRecognition.detectedText}
              </div>
              {speechRecognition.audioLevel > 5 && (
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-3 rounded-full transition-colors ${
                          i < (speechRecognition.audioLevel / 20) ? 'bg-white' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white ml-1">{Math.round(speechRecognition.audioLevel)}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Curtis Response area */}
          {(conversation.isProcessing || conversation.curtisResponse) && (
            <div className="px-6 py-1 pb-2">
              {conversation.isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-600 border-t-white"></div>
                  <span className="text-xs text-gray-300">
                    Curtis is thinking...
                  </span>
                </div>
              ) : (
                <div>
                  <div 
                    ref={(el) => {
                      if (el) {
                        const shouldFade = el.scrollHeight > el.clientHeight;
                        if (shouldFade) {
                          el.style.maskImage = 'linear-gradient(to bottom, black 80%, transparent 100%)';
                          el.style.webkitMaskImage = 'linear-gradient(to bottom, black 80%, transparent 100%)';
                        } else {
                          el.style.maskImage = 'none';
                          el.style.webkitMaskImage = 'none';
                        }
                      }
                    }}
                    className="text-sm text-white max-h-40 overflow-y-auto relative scrollbar-hide whitespace-pre-wrap"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                  >
                    <style jsx>{`
                      .scrollbar-hide::-webkit-scrollbar { display: none; }
                    `}</style>
                    <div className="space-y-1">
                      {renderFormattedResponse(conversation.curtisResponse)}
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Name Update Status */}
          {userName.nameUpdateStatus && (
            <div className="px-6 py-1 flex items-center space-x-2">
              {userName.nameUpdateStatus.includes("Updating") && (
                <div className="animate-spin rounded-full h-4 w-4"></div>
              )}
              <span className="text-xs text-gray-300">{userName.nameUpdateStatus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
