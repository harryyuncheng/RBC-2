'use client';

import { useState, useEffect, useRef } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useScreenCapture } from '../hooks/useScreenCapture';
import { useConversation } from '../hooks/useConversation';
import { useUserName, parseNameFromSpeech } from '../hooks/useUserName';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { captureDOMContext, loadContextPrompt } from '../utils/domContext';
import { OverlayButton } from './ui/OverlayButton';

interface CurtisOverlayProps {
  message?: string;
}

export default function CurtisOverlay({ message = "Curtis" }: CurtisOverlayProps) {
  const [contextPrompt, setContextPrompt] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const speechRecognition = useSpeechRecognition();
  const screenCapture = useScreenCapture();
  const conversation = useConversation();
  const userName = useUserName();
  const dragAndDrop = useDragAndDrop(overlayRef);

  // Initialize
  useEffect(() => {
    speechRecognition.checkSpeechSupport();
    loadContextPrompt().then(setContextPrompt);

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
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
      speechRecognition.stopListening();
    };
  }, []);

  // Handle speech results
  const handleSpeechResult = (text: string, isFinal: boolean) => {
    if (!isFinal) return;

    const nameInfo = parseNameFromSpeech(text);
    if (nameInfo) {
      userName.updateUserName(nameInfo.firstName);
    }

    const needsDOMContext = /\b(what's on this page|help me with this form|what can I do here|what are my options|read this page|page content|form fields)\b/i.test(text);
    
    const totalExchanges = Math.floor(conversation.conversationHistory.length / 2);
    const isContextReinforcement = totalExchanges > 0 && totalExchanges % 5 === 0;
    
    if (isContextReinforcement) {
      speechRecognition.setDetectedText(`Voice: "${text}" (Context reinforced for Curtis)`);
    }
    
    conversation.sendToCurtis(
      text,
      contextPrompt,
      screenCapture.lastScreenCapture,
      needsDOMContext ? captureDOMContext() : null
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
            <span className="text-sm font-medium">{message}</span>
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
              {screenCapture.isCapturingScreen && (
                <span className="ml-2 text-gray-300"> Capturing screen...</span>
              )}
              {!screenCapture.lastScreenCapture && (
                <span className="ml-2 text-gray-400"> Click capture button for screen context</span>
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
                  {screenCapture.isCapturingScreen && ' (capturing screen)'}
                </span>
              </div>
            ) : (
              <div>
                <div className="text-xs text-gray-300 mb-1 flex items-center">
                  Curtis Response:
                  {screenCapture.lastScreenCapture && (
                    <span className="ml-2 text-gray-400 text-xs">📸 Screenshot included</span>
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
            {/* Microphone toggle */}
            <OverlayButton
              onClick={() => speechRecognition.toggleMic(handleSpeechResult)}
              title="Toggle microphone"
              className={speechRecognition.micEnabled ? 'text-white' : 'text-gray-400'}
              label={speechRecognition.micEnabled ? 'ON' : 'OFF'}
              icon={
                speechRecognition.micEnabled ? (
                  <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                ) : (
                  <path d="M5.586 5.586A2 2 0 015 7v6a7 7 0 0012.0309 5.0309M12 19v4m0 0H8m4 0h4M9.879 9.879a3 3 0 004.242 4.242M15 11V5a3 3 0 00-6 0v.586M19 11c0 1.163-.282 2.261-.781 3.237" />
                )
              }
            />

            {/* Manual screen capture button */}
            <OverlayButton
              onClick={async () => {
                try {
                  await screenCapture.captureScreen(true);
                } catch (error) {
                  console.warn('Manual screen capture failed:', error instanceof Error ? error.message : 'Unknown error');
                  speechRecognition.setDetectedText("Screen capture failed - permission may be required");
                }
              }}
              title="Capture screen (requires user permission)"
              className={screenCapture.lastScreenCapture ? 'text-gray-300' : 'text-gray-400'}
              label={screenCapture.isCapturingScreen ? 'Capturing...' : screenCapture.lastScreenCapture ? 'Captured' : 'Capture'}
              icon={
                <>
                  <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </>
              }
            />

            {/* Clear conversation history button */}
            {conversation.conversationHistory.length > 0 && (
              <OverlayButton
                onClick={conversation.clearConversationHistory}
                title="Clear conversation history"
                className="text-gray-300"
                label="History"
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
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
