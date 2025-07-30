'use client';

import { useState, useEffect, useRef } from 'react';

interface CurtisOverlayProps {
  message?: string;
}

export default function CurtisOverlay({ message = "Curtis Assistant" }: CurtisOverlayProps) {
  const [micEnabled, setMicEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [detectedText, setDetectedText] = useState("Click microphone to start voice detection");
  const [audioLevel, setAudioLevel] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [lastSpeechText, setLastSpeechText] = useState("");
  const [curtisResponse, setCurtisResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [contextPrompt, setContextPrompt] = useState("");
  const [nameUpdateStatus, setNameUpdateStatus] = useState("");
  const [conversationHistory, setConversationHistory] = useState<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
    hasScreenCapture?: boolean;
    hasDOMContext?: boolean;
  }>>([]);
  
  const [screenCaptureEnabled, setScreenCaptureEnabled] = useState(true);
  const [lastScreenCapture, setLastScreenCapture] = useState<string | null>(null);
  const [screenCaptureTime, setScreenCaptureTime] = useState<number>(0);
  const [isCapturingScreen, setIsCapturingScreen] = useState(false);
  
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
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
      
      // Load context prompt from file
      loadContextPrompt();
    } catch (error) {
      console.warn('Error during initialization:', error);
      setSpeechSupported(false);
    }

    // Add global error handlers
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.warn('Unhandled promise rejection:', event.reason);
      event.preventDefault(); // Prevent the default behavior
    };

    const handleError = (event: ErrorEvent) => {
      console.warn('Global error:', event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  // Load context prompt
  const loadContextPrompt = async () => {
    try {
      const response = await fetch('/context-prompt.txt');
      if (response.ok) {
        const text = await response.text();
        setContextPrompt(text);
      } else {
        console.warn('Context prompt file not found or not accessible');
      }
    } catch (error) {
      console.warn('Failed to load context prompt:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Parse name from speech input
  const parseNameFromSpeech = (text: string): { firstName: string } | null => {
    const normalizedText = text.toLowerCase().trim();
    
    // Only pattern for "my name is [first name]" - can be preceded by hi/hello or standalone
    // Only captures the first name, ignores any additional words
    const namePattern = /(?:hi|hello|hey)?,?\s*my\s+name\s+is\s+([a-zA-Z]+)/i;
    
    const match = normalizedText.match(namePattern);
    if (match) {
      const firstName = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      
      return { firstName };
    }
    
    return null;
  };

  // Update user name in configuration
  const updateUserName = async (firstName: string) => {
    try {
      setNameUpdateStatus("Updating your name...");
      
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName: '', // Clear last name when updating via voice
          fullName: firstName // Only use first name as full name
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setNameUpdateStatus(`✓ Name updated to ${data.user.fullName}`);
        
        // Clear the status after a few seconds
        setTimeout(() => setNameUpdateStatus(""), 3000);
        
        // Note: Removed automatic page refresh to keep conversation going
        // The name will update on next page load/navigation
      } else {
        setNameUpdateStatus(`✗ Failed to update name: ${data.error}`);
        setTimeout(() => setNameUpdateStatus(""), 3000);
      }
    } catch (error) {
      console.error('Failed to update user name:', error);
      setNameUpdateStatus("✗ Failed to update name");
      setTimeout(() => setNameUpdateStatus(""), 3000);
    }
  };

  // Capture DOM context information
  const captureDOMContext = (): string => {
    try {
      // Get page title and URL
      const pageInfo = {
        title: document.title,
        url: window.location.href,
        pathname: window.location.pathname
      };

      // Get visible text content (limited to avoid too much data)
      const bodyText = document.body.innerText.slice(0, 2000);
      
      // Get form elements if any
      const forms = Array.from(document.forms).map(form => ({
        name: form.name || 'unnamed',
        elements: Array.from(form.elements).map(el => ({
          type: el.type || 'unknown',
          name: el.name || 'unnamed',
          value: el.tagName === 'INPUT' ? (el as HTMLInputElement).value : ''
        }))
      }));

      return JSON.stringify({
        page: pageInfo,
        visibleText: bodyText,
        forms: forms
      }, null, 2);
    } catch (error) {
      console.error('Failed to capture DOM context:', error);
      return 'Failed to capture page context';
    }
  };

  // Capture screen screenshot with caching
  const captureScreen = async (forceNew: boolean = false): Promise<string | null> => {
    try {
      console.log('Screen capture requested, forceNew:', forceNew);
      setIsCapturingScreen(true);
      
      // Use cached screenshot if it's less than 5 seconds old and we're not forcing a new one
      const now = Date.now();
      if (!forceNew && lastScreenCapture && (now - screenCaptureTime) < 5000) {
        console.log('Using cached screen capture from', (now - screenCaptureTime) / 1000, 'seconds ago');
        setIsCapturingScreen(false);
        return lastScreenCapture;
      }

      console.log('Requesting new screen capture...');
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' }
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          console.log('Screen capture video loaded, dimensions:', video.videoWidth, 'x', video.videoHeight);
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0);
          
          // Stop the stream
          stream.getTracks().forEach(track => track.stop());
          
          // Convert to base64
          const base64 = canvas.toDataURL('image/jpeg', 0.8);
          console.log('Screen capture successful, base64 length:', base64.length);
          
          // Cache the result
          setLastScreenCapture(base64);
          setScreenCaptureTime(now);
          setIsCapturingScreen(false);
          
          resolve(base64);
        };
      });
    } catch (error) {
      console.warn('Failed to capture screen:', error instanceof Error ? error.message : 'Unknown error');
      setIsCapturingScreen(false);
      
      // If it's a permission error, show a more helpful message
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          console.log('Screen capture permission denied - this is normal if user declined');
        } else if (error.name === 'NotSupportedError') {
          console.log('Screen capture not supported in this browser');
        }
      }
      
      return null;
    }
  };

  // Send voice input to Curtis with screen context (only use existing cached capture)
  const sendToCurtis = async (voiceText: string, useScreenCapture: boolean = false, includeDOMContext: boolean = false) => {
    if (!voiceText.trim()) return;
    
    console.log('Sending to Curtis:', { voiceText, useScreenCapture, includeDOMContext, screenCaptureEnabled });
    
    setIsProcessing(true);
    setCurtisResponse("");
    
    try {
      // Only use cached screen capture (don't automatically trigger new captures)
      let screenCapture = null;
      if (useScreenCapture && lastScreenCapture) {
        console.log('Using cached screen capture');
        screenCapture = lastScreenCapture;
      } else {
        console.log('No screen capture used - requires manual capture');
      }
      
      let domContext = null;
      if (includeDOMContext) {
        console.log('Including DOM context in request');
        domContext = captureDOMContext();
      }

      console.log('Sending request to Curtis API with:', {
        hasVoiceInput: !!voiceText,
        hasContextPrompt: !!contextPrompt,
        hasScreenCapture: !!screenCapture,
        hasDOMContext: !!domContext,
        conversationHistoryLength: conversationHistory.length,
        totalExchanges: Math.floor(conversationHistory.length / 2),
        willReinforceContext: conversationHistory.length > 0 && Math.floor(conversationHistory.length / 2) % 5 === 0
      });

      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voiceInput: voiceText,
          contextPrompt: contextPrompt,
          screenCapture: screenCapture,
          domContext: domContext,
          conversationHistory: conversationHistory
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Curtis responded successfully');
        const curtisResponseText = data.response;
        setCurtisResponse(curtisResponseText);
        
        // Add both user input and Curtis response to conversation history
        setConversationHistory(prev => {
          const newHistory = [
            ...prev,
            {
              role: 'user',
              content: voiceText,
              timestamp: Date.now(),
              hasScreenCapture: !!screenCapture,
              hasDOMContext: !!domContext
            },
            {
              role: 'assistant',
              content: curtisResponseText,
              timestamp: Date.now()
            }
          ];
          
          // Keep only the last 40 messages (20 exchanges) to maintain better context
          // This allows Curtis to remember more of the conversation while staying within token limits
          return newHistory.slice(-40);
        });
      } else {
        console.warn('Curtis API error:', data.error || 'Unknown API error');
        setCurtisResponse(`Error: ${data.error || 'Unknown API error'}`);
      }
    } catch (error) {
      console.warn('Failed to send to Curtis:', error instanceof Error ? error.message : 'Unknown error');
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
      // Check if we're in a secure context
      if (!window.isSecureContext) {
        setDetectedText("Microphone access requires HTTPS or localhost");
        setMicEnabled(false);
        return;
      }

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
      if (!SpeechRecognition) {
        setDetectedText("Speech recognition not available");
        setMicEnabled(false);
        return;
      }

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
          const transcript = finalTranscript.trim();
          setLastSpeechText(transcript);
          setDetectedText(`Voice: "${transcript}"`);
          
          // Check if the speech contains a name introduction
          const nameInfo = parseNameFromSpeech(transcript);
          if (nameInfo) {
            // Update the name in the configuration
            updateUserName(nameInfo.firstName);
          }
          
          // Check if user is asking for DOM context specifically
          const needsDOMContext = /\b(what's on this page|help me with this form|what can I do here|what are my options|read this page|page content|form fields)\b/i.test(transcript);
          
          // Always send to Curtis for a response, with DOM context if needed
          // Use cached screen capture if available (no automatic new captures)
          const totalExchanges = Math.floor(conversationHistory.length / 2);
          const isContextReinforcement = totalExchanges > 0 && totalExchanges % 5 === 0;
          
          if (isContextReinforcement) {
            setDetectedText(`Voice: "${transcript}" (Context reinforced for Curtis)`);
          }
          
          sendToCurtis(transcript, !!lastScreenCapture, needsDOMContext);
        } else if (interimTranscript) {
          setDetectedText(`Listening: "${interimTranscript.trim()}"`);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setDetectedText(`Speech error: ${event.error}`);
        
        // Don't restart on certain errors
        if (event.error === 'aborted' || event.error === 'no-speech') {
          return;
        }
      };

      recognitionRef.current.onend = () => {
        if (micEnabled) {
          // Restart if still enabled
          setTimeout(() => {
            if (recognitionRef.current && micEnabled) {
              try {
                recognitionRef.current.start();
              } catch (error) {
                console.warn('Failed to restart speech recognition:', error);
              }
            }
          }, 100);
        }
      };

      recognitionRef.current.start();
      
    } catch (error) {
      console.warn('Microphone access denied or failed:', error instanceof Error ? error.message : 'Unknown error');
      setDetectedText("Microphone access denied. Please allow microphone access.");
      setMicEnabled(false);
    }
  };

  // Stop speech recognition and audio monitoring
  const stopListening = () => {
    setIsListening(false);
    setAudioLevel(0);

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    } catch (error) {
      console.warn('Error stopping speech recognition:', error instanceof Error ? error.message : 'Unknown error');
    }

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    } catch (error) {
      console.warn('Error stopping audio stream:', error instanceof Error ? error.message : 'Unknown error');
    }

    try {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    } catch (error) {
      console.warn('Error closing audio context:', error instanceof Error ? error.message : 'Unknown error');
    }

    analyserRef.current = null;
    microphoneRef.current = null;
    
    // Don't clear the detected text - keep the last spoken text visible
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

  const clearConversationHistory = () => {
    setConversationHistory([]);
    setCurtisResponse("");
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
              {lastScreenCapture && (
                <span className="ml-2 text-purple-300">
                  {isCapturingScreen ? ' Capturing screen...' : ' Screen captured'}
                </span>
              )}
              {!lastScreenCapture && screenCaptureEnabled && (
                <span className="ml-2 text-gray-400"> Click capture button for screen context</span>
              )}
              {conversationHistory.length > 0 && (
                <span 
                  className="ml-2 text-green-300 cursor-help" 
                  title={`Curtis remembers ${Math.floor(conversationHistory.length / 2)} conversation exchanges${conversationHistory.length > 20 ? '. Older context is summarized to maintain full conversation awareness.' : '.'} Context is reinforced every 5 exchanges.`}
                >
                  📝 {Math.floor(conversationHistory.length / 2)} exchanges
                  {conversationHistory.length > 20 && (
                    <span className="text-yellow-300"> (full context maintained)</span>
                  )}
                </span>
              )}
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
        </div>

        {/* Curtis Response area */}
        {(isProcessing || curtisResponse) && (
          <div className="px-6 py-3 border-t border-gray-600 bg-blue-900 bg-opacity-30">
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span className="text-xs text-blue-300">
                  Curtis is thinking...
                  {isCapturingScreen && ' (capturing screen)'}
                </span>
              </div>
            ) : (
              <div>
                <div className="text-xs text-blue-400 mb-1 flex items-center">
                  Curtis Response:
                  {lastScreenCapture && (
                    <span className="ml-2 text-purple-400 text-xs">📸 Screenshot included</span>
                  )}
                </div>
                <div className="text-sm text-white max-h-40 overflow-y-auto">
                  {curtisResponse}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Name Update Status */}
        {nameUpdateStatus && (
          <div className="px-6 py-3 border-t border-gray-600 bg-green-900 bg-opacity-30">
            <div className="flex items-center space-x-2">
              {nameUpdateStatus.includes("Updating") && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
              )}
              <span className="text-xs text-green-300">{nameUpdateStatus}</span>
            </div>
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

              {/* Manual screen capture button */}
              <button
                onClick={async () => {
                  try {
                    await captureScreen(true);
                  } catch (error) {
                    console.warn('Manual screen capture failed:', error instanceof Error ? error.message : 'Unknown error');
                    setDetectedText("Screen capture failed - permission may be required");
                  }
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className="flex items-center space-x-2 hover:bg-purple-700 px-2 py-1 rounded transition-colors"
                title="Capture screen (requires user permission)"
              >
                <svg 
                  className={`w-4 h-4 ${lastScreenCapture ? 'text-purple-400' : 'text-gray-400'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs">
                  {isCapturingScreen ? 'Capturing...' : lastScreenCapture ? 'Captured' : 'Capture'}
                </span>
              </button>

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

              {/* Clear conversation history button */}
              {conversationHistory.length > 0 && (
                <button
                  onClick={clearConversationHistory}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 hover:bg-orange-700 px-2 py-1 rounded transition-colors text-orange-400"
                  title="Clear conversation history"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                  </svg>
                  <span className="text-xs">History</span>
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
