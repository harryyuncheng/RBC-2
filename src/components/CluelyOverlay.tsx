'use client';

import { useState, useEffect, useRef } from 'react';

interface CurtisOverlayProps {
  message: string;
}

export default function CurtisOverlay({ message }: CurtisOverlayProps) {
  const [micEnabled, setMicEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [detectedText, setDetectedText] = useState("Click microphone to start voice detection");
  const [audioLevel, setAudioLevel] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [lastSpeechText, setLastSpeechText] = useState("");
  const [curtisResponse, setCurtisResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [contextPrompt, setContextPrompt] = useState("");
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Check for speech recognition support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognition);
    
    // Load context prompt from file
    loadContextPrompt();
  }, []);

  // Load context prompt
  const loadContextPrompt = async () => {
    try {
      const response = await fetch('/context-prompt.txt');
      if (response.ok) {
        const text = await response.text();
        setContextPrompt(text);
      }
    } catch (error) {
      console.error('Failed to load context prompt:', error);
    }
  };

  // Send voice input to Curtis
  const sendToCurtis = async (voiceText: string) => {
    if (!voiceText.trim()) return;
    
    setIsProcessing(true);
    setCurtisResponse("");
    
    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voiceInput: voiceText,
          contextPrompt: contextPrompt
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setCurtisResponse(data.response);
      } else {
        setCurtisResponse(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to send to Curtis:', error);
      console.error('Error details:', error instanceof Error ? error.message : error);
      setCurtisResponse(`Failed to connect to Curtis API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Audio level monitoring
  const monitorAudioLevel = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateAudioLevel = () => {
      if (!analyserRef.current || !isListening) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      const sum = dataArray.reduce((a, b) => a + b, 0);
      const average = sum / bufferLength;
      const normalizedLevel = (average / 255) * 100;
      
      setAudioLevel(normalizedLevel);
      
      if (isListening) {
        requestAnimationFrame(updateAudioLevel);
      }
    };
    
    updateAudioLevel();
  };

  // Start speech recognition and audio monitoring
  const startListening = async () => {
    if (!speechSupported) {
      setDetectedText("Speech recognition not supported in this browser");
      return;
    }

    try {
      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up audio context for level monitoring
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      // Start audio level monitoring
      monitorAudioLevel();

      // Set up speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setDetectedText("Listening for speech...");
      };

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setLastSpeechText(finalTranscript.trim());
          setDetectedText(`Voice: "${finalTranscript.trim()}"`);
          
          // Automatically send to Curtis when we get final speech
          sendToCurtis(finalTranscript.trim());
        } else if (interimTranscript) {
          setDetectedText(`Listening: "${interimTranscript.trim()}"`);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setDetectedText(`Speech error: ${event.error}`);
      };

      recognitionRef.current.onend = () => {
        if (micEnabled) {
          // Restart if still enabled
          setTimeout(() => {
            if (recognitionRef.current && micEnabled) {
              recognitionRef.current.start();
            }
          }, 100);
        }
      };

      recognitionRef.current.start();
      
    } catch (error) {
      console.error('Microphone access denied:', error);
      setDetectedText("Microphone access denied. Please allow microphone access.");
      setMicEnabled(false);
    }
  };

  // Stop speech recognition and audio monitoring
  const stopListening = () => {
    setIsListening(false);
    setAudioLevel(0);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    microphoneRef.current = null;
    
    setDetectedText("Voice detection stopped");
  };

  const toggleMic = () => {
    if (!speechSupported) {
      setDetectedText("Speech recognition not supported in this browser. Try Chrome or Edge.");
      return;
    }

    if (micEnabled) {
      // Turn off microphone
      setMicEnabled(false);
      stopListening();
    } else {
      // Turn on microphone
      setMicEnabled(true);
      startListening();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!overlayRef.current) return;
    
    const rect = overlayRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep overlay within viewport bounds
    const maxX = window.innerWidth - (overlayRef.current?.offsetWidth || 0);
    const maxY = window.innerHeight - (overlayRef.current?.offsetHeight || 0);
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const snapToCenter = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Add global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div 
      ref={overlayRef}
      className={`fixed z-40 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: position.x,
        top: position.y,
        transform: position.x === 0 && position.y === 0 ? 'translate(calc(50vw - 50%), 2rem)' : 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-black bg-opacity-90 text-white rounded-xl shadow-2xl min-w-96 max-w-lg">
        {/* Main message area */}
        <div className="px-6 py-3 select-none">
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${
              isListening ? 'bg-green-400 animate-pulse' : 
              micEnabled ? 'bg-yellow-400' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm font-medium">{message}</span>
            {!speechSupported && (
              <span className="text-xs text-red-400 ml-2">(Speech not supported)</span>
            )}
          </div>
        </div>
        
        {/* Detection display area */}
        <div className="px-6 py-2 border-t border-gray-600">
          <div className="text-xs text-gray-300 flex items-center justify-between">
            <div className="flex-1 mr-2">
              <span className="text-blue-300">Voice Status:</span> {detectedText}
            </div>
            {audioLevel > 5 && (
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-3 rounded-full transition-colors ${
                        i < (audioLevel / 20) ? 'bg-green-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-green-400 ml-1">{Math.round(audioLevel)}%</span>
              </div>
            )}
          </div>
          {lastSpeechText && (
            <div className="text-xs text-green-300 mt-1">
              <span className="text-green-400">Recognized:</span> "{lastSpeechText}"
            </div>
          )}
        </div>

        {/* Curtis Response area */}
        {(isProcessing || curtisResponse) && (
          <div className="px-6 py-3 border-t border-gray-600 bg-blue-900 bg-opacity-30">
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span className="text-xs text-blue-300">Curtis is thinking...</span>
              </div>
            ) : (
              <div>
                <div className="text-xs text-blue-400 mb-1">Curtis Response:</div>
                <div className="text-sm text-white max-h-40 overflow-y-auto">
                  {curtisResponse}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Settings row at bottom */}
        <div className="px-4 py-2 bg-black bg-opacity-50 rounded-b-xl border-t border-gray-600 select-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Microphone toggle */}
              <button
                onClick={toggleMic}
                onMouseDown={(e) => e.stopPropagation()}
                className="flex items-center space-x-2 hover:bg-gray-700 px-2 py-1 rounded transition-colors"
                title="Toggle microphone"
              >
                <svg 
                  className={`w-4 h-4 ${micEnabled ? 'text-green-400' : 'text-red-400'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {micEnabled ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 5.586A2 2 0 015 7v6a7 7 0 0012.0309 5.0309M12 19v4m0 0H8m4 0h4M9.879 9.879a3 3 0 004.242 4.242M15 11V5a3 3 0 00-6 0v.586M19 11c0 1.163-.282 2.261-.781 3.237" />
                  )}
                </svg>
                <span className="text-xs">{micEnabled ? 'ON' : 'OFF'}</span>
              </button>

              {/* Send to Curtis button */}
              {lastSpeechText && !isProcessing && (
                <button
                  onClick={() => sendToCurtis(lastSpeechText)}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 hover:bg-blue-700 px-2 py-1 rounded transition-colors text-blue-400"
                  title="Send to Curtis"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="text-xs">Send</span>
                </button>
              )}

              {/* Clear response button */}
              {curtisResponse && (
                <button
                  onClick={() => setCurtisResponse("")}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 hover:bg-red-700 px-2 py-1 rounded transition-colors text-red-400"
                  title="Clear response"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-xs">Clear</span>
                </button>
              )}

              {/* Recording indicator */}
              {isListening && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-400">LIVE</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* Volume indicator */}
              <div className="text-xs text-gray-400">
                Vol: {isListening ? 
                  Array.from({length: 5}, (_, i) => i < (audioLevel / 20) ? '●' : '○').join('') 
                  : '○○○○○'
                }
              </div>

              {/* Browser compatibility indicator */}
              {speechSupported ? (
                <div className="w-2 h-2 bg-green-500 rounded-full" title="Speech recognition supported"></div>
              ) : (
                <div className="w-2 h-2 bg-red-500 rounded-full" title="Speech recognition not supported"></div>
              )}

              {/* Settings button */}
              <button 
                className="hover:bg-gray-700 p-1 rounded transition-colors" 
                title="Settings"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Center/Reset button */}
              <button 
                className="hover:bg-gray-700 p-1 rounded transition-colors" 
                title="Reset to center position"
                onClick={snapToCenter}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>

              {/* Minimize button */}
              <button 
                className="hover:bg-gray-700 p-1 rounded transition-colors" 
                title="Minimize"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
