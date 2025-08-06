'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useConversation } from '../hooks/useConversation';
import { useUserName, parseNameFromSpeech } from '../hooks/useUserName';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { captureDOMContext, loadContextPrompt } from '../utils/domContext';
import { OverlayButton } from './ui/OverlayButton';
import Icon from '@mdi/react';
import { mdiArrowCollapse } from '@mdi/js';

interface CurtisOverlayProps {
  message?: string;
}

export default function CurtisOverlay({ message = "Curtis" }: CurtisOverlayProps) {
  const [contextPrompt, setContextPrompt] = useState("");
  const [lastDOMContext, setLastDOMContext] = useState<string | null>(null);
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

  // Capture DOM context 
  const captureDOMContextIfNeeded = useCallback((forceNew: boolean = false): string | null => {
    if (!forceNew && lastDOMContext) {
      // Use cached context unless forced to refresh
      return lastDOMContext;
    }

    const context = captureDOMContext();
    setLastDOMContext(context);
    return context;
  }, [lastDOMContext]);

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
    
    // Always capture fresh DOM context at the end of each voice recording
    const domContext = captureDOMContextIfNeeded(true);
    
    conversation.sendToCurtis(
      text,
      contextPrompt,
      null, // No screen capture
      domContext
    );
  };

  return (
    <div 
      ref={overlayRef}
      className={`fixed z-40 ${dragAndDrop.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: dragAndDrop.position.x,
        top: dragAndDrop.position.y,
        transform: dragAndDrop.position.x === 0 && dragAndDrop.position.y === 0 ? 'translate(calc(50vw - 50%), 2rem)' : 'none'
      }}
      onMouseDown={dragAndDrop.handleMouseDown}
    >
      <div className="bg-black/80 text-white rounded-xl shadow-2xl w-128">
        {/* Main message area */}
        <div className="px-6 py-3 select-none rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div 
              className={`w-2 h-2 rounded-full ${speechRecognition.speechSupported ? 'bg-green-400' : 'bg-red-400'}`}
              title={speechRecognition.speechSupported ? "Speech recognition supported" : "Speech recognition not supported"}
            />
            <span className="text-sm">{message}</span>
            {!speechRecognition.speechSupported && (
              <span className="text-xs text-gray-300 ml-2">(Speech not supported)</span>
            )}
          </div>
        </div>
        
        {/* Detection display area */}
        <div className="px-6 py-2">
          <div className="text-xs text-gray-300 flex items-center justify-between">
            <div className="flex-1 mr-2">
              {speechRecognition.detectedText}
              {lastDOMContext && (
                <span className="ml-2 text-gray-400"> Page context available</span>
              )}
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
          <div className="px-6 py-3">
            {conversation.isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-600 border-t-white"></div>
                <span className="text-xs text-gray-300">
                  Curtis is thinking...
                  {lastDOMContext && ' (with page context)'}
                </span>
              </div>
            ) : (
              <div>
                <div className="text-xs text-gray-300 mb-1 flex items-center">
                  Curtis Response:
                  {lastDOMContext && (
                    <span className="ml-2 text-gray-400 text-xs">� Page context included</span>
                  )}
                </div>
                <div className="text-sm text-white max-h-40 overflow-y-auto">
                  {conversation.curtisResponse}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Name Update Status */}
        {userName.nameUpdateStatus && (
          <div className="px-6 py-3 flex items-center space-x-2">
            {userName.nameUpdateStatus.includes("Updating") && (
              <div className="animate-spin rounded-full h-4 w-4"></div>
            )}
            <span className="text-xs text-gray-300">{userName.nameUpdateStatus}</span>
          </div>
        )}

        {/* Settings row at bottom */}
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause toggle */}
            <OverlayButton
              onClick={() => speechRecognition.toggleMic(handleSpeechResult)}
              title="Toggle recording"
              className={speechRecognition.micEnabled ? 'text-white' : 'text-gray-400'}
              icon={
                speechRecognition.micEnabled ? (
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )
              }
            />

            {/* Combined clear button */}
            {(lastDOMContext || conversation.conversationHistory.length > 0) && (
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
                className="text-gray-400"
                icon={
                  <path d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                }
              />
            )}

            {/* Recording indicator */}
            {speechRecognition.isListening && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Volume indicator */}
            <div className="text-xs">
              <span className="text-gray-400">Vol: </span>
              {speechRecognition.isListening ? (
                <span>
                  {Array.from({length: 4}, (_, i) => (
                    <span key={i} className={i < (speechRecognition.audioLevel / 25) ? 'text-green-400' : 'text-gray-400'}>
                      {i < (speechRecognition.audioLevel / 25) ? '●' : '○'}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-gray-400">○○○○</span>
              )}
            </div>

            {/* Browser compatibility indicator */}

            {/* Center/Reset button */}
            <OverlayButton
              onClick={dragAndDrop.snapToCenter}
              title="Reset to center position"
              variant="compact"
              className="text-gray-400"
              icon={
                <Icon path={mdiArrowCollapse} size={0.7} style={{ strokeWidth: '0.5px', filter: 'brightness(0.8)' }} />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
