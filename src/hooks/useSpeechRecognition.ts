import { useState, useRef, useCallback } from 'react';

export const useSpeechRecognition = () => {
  const [micEnabled, setMicEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [detectedText, setDetectedText] = useState("Click the play button to start voice detection");
  const [audioLevel, setAudioLevel] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [lastSpeechText, setLastSpeechText] = useState("");

  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const checkSpeechSupport = useCallback(() => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
      return !!SpeechRecognition;
    } catch (error) {
      console.warn('Error checking speech recognition support:', error);
      setSpeechSupported(false);
      return false;
    }
  }, []);

  const monitorAudioLevel = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateAudioLevel = () => {
      if (!analyserRef.current || !isListening) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      
      const sum = dataArray.reduce((a, b) => a + b, 0);
      const average = sum / bufferLength;
      const normalizedLevel = (average / 255) * 100;
      
      setAudioLevel(normalizedLevel);
      
      if (isListening) {
        requestAnimationFrame(updateAudioLevel);
      }
    };
    
    updateAudioLevel();
  }, [isListening]);

  const startListening = useCallback(async (onResult: (text: string, isFinal: boolean) => void) => {
    if (!speechSupported) {
      setDetectedText("Speech recognition not supported in this browser");
      return;
    }

    try {
      if (!window.isSecureContext) {
        setDetectedText("Microphone access requires HTTPS or localhost");
        setMicEnabled(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      monitorAudioLevel();

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
          const transcript = finalTranscript.trim();
          setLastSpeechText(transcript);
          setDetectedText(`Voice: "${transcript}"`);
          onResult(transcript, true);
        } else if (interimTranscript) {
          setDetectedText(`Listening: "${interimTranscript.trim()}"`);
          onResult(interimTranscript.trim(), false);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setDetectedText(`Speech error: ${event.error}`);
        
        if (event.error === 'aborted' || event.error === 'no-speech') {
          return;
        }
      };

      recognitionRef.current.onend = () => {
        if (micEnabled) {
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
  }, [speechSupported, micEnabled, monitorAudioLevel]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    setAudioLevel(0);

    try {
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
    } catch (error) {
      console.warn('Error stopping speech recognition:', error);
    }

    analyserRef.current = null;
    microphoneRef.current = null;
  }, []);

  const toggleMic = useCallback((onResult: (text: string, isFinal: boolean) => void) => {
    if (!speechSupported) {
      setDetectedText("Speech recognition not supported in this browser. Try Chrome or Edge.");
      return;
    }

    if (micEnabled) {
      setMicEnabled(false);
      stopListening();
    } else {
      setMicEnabled(true);
      startListening(onResult);
    }
  }, [speechSupported, micEnabled, startListening, stopListening]);

  return {
    micEnabled,
    isListening,
    detectedText,
    audioLevel,
    speechSupported,
    lastSpeechText,
    checkSpeechSupport,
    toggleMic,
    stopListening,
    setDetectedText
  };
};
